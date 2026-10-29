import { useEffect, useState } from 'react'
/** Tiny hash router: #/about, #/members ... Works on Vercel with no server config. */
export default function useRoute() {
  const get = () => (window.location.hash.replace(/^#\/?/, '') || 'home')
  const [route, setRoute] = useState(get)
  useEffect(() => {
    const on = () => { setRoute(get()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}
