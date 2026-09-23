
type EmptyStateProps = {
  onAdd: () => void
  title?: string
  description?: string
  buttonLabel?: string
}

export function EmptyState({
  onAdd,
  title = 'Nenhuma disciplina cadastrada',
  description = 'Adicione suas disciplinas para começar a acompanhar suas faltas.',
  buttonLabel = 'Adicionar disciplina',
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
        +
      </div>

      <h2 className="mt-4 font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        {buttonLabel}
      </button>
    </div>
  )
}