import useTheme, { MODES } from '../hooks/useTheme'

const LABEL = { auto: 'Auto', light: 'Light', dark: 'Dark' }
const HINT = {
  auto: 'Auto (follows your device)',
  light: 'Light mode',
  dark: 'Dark mode',
}

const icons = {
  auto: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  ),
  light: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  ),
}

/** One button: click to cycle Auto -> Light -> Dark. Lives at the top-right of the navbar. */
export default function ThemeToggle() {
  const { mode, cycle } = useTheme()
  const next = MODES[(MODES.indexOf(mode) + 1) % MODES.length]
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycle}
      title={`Theme: ${HINT[mode]}. Click for ${LABEL[next]}.`}
      aria-label={`Theme: ${HINT[mode]}. Click to switch to ${LABEL[next]}.`}
    >
      {icons[mode]}
      <span className="theme-toggle__label">{LABEL[mode]}</span>
    </button>
  )
}
