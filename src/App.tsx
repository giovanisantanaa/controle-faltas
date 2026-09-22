import { useState } from 'react'
import { DisciplineCard } from './components/DisciplineCard'
import { DisciplineForm } from './components/DisciplineForm'
import { EmptyState } from './components/EmptyState'
import { Header } from './components/Header'
import { Summary } from './components/Summary'
import { useDisciplines } from './hooks/useDisciplines'

function App() {
  const [showForm, setShowForm] = useState(false)

  const {
    disciplines,
    addDiscipline,
    removeDiscipline,
    addAbsence,
    removeAbsence,
  } = useDisciplines()

  function handleAddDiscipline(data: {
    name: string
    workload: 30 | 45 | 60 | 75 | 90 | 120
    absences: number
  }) {
    addDiscipline(data)
    setShowForm(false)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto min-h-screen max-w-5xl px-5 py-8 sm:px-8 lg:py-12">
        <Header onAdd={() => setShowForm(true)} />

        <div className="mt-8 space-y-6">
          {disciplines.length > 0 && (
            <Summary disciplines={disciplines} />
          )}

          {showForm && (
            <DisciplineForm
              onSubmit={handleAddDiscipline}
              onCancel={() => setShowForm(false)}
            />
          )}

          {disciplines.length === 0 && !showForm ? (
            <EmptyState onAdd={() => setShowForm(true)} />
          ) : (
            <section className="grid gap-4 md:grid-cols-2">
              {disciplines.map((discipline) => (
                <DisciplineCard
                  key={discipline.id}
                  discipline={discipline}
                  onAddAbsence={() => addAbsence(discipline.id)}
                  onRemoveAbsence={() => removeAbsence(discipline.id)}
                  onDelete={() => removeDiscipline(discipline.id)}
                />
              ))}
            </section>
          )}
        </div>
      </div>
    </main>
  )
}

export default App