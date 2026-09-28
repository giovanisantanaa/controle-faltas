import { useEffect, useRef, useState } from 'react'
import { ABSENCE_LIMITS } from '../data/absenceRules'
import { CARD_COLORS, getCardColor, type CardColorId } from '../data/cardColors'
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
  onEdit: () => void
  onColorChange: (color: CardColorId) => void
}

const statusContent = {
  safe: {
    label: 'Dentro do limite',
    className: 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50',
  },
  warning: {
    label: 'Próximo do limite',
    className: 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/50',
  },
  limit: {
    label: 'Limite atingido',
    className: 'text-orange-700 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/50',
  },
  failed: {
    label: 'Reprovado por faltas',
    className: 'text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950/50',
  },
} as const

const controlClassName =
  'flex h-10 min-w-12 items-center justify-center rounded-lg border border-transparent bg-transparent text-sm font-medium text-slate-500 transition-all duration-150 hover:border-slate-900 hover:bg-slate-900 hover:text-white active:scale-95 active:bg-slate-800 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-transparent disabled:text-slate-300 disabled:opacity-100 disabled:hover:bg-transparent disabled:hover:text-slate-300 disabled:hover:border-transparent disabled:active:scale-100 dark:text-slate-400 dark:hover:border-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900 dark:active:bg-slate-300 dark:disabled:text-slate-600 dark:disabled:hover:text-slate-600'

export function DisciplineCard({
  discipline,
  onAddAbsence,
  onRemoveAbsence,
  onDelete,
  onEdit,
  onColorChange,
}: DisciplineCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [colorOpen, setColorOpen] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
        setColorOpen(false)
        setConfirmingDelete(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
  const cardColor = getCardColor(discipline.color)

  return (
    <article className={`flex h-full flex-col rounded-2xl border p-5 shadow-sm ${cardColor.card}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {discipline.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {discipline.workload} horas
          </p>
        </div>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Mais opções"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
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
              <circle cx="12" cy="5" r="1.2" />
              <circle cx="12" cy="12" r="1.2" />
              <circle cx="12" cy="19" r="1.2" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 z-20 mt-2 w-48 max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/40">
              {confirmingDelete ? (
                <div className="p-1.5">
                  <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">
                    Excluir <span className="font-medium text-slate-900 dark:text-white">{discipline.name}</span>?
                    Essa ação não pode ser desfeita.
                  </p>

                  <div className="mt-2.5 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setConfirmingDelete(false)}
                      className="rounded-lg px-2.5 py-1.5 text-xs text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                    >
                      Cancelar
                    </button>

                    <button
                      type="button"
                      onClick={onDelete}
                      className="rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-red-700"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setColorOpen((current) => !current)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <span className={`h-3.5 w-3.5 rounded-full ${cardColor.dot}`} />
                      Cor
                    </span>

                    <svg
                      className={`h-4 w-4 text-slate-400 transition-transform ${
                        colorOpen ? 'rotate-180' : ''
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

                  {colorOpen && (
                    <div className="grid grid-cols-4 gap-2 px-3 pb-2 pt-1">
                      {CARD_COLORS.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => onColorChange(color.id)}
                          aria-label={color.label}
                          className={`flex h-7 w-7 items-center justify-center rounded-full transition hover:scale-110 ${
                            color.id === cardColor.id ? 'ring-2 ring-slate-900 ring-offset-2 dark:ring-slate-100 dark:ring-offset-slate-800' : ''
                          }`}
                        >
                          <span className={`h-4 w-4 rounded-full ${color.dot}`} />
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      onEdit()
                      setMenuOpen(false)
                    }}
                    className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfirmingDelete(true)}
                    className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                  >
                    Excluir
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-end">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Faltas
            </p>

            <p className="mt-1 text-2xl font-semibold text-slate-900 select-none dark:text-white">
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

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-300 dark:bg-slate-100"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800">
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
          <span className="text-lg font-semibold text-slate-900 dark:text-white">
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
          +1
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