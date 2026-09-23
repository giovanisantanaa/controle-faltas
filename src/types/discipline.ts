
import type { Workload } from '../data/absenceRules'

export type Discipline = {
  id: string
  semesterId: string
  name: string
  workload: Workload
  absences: number
}