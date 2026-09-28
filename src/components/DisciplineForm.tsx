import { useEffect, useRef, useState } from 'react'
import { ABSENCE_LIMITS, type Workload } from '../data/absenceRules'

type DisciplineFormProps = {
  initialValues?: {
    name: string
    workload: Workload
    absences: number
  }
  onSubmit: (data: {
    name: string
    workload: Workload
    absences: number
  }) => void
  onCancel?: () => void
}

const workloads = Object.keys(ABSENCE_LIMITS).map(Number) as Workload[]

function AbsenceControl({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) {
  const controlClassName =
    'flex h-10 min-w-12 items-center justify-center rounded-lg border border-transparent bg-transparent text-sm font-medium text-slate-500 transition-all duration-150 hover:border-slate-900 hover:bg-slate-900 hover:text-white active:scale-95 active:bg-slate-800 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-transparent disabled:text-slate-300 disabled:opacity-100 disabled:hover:bg-transparent disabled:hover:text-slate-300 disabled:hover:border-transparent disabled:active:scale-100 dark:text-slate-400 dark:hover:border-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900 dark:active:bg-slate-300 dark:disabled:text-slate-600 dark:disabled:hover:text-slate-600'

  function changeValue(amount: number) {
    onChange(Math.max(value + amount, 0))
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800">
      <button
        type="button"
        onClick={() => changeValue(-2)}
        disabled={value === 0}
        className={controlClassName}
      >
        −2
      </button>

      <button
        type="button"
        onClick={() => changeValue(-1)}
        disabled={value === 0}
        className={controlClassName}
      >
        −1
      </button>

      <div className="min-w-16 text-center">
        <span className="text-xl font-semibold text-slate-900 dark:text-white">
          {value}
        </span>

        <span className="ml-1 text-xs text-slate-400">
          faltas
        </span>
      </div>

      <button
        type="button"
        onClick={() => changeValue(1)}
        className={controlClassName}
      >
        +1
      </button>

      <button
        type="button"
        onClick={() => changeValue(2)}
        className={controlClassName}
      >
        +2
      </button>
    </div>
  )
}

function WorkloadSelect({
  value,
  onChange,
}: {
  value: Workload
  onChange: (value: Workload) => void
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-3 text-left text-sm outline-none transition hover:border-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600 dark:focus:border-slate-500 dark:focus:ring-slate-700"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div>
          <span className="font-medium text-slate-900 dark:text-white">
            {value} horas
          </span>

          <span className="ml-2 text-slate-400">
            até {ABSENCE_LIMITS[value]} faltas
          </span>
        </div>

        <svg
          className={`h-4 w-4 text-slate-400 transition-transform ${
            open ? 'rotate-180' : ''
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
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/40"
        >
          {workloads.map((workload) => {
            const selected = workload === value

            return (
              <button
                key={workload}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(workload)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition ${
                  selected
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white'
                }`}
              >
                <span className="font-medium">
                  {workload} horas
                </span>

                <span className="text-xs text-slate-400">
                  até {ABSENCE_LIMITS[workload]} faltas
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function DisciplineForm({
  initialValues,
  onSubmit,
  onCancel,
}: DisciplineFormProps) {
  const isEditing = !!initialValues
  const [name, setName] = useState(initialValues?.name ?? '')
  const [workload, setWorkload] = useState<Workload>(initialValues?.workload ?? 60)
  const [absences, setAbsences] = useState(initialValues?.absences ?? 0)

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

    if (!isEditing) {
      setName('')
      setWorkload(60)
      setAbsences(0)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {isEditing ? 'Editar disciplina' : 'Nova disciplina'}
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {isEditing
            ? 'Altere os dados da disciplina.'
            : 'Adicione uma disciplina para acompanhar suas faltas.'}
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="discipline-name"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Nome da disciplina
          </label>

          <input
            id="discipline-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex.: Banco de Dados"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-700"
            required
          />
        </div>

        <div>
          <label
            htmlFor="discipline-workload"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Carga horária
          </label>

          <WorkloadSelect
            value={workload}
            onChange={setWorkload}
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            Faltas atuais
          </p>

          <AbsenceControl
            value={absences}
            onChange={setAbsences}
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
          {isEditing ? 'Salvar alterações' : 'Adicionar disciplina'}
        </button>
      </div>
    </form>
  )
}