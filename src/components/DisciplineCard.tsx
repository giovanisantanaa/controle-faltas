import { ABSENCE_LIMITS } from '../data/absenceRules'
import type { Discipline } from '../types/discipline'
import {
  getAbsencePercentage,
  getAbsenceStatus,
} from '../utils/absenceCalculator'

type DisciplineCardProps = {
  discipline: Discipline
  onAddAbsence: (amount?: number) => void
  onRemoveAbsence: (amount?: number) => void
  onDelete: () => void
}

const statusContent = {
  safe: {
    label: 'Dentro do limite',
    className: 'text-emerald-700 bg-emerald-50',
  },
  warning: {
    label: 'Próximo do limite',
    className: 'text-amber-700 bg-amber-50',
  },
  limit: {
    label: 'Limite atingido',
    className: 'text-orange-700 bg-orange-50',
  },
  failed: {
    label: 'Reprovado por faltas',
    className: 'text-red-700 bg-red-50',
  },
} as const

const controlClassName =
  'flex h-10 min-w-12 items-center justify-center rounded-lg text-sm font-medium text-slate-600 transition-all duration-150 hover:bg-slate-900 hover:text-white active:scale-95 active:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30'

export function DisciplineCard({
  discipline,
  onAddAbsence,
  onRemoveAbsence,
  onDelete,
}: DisciplineCardProps) {
  const limit = ABSENCE_LIMITS[discipline.workload]

  const status = getAbsenceStatus(
    discipline.absences,
    limit,
  )

  const percentage = getAbsencePercentage(
    discipline.absences,
    limit,
  )

  const content = statusContent[status]

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900">
            {discipline.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {discipline.workload} horas
          </p>
        </div>

        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg px-2 py-1 text-sm text-slate-400 transition-all duration-150 hover:bg-red-50 hover:text-red-600 active:scale-95"
          aria-label={`Excluir ${discipline.name}`}
        >
          Excluir
        </button>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Faltas
            </p>

            <p className="mt-1 text-2xl font-semibold text-slate-900 select-none">
              {discipline.absences}

              <span className="text-base font-normal text-slate-400">
                {' '}
                / {limit}
              </span>
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${content.className}`}
          >
            {content.label}
          </span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-300"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2">
        <button
          type="button"
          onClick={() => onRemoveAbsence(2)}
          disabled={discipline.absences === 0}
          className={controlClassName}
          aria-label="Remover duas faltas"
        >
          −2
        </button>

        <button
          type="button"
          onClick={() => onRemoveAbsence(1)}
          disabled={discipline.absences === 0}
          className={controlClassName}
          aria-label="Remover uma falta"
        >
          −1
        </button>

        <div className="min-w-16 text-center select-none">
          <span className="text-lg font-semibold text-slate-900">
            {discipline.absences}
          </span>

          <span className="ml-1 text-xs text-slate-400">
            faltas
          </span>
        </div>

        <button
          type="button"
          onClick={() => onAddAbsence(1)}
          className={controlClassName}
          aria-label="Adicionar uma falta"
        >
          +8
        </button>

        <button
          type="button"
          onClick={() => onAddAbsence(2)}
          className={controlClassName}
          aria-label="Adicionar duas faltas"
        >
          +2
        </button>
      </div>
    </article>
  )
}