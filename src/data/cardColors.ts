export const CARD_COLORS = [
  { id: "slate", label: "Cinza", dot: "bg-slate-400", card: "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" },
  { id: "red", label: "Vermelho", dot: "bg-red-400", card: "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/40" },
  { id: "rose", label: "Rosa", dot: "bg-rose-400", card: "border-rose-200 bg-rose-50/50 dark:border-rose-900 dark:bg-rose-950/40" },
  { id: "orange", label: "Laranja", dot: "bg-orange-400", card: "border-orange-200 bg-orange-50/50 dark:border-orange-900 dark:bg-orange-950/40" },
  { id: "amber", label: "Âmbar", dot: "bg-amber-400", card: "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/40" },
  { id: "yellow", label: "Amarelo", dot: "bg-yellow-400", card: "border-yellow-200 bg-yellow-50/50 dark:border-yellow-900 dark:bg-yellow-950/40" },
  { id: "lime", label: "Lima", dot: "bg-lime-400", card: "border-lime-200 bg-lime-50/50 dark:border-lime-900 dark:bg-lime-950/40" },
  { id: "emerald", label: "Verde", dot: "bg-emerald-400", card: "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/40" },
  { id: "teal", label: "Verde-água", dot: "bg-teal-400", card: "border-teal-200 bg-teal-50/50 dark:border-teal-900 dark:bg-teal-950/40" },
  { id: "cyan", label: "Ciano", dot: "bg-cyan-400", card: "border-cyan-200 bg-cyan-50/50 dark:border-cyan-900 dark:bg-cyan-950/40" },
  { id: "sky", label: "Azul claro", dot: "bg-sky-400", card: "border-sky-200 bg-sky-50/50 dark:border-sky-900 dark:bg-sky-950/40" },
  { id: "blue", label: "Azul", dot: "bg-blue-400", card: "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/40" },
  { id: "indigo", label: "Índigo", dot: "bg-indigo-400", card: "border-indigo-200 bg-indigo-50/50 dark:border-indigo-900 dark:bg-indigo-950/40" },
  { id: "violet", label: "Violeta", dot: "bg-violet-400", card: "border-violet-200 bg-violet-50/50 dark:border-violet-900 dark:bg-violet-950/40" },
  { id: "fuchsia", label: "Fúcsia", dot: "bg-fuchsia-400", card: "border-fuchsia-200 bg-fuchsia-50/50 dark:border-fuchsia-900 dark:bg-fuchsia-950/40" },
  { id: "pink", label: "Pink", dot: "bg-pink-400", card: "border-pink-200 bg-pink-50/50 dark:border-pink-900 dark:bg-pink-950/40" },
] as const;

export type CardColorId = (typeof CARD_COLORS)[number]["id"];

export function getCardColor(id: CardColorId | undefined) {
  return CARD_COLORS.find((color) => color.id === id) ?? CARD_COLORS[0];
}
