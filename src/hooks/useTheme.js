import { useCallback, useEffect, useState } from 'react'

/**
 * Theme mode: 'auto' (follows the device), 'light' or 'dark'.
 * The choice is saved in the browser (localStorage) and applied as data-theme="light|dark" on <html>.
 * index.html applies the saved choice before the first paint, so the page never flashes the wrong colours.
 */
const KEY = 'zgdc-theme'
export const MODES = ['auto', 'light', 'dark']

const readMode = () => {
  try {
    const m = localStorage.getItem(KEY)
    return MODES.includes(m) ? m : 'auto'
  } catch {
    return 'auto'
  }
}

const systemPrefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

function apply(mode) {
  const dark = mode === 'dark' || (mode === 'auto' && systemPrefersDark())
  const root = document.documentElement
  root.setAttribute('data-theme', dark ? 'dark' : 'light')
  root.setAttribute('data-theme-mode', mode)
}

export default function useTheme() {
  const [mode, setMode] = useState(readMode)

  useEffect(() => {
    apply(mode)
    try { localStorage.setItem(KEY, mode) } catch { /* private mode: ignore */ }
    if (mode !== 'auto') return undefined
    // In auto mode, follow the device when it switches between light and dark
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => apply('auto')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [mode])

  // Auto -> Light -> Dark -> Auto
  const cycle = useCallback(() => setMode((m) => MODES[(MODES.indexOf(m) + 1) % MODES.length]), [])

  return { mode, setMode, cycle }
}
