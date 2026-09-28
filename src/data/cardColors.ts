export const CARD_COLORS = [
  { id: "slate", label: "Cinza", dot: "bg-slate-400", card: "border-slate-200 bg-white" },
  { id: "rose", label: "Rosa", dot: "bg-rose-400", card: "border-rose-200 bg-rose-50/50" },
  { id: "orange", label: "Laranja", dot: "bg-orange-400", card: "border-orange-200 bg-orange-50/50" },
  { id: "amber", label: "Âmbar", dot: "bg-amber-400", card: "border-amber-200 bg-amber-50/50" },
  { id: "emerald", label: "Verde", dot: "bg-emerald-400", card: "border-emerald-200 bg-emerald-50/50" },
  { id: "sky", label: "Azul", dot: "bg-sky-400", card: "border-sky-200 bg-sky-50/50" },
  { id: "violet", label: "Violeta", dot: "bg-violet-400", card: "border-violet-200 bg-violet-50/50" },
  { id: "pink", label: "Pink", dot: "bg-pink-400", card: "border-pink-200 bg-pink-50/50" },
] as const;

export type CardColorId = (typeof CARD_COLORS)[number]["id"];

export function getCardColor(id: CardColorId | undefined) {
  return CARD_COLORS.find((color) => color.id === id) ?? CARD_COLORS[0];
}
