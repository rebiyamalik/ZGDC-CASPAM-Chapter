import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useTilt from '../hooks/useTilt'
gsap.registerPlugin(ScrollTrigger)

const tracks = [
  { t: 'Web & App Dev', d: 'React, Next.js, Flutter and Firebase.', c: 'var(--brand-blue)' },
  { t: 'AI & Data', d: 'Python, ML and data storytelling.', c: 'var(--brand-red)' },
  { t: 'UI/UX', d: 'Figma, design systems and accessibility.', c: 'var(--brand-yellow)' },
  { t: 'Career & Speaking', d: 'CVs, interviews and stage confidence.', c: 'var(--brand-green)' },
]
function Card({ t, d, c }) {
  const tilt = useTilt()
  return (
    <article {...tilt} className="track-card layered rounded-2xl bg-white p-6">
      <div className="mb-4 h-3 w-12 rounded-full" style={{ background: c }} aria-hidden="true" />
      <h3 className="font-display text-xl font-bold">{t}</h3>
      <p className="mt-2">{d}</p>
    </article>
  )
}
export default function Tracks() {
  const root = useRef(null)
  useEffect(() => {
    // The ONE scroll-triggered moment on the site.
    const ctx = gsap.context(() => {
      gsap.from('.track-card', { y: 60, opacity: 0, stagger: 0.12, duration: 0.7, scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-display text-3xl font-bold">What we do</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{tracks.map(x => <Card key={x.t} {...x} />)}</div>
    </section>
  )
}
