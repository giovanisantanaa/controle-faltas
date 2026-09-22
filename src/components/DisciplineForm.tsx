
import { useState } from 'react'
import { ABSENCE_LIMITS, type Workload } from '../data/absenceRules'

type DisciplineFormProps = {
  onSubmit: (data: {
    name: string
    workload: Workload
    absences: number
  }) => void
  onCancel?: () => void
}

const workloads = Object.keys(ABSENCE_LIMITS).map(Number) as Workload[]

export function DisciplineForm({
  onSubmit,
  onCancel,
}: DisciplineFormProps) {
  const [name, setName] = useState('')
  const [workload, setWorkload] = useState<Workload>(60)
  const [absences, setAbsences] = useState(0)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) {
      return
    }

    onSubmit({
      name: trimmedName,
      workload,
      absences,
    })

    setName('')
    setWorkload(60)
    setAbsences(0)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Nova disciplina
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Adicione uma disciplina para acompanhar suas faltas.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="discipline-name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Nome da disciplina
          </label>

          <input
            id="discipline-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex.: Banco de Dados"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            required
          />
        </div>

        <div>
          <label
            htmlFor="discipline-workload"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Carga horária
          </label>

          <select
            id="discipline-workload"
            value={workload}
            onChange={(event) =>
              setWorkload(Number(event.target.value) as Workload)
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          >
            {workloads.map((value) => (
              <option key={value} value={value}>
                {value} horas — até {ABSENCE_LIMITS[value]} faltas
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="discipline-absences"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Faltas atuais
          </label>

          <input
            id="discipline-absences"
            type="number"
            min="0"
            value={absences}
            onChange={(event) =>
              setAbsences(Math.max(Number(event.target.value), 0))
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Adicionar disciplina
        </button>
      </div>
    </form>
  )
}