import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Logo from './Logo'

const TITLE = 'Zakariyan Google Developer Club – '
const ACCENT = 'CASPAM'
const TAIL = ' Chapter'

/** Full-screen intro, < 4 s. Skippable, once per session, reduced-motion = fade. */
export default function Intro({ onDone }) {
  const root = useRef(null)
  const finish = () => { try { sessionStorage.setItem('zgdc-intro', '1') } catch {} onDone() }

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.timeline({ onComplete: finish })
          .from('.intro-group', { opacity: 0, duration: 0.5 })
          .to(root.current, { opacity: 0, duration: 0.5, delay: 0.4 })
        return
      }
      const tl = gsap.timeline({ onComplete: finish })
      tl.from('.intro-logo', { y: '-70vh', duration: 1.2, ease: 'bounce.out' }, 0.4)       // 0.4s blank, then drop
        .from('.intro-shadow', { scale: 0.2, opacity: 0, duration: 1.2, ease: 'power2.in' }, 0.4)
        .from('.letter-block', { y: '-60vh', opacity: 0, duration: 0.7, ease: 'bounce.out', stagger: 0.04 }, 1.3)
        .to({}, { duration: 0.6 })                                                          // pause
        .to('.intro-group', { scale: 0.18, x: '-38vw', y: '-44vh', duration: 0.6, ease: 'power3.inOut' })
        .to(root.current, { opacity: 0, duration: 0.4 }, '<0.2')
    }, root)
    return () => ctx.revert()
  }, [])

  const blocks = (text, color) => [...text].map((c, i) => (
    <span key={text + i} className="letter-block" style={color ? { color } : undefined} aria-hidden="true">{c === ' ' ? '\u00A0' : c}</span>
  ))

  return (
    <div ref={root} role="dialog" aria-label="Welcome animation" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <button onClick={finish} className="absolute right-4 top-4 rounded-full border-2 border-ink px-4 py-2 text-sm font-semibold">Skip intro</button>
      <div className="intro-group flex flex-col items-center px-4 text-center">
        <div className="relative mb-8">
          <Logo className="intro-logo h-24 w-auto sm:h-32" />
          <div className="intro-shadow mx-auto mt-2 h-3 w-24 rounded-full bg-black/20 blur-md" />
        </div>
        <h1 className="font-display text-lg font-bold sm:text-2xl" aria-label="Zakariyan Google Developer Club – CASPAM Chapter">
          {/* Two lines on phones, one line from sm up */}
          <span className="block sm:inline">{blocks(TITLE.trim())}</span>{' '}
          <span className="block sm:inline">{blocks(ACCENT, 'var(--brand-main)')}{blocks(TAIL)}</span>
        </h1>
      </div>
    </div>
  )
}
