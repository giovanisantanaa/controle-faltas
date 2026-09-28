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
  onExportText: () => string;
  onImport: (file: File) => void;
  onImportText: (text: string) => void;
  onAddDiscipline: () => void;
};

export function SemesterBar({
  semesters,
  activeId,
  onSelect,
  onAdd,
  onRename,
  onRemove,
  onExport,
  onExportText,
  onImport,
  onImportText,
  onAddDiscipline,
}: SemesterBarProps) {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [copied, setCopied] = useState(false);
  const [pasting, setPasting] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [importMenuOpen, setImportMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
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
        setRenamingId(null);
      }

      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setSettingsOpen(false);
        setExportMenuOpen(false);
        setImportMenuOpen(false);
        setPasting(false);
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

    if (!trimmed || !renamingId) {
      return;
    }

    onRename(renamingId, trimmed);
    setRenamingId(null);
  }

  function handleRemove(semester: Semester) {
    const confirmed = window.confirm(
      `Excluir o semestre "${semester.name}"? Todas as disciplinas dele serão apagadas.`,
    );

    if (confirmed) {
      onRemove(semester.id);
    }
  }

  function handleImportChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      onImport(file);
    }

    event.target.value = "";
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(onExportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function submitPaste(event: React.FormEvent) {
    event.preventDefault();

    if (!pasteText.trim()) {
      return;
    }

    onImportText(pasteText);
    setPasteText("");
    setPasting(false);
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

              if (renamingId === semester.id) {
                return (
                  <form
                    key={semester.id}
                    onSubmit={submitRename}
                    className="flex items-center gap-1.5 p-1.5"
                  >
                    <input
                      autoFocus
                      type="text"
                      value={draftName}
                      onChange={(event) => setDraftName(event.target.value)}
                      className="w-full min-w-0 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />

                    <button
                      type="submit"
                      className="shrink-0 rounded-lg bg-slate-900 px-2.5 py-2 text-xs font-medium text-white transition hover:bg-slate-800"
                    >
                      Salvar
                    </button>

                    <button
                      type="button"
                      onClick={() => setRenamingId(null)}
                      className="shrink-0 rounded-lg px-2 py-2 text-xs text-slate-500 hover:bg-slate-100"
                    >
                      Cancelar
                    </button>
                  </form>
                );
              }

              return (
                <div
                  key={semester.id}
                  role="option"
                  aria-selected={selected}
                  className={`group flex w-full items-center rounded-lg transition ${
                    selected
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(semester.id);
                      setOpen(false);
                    }}
                    className="flex-1 truncate px-3 py-2.5 text-left font-medium"
                  >
                    {semester.name}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDraftName(semester.name);
                      setRenamingId(semester.id);
                    }}
                    aria-label={`Renomear ${semester.name}`}
                    className="shrink-0 px-2 py-2.5 text-xs text-slate-400 opacity-0 transition hover:text-slate-900 focus:opacity-100 group-hover:opacity-100"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemove(semester)}
                    aria-label={`Excluir ${semester.name}`}
                    className="shrink-0 px-2 py-2.5 pr-3 text-xs text-slate-400 opacity-0 transition hover:text-red-600 focus:opacity-100 group-hover:opacity-100"
                  >
                    Excluir
                  </button>
                </div>
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

      <div ref={settingsRef} className="relative ml-auto">
        <button
          type="button"
          onClick={() => setSettingsOpen((current) => !current)}
          aria-label="Exportar ou importar dados"
          aria-haspopup="true"
          aria-expanded={settingsOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-500 transition hover:border-slate-400 hover:text-slate-900"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        {settingsOpen && (
          <div className="absolute right-0 z-20 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-200/50">
            <button
              type="button"
              onClick={() => setExportMenuOpen((current) => !current)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Exportar dados
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  exportMenuOpen ? "rotate-180" : ""
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

            {exportMenuOpen && (
              <div className="flex gap-2 px-3 pb-2.5">
                <button
                  type="button"
                  onClick={onExport}
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Baixar arquivo
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  {copied ? "Copiado!" : "Copiar código"}
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setImportMenuOpen((current) => !current)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Importar dados
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  importMenuOpen ? "rotate-180" : ""
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

            {importMenuOpen && (
              <div className="px-3 pb-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Escolher arquivo
                  </button>

                  <button
                    type="button"
                    onClick={() => setPasting((current) => !current)}
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Colar código
                  </button>
                </div>

                {pasting && (
                  <form onSubmit={submitPaste} className="mt-2">
                    <textarea
                      autoFocus
                      value={pasteText}
                      onChange={(event) => setPasteText(event.target.value)}
                      placeholder="Cole aqui o código exportado"
                      rows={5}
                      className="w-full rounded-lg border border-slate-300 p-2.5 font-mono text-xs outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />

                    <div className="mt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPasting(false);
                          setPasteText("");
                        }}
                        className="rounded-lg px-2.5 py-1.5 text-xs text-slate-500 hover:bg-slate-100"
                      >
                        Cancelar
                      </button>

                      <button
                        type="submit"
                        className="rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-slate-800"
                      >
                        Importar
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleImportChange}
          className="hidden"
        />
      </div>

      <button
        type="button"
        onClick={onAddDiscipline}
        disabled={!activeId}
        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        + Nova disciplina
      </button>
    </div>
  );
}
