import { useEffect, useState } from "react";
import type { Semester } from "../types/semester";

const STORAGE_KEY = "controle-faltas:semesters";
const ACTIVE_KEY = "controle-faltas:active-semester";

function loadSemesters(): Semester[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

function loadActiveId(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function useSemesters() {
  const [semesters, setSemesters] = useState<Semester[]>(loadSemesters);
  const [activeId, setActiveId] = useState<string | null>(loadActiveId);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(semesters));
  }, [semesters]);

  useEffect(() => {
    if (activeId) {
      localStorage.setItem(ACTIVE_KEY, activeId);
    } else {
      localStorage.removeItem(ACTIVE_KEY);
    }
  }, [activeId]);

  const effectiveActiveId = semesters.some((semester) => semester.id === activeId)
    ? activeId
    : (semesters[0]?.id ?? null);

  function addSemester(name: string) {
    const newSemester: Semester = {
      id: crypto.randomUUID(),
      name,
    };

    setSemesters((current) => [...current, newSemester]);
    setActiveId(newSemester.id);

    return newSemester;
  }

  function renameSemester(id: string, name: string) {
    setSemesters((current) =>
      current.map((semester) =>
        semester.id === id ? { ...semester, name } : semester,
      ),
    );
  }

  function removeSemester(id: string) {
    setSemesters((current) => current.filter((semester) => semester.id !== id));
  }

  function replaceAll(next: Semester[]) {
    setSemesters(next);
  }

  return {
    semesters,
    activeId: effectiveActiveId,
    setActiveId,
    addSemester,
    renameSemester,
    removeSemester,
    replaceAll,
  };
}
