
export const ABSENCE_LIMITS = {
  30: 9,
  45: 13,
  60: 18,
  75: 22,
  90: 27,
  120: 36,
} as const

export type Workload = keyof typeof ABSENCE_LIMITS