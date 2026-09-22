import { ABSENCE_LIMITS } from '../data/absenceRules'
import type { Discipline } from '../types/discipline'

type SummaryProps = {
  disciplines: Discipline[]
}

export function Summary({ disciplines }: SummaryProps) {
  const attentionCount = disciplines.filter((discipline) => {
    const limit = ABSENCE_LIMITS[discipline.workload]

    return discipline.absences >= Math.ceil(limit * 0.8)
  }).length

  return (
    <section className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">Disciplinas</p>

        <p className="mt-1 text-2xl font-semibold text-slate-900">
          {disciplines.length}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">Em atenção</p>

        <p className="mt-1 text-2xl font-semibold text-slate-900">
          {attentionCount}
        </p>
      </div>
    </section>
  )
}