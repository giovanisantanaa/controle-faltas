import type { ReactNode } from 'react'
import type { Theme } from '../hooks/useTheme'

type ThemeToggleProps = {
  theme: Theme
  onChange: (theme: Theme) => void
}

const OPTIONS: { id: Theme; label: string; icon: ReactNode }[] = [
  {
    id: 'light',
    label: 'Claro',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
  {
    id: 'system',
    label: 'Sistema',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: 'dark',
    label: 'Escuro',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
  },
]

export function ThemeToggle({ theme, onChange }: ThemeToggleProps) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-xl border border-slate-300 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
      {OPTIONS.map((option) => {
        const selected = option.id === theme

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-label={option.label}
            aria-pressed={selected}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
              selected
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            {option.icon}
          </button>
        )
      })}
    </div>
  )
}
