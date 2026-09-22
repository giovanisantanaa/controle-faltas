
import { ABSENCE_LIMITS } from '../data/absenceRules'
import type { Workload } from '../data/absenceRules'

export type AbsenceStatus = 'safe' | 'warning' | 'limit' | 'failed'

export function getAbsenceLimit(workload: Workload): number {
  return ABSENCE_LIMITS[workload]
}

export function getAbsenceStatus(
  absences: number,
  limit: number,
): AbsenceStatus {
  if (absences > limit) {
    return 'failed'
  }

  if (absences === limit) {
    return 'limit'
  }

  if (absences >= Math.ceil(limit * 0.8)) {
    return 'warning'
  }

  return 'safe'
}

export function getRemainingAbsences(
  absences: number,
  limit: number,
): number {
  return Math.max(limit - absences, 0)
}

export function getAbsencePercentage(
  absences: number,
  limit: number,
): number {
  if (limit === 0) {
    return 0
  }

  return Math.min((absences / limit) * 100, 100)
}