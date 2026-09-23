import { useState } from "react";
import { DisciplineCard } from "./components/DisciplineCard";
import { DisciplineForm } from "./components/DisciplineForm";
import { EmptyState } from "./components/EmptyState";
import { Header } from "./components/Header";
import { SemesterBar } from "./components/SemesterBar";
import { Summary } from "./components/Summary";
import { useDisciplines } from "./hooks/useDisciplines";
import { useSemesters } from "./hooks/useSemesters";
import { exportData, parseImportFile } from "./utils/importExport";

function App() {
  const [showForm, setShowForm] = useState(false);

  const {
    semesters,
    activeId,
    setActiveId,
    addSemester,
    renameSemester,
    removeSemester,
    replaceAll: replaceSemesters,
  } = useSemesters();

  const {
    disciplines,
    addDiscipline,
    removeDiscipline,
    addAbsence,
    removeAbsence,
    removeBySemester,
    replaceAll: replaceDisciplines,
  } = useDisciplines();

  const visibleDisciplines = disciplines.filter(
    (discipline) => discipline.semesterId === activeId,
  );

  function handleAddDiscipline(data: {
    name: string;
    workload: 30 | 45 | 60 | 75 | 90 | 120;
    absences: number;
  }) {
    if (!activeId) {
      return;
    }

    addDiscipline(data, activeId);
    setShowForm(false);
  }

  function handleRemoveSemester(id: string) {
    removeSemester(id);
    removeBySemester(id);
  }

  function handleImport(file: File) {
    parseImportFile(file)
      .then(({ semesters: importedSemesters, disciplines: importedDisciplines }) => {
        replaceSemesters(importedSemesters);
        replaceDisciplines(importedDisciplines);
      })
      .catch(() => {
        window.alert("Não foi possível importar o arquivo. Verifique se é um export válido.");
      });
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto min-h-screen max-w-5xl px-5 py-8 sm:px-8 lg:py-12">
        <Header onAdd={() => setShowForm(true)} />

        <div className="mt-8 space-y-6">
          <SemesterBar
            semesters={semesters}
            activeId={activeId}
            onSelect={setActiveId}
            onAdd={addSemester}
            onRename={renameSemester}
            onRemove={handleRemoveSemester}
            onExport={() => exportData(semesters, disciplines)}
            onImport={handleImport}
          />

          {!activeId ? (
            <EmptyState
              title="Nenhum semestre cadastrado"
              description="Crie um semestre para começar a organizar suas disciplinas."
              buttonLabel="Adicionar semestre"
              onAdd={() => {
                const name = window.prompt("Nome do semestre (ex.: 2026.1)");
                const trimmed = name?.trim();

                if (trimmed) {
                  addSemester(trimmed);
                }
              }}
            />
          ) : (
            <>
              {visibleDisciplines.length > 0 && (
                <Summary disciplines={visibleDisciplines} />
              )}

              {showForm && (
                <DisciplineForm
                  onSubmit={handleAddDiscipline}
                  onCancel={() => setShowForm(false)}
                />
              )}

              {visibleDisciplines.length === 0 && !showForm ? (
                <EmptyState onAdd={() => setShowForm(true)} />
              ) : (
                <section className="grid gap-4 md:grid-cols-2">
                  {visibleDisciplines.map((discipline) => (
                    <DisciplineCard
                      key={discipline.id}
                      discipline={discipline}
                      onAddAbsence={(amount) => addAbsence(discipline.id, amount)}
                      onRemoveAbsence={(amount) => removeAbsence(discipline.id, amount)}
                      onDelete={() => removeDiscipline(discipline.id)}
                    />
                  ))}
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
