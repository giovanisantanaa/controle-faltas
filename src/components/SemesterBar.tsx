import { useEffect, useRef, useState } from "react";
import type { Semester } from "../types/semester";

type SemesterBarProps = {
  semesters: Semester[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onAdd: (name: string) => void;
  onRename: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  onExport: () => void;
  onImport: (file: File) => void;
};

export function SemesterBar({
  semesters,
  activeId,
  onSelect,
  onAdd,
  onRename,
  onRemove,
  onExport,
  onImport,
}: SemesterBarProps) {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [draftName, setDraftName] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const active = semesters.find((semester) => semester.id === activeId) ?? null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setCreating(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function submitNewSemester(event: React.FormEvent) {
    event.preventDefault();

    const trimmed = draftName.trim();

    if (!trimmed) {
      return;
    }

    onAdd(trimmed);
    setDraftName("");
    setCreating(false);
    setOpen(false);
  }

  function submitRename(event: React.FormEvent) {
    event.preventDefault();

    const trimmed = draftName.trim();

    if (!trimmed || !active) {
      return;
    }

    onRename(active.id, trimmed);
    setRenaming(false);
  }

  function handleImportChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      onImport(file);
    }

    event.target.value = "";
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition hover:border-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="font-medium text-slate-900">
            {active ? active.name : "Nenhum semestre"}
          </span>

          <svg
            className={`h-4 w-4 text-slate-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <div
            role="listbox"
            className="absolute z-20 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-200/50"
          >
            {semesters.map((semester) => {
              const selected = semester.id === activeId;

              return (
                <button
                  key={semester.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onSelect(semester.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition ${
                    selected
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="font-medium">{semester.name}</span>
                </button>
              );
            })}

            {creating ? (
              <form onSubmit={submitNewSemester} className="p-1.5">
                <input
                  autoFocus
                  type="text"
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                  placeholder="Ex.: 2026.1"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </form>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setCreating(true);
                  setDraftName("");
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              >
                + Novo semestre
              </button>
            )}
          </div>
        )}
      </div>

      {active && !renaming && (
        <button
          type="button"
          onClick={() => {
            setDraftName(active.name);
            setRenaming(true);
          }}
          className="rounded-xl px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          Renomear
        </button>
      )}

      {active && renaming && (
        <form onSubmit={submitRename} className="flex items-center gap-2">
          <input
            autoFocus
            type="text"
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />

          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Salvar
          </button>

          <button
            type="button"
            onClick={() => setRenaming(false)}
            className="rounded-xl px-3 py-2 text-sm text-slate-500 hover:bg-slate-100"
          >
            Cancelar
          </button>
        </form>
      )}

      {active && !renaming && (
        <button
          type="button"
          onClick={() => onRemove(active.id)}
          className="rounded-xl px-3 py-2.5 text-sm text-slate-500 transition hover:bg-red-50 hover:text-red-600"
        >
          Excluir semestre
        </button>
      )}

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onExport}
          className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Exportar
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Importar
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleImportChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
