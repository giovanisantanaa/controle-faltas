type HeaderProps = {
  onAdd: () => void
}

export function Header({ onAdd }: HeaderProps) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Vida acadêmica
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
          Controle de faltas
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          Acompanhe suas faltas e saiba quanto ainda pode faltar em cada
          disciplina.
        </p>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        + Nova disciplina
      </button>
    </header>
  )
}