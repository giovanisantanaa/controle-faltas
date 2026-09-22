import { useEffect, useState } from "react";
import type { Discipline } from "../types/discipline";

const STORAGE_KEY = "controle-faltas:disciplines";

function loadDisciplines(): Discipline[] {
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

export function useDisciplines() {
  const [disciplines, setDisciplines] = useState<Discipline[]>(loadDisciplines);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(disciplines));
  }, [disciplines]);

  function addDiscipline(discipline: Omit<Discipline, "id">) {
    const newDiscipline: Discipline = {
      ...discipline,
      id: crypto.randomUUID(),
    };

    setDisciplines((current) => [...current, newDiscipline]);
  }

  function updateDiscipline(
    id: string,
    updates: Partial<Omit<Discipline, "id">>,
  ) {
    setDisciplines((current) =>
      current.map((discipline) =>
        discipline.id === id ? { ...discipline, ...updates } : discipline,
      ),
    );
  }

  function removeDiscipline(id: string) {
    setDisciplines((current) =>
      current.filter((discipline) => discipline.id !== id),
    );
  }

  function addAbsence(id: string, amount = 1) {
    setDisciplines((current) =>
      current.map((discipline) =>
        discipline.id === id
          ? {
              ...discipline,
              absences: discipline.absences + amount,
            }
          : discipline,
      ),
    );
  }

  function removeAbsence(id: string, amount = 1) {
    setDisciplines((current) =>
      current.map((discipline) =>
        discipline.id === id
          ? {
              ...discipline,
              absences: Math.max(discipline.absences - amount, 0),
            }
          : discipline,
      ),
    );
  }

  return {
    disciplines,
    addDiscipline,
    updateDiscipline,
    removeDiscipline,
    addAbsence,
    removeAbsence,
  };
}
