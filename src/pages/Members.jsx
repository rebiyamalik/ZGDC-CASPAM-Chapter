import { useEffect, useRef, useState } from 'react'
import team from '../data/team.json'
import useTilt from '../hooks/useTilt'

const Avatar = ({ m, size }) => m.photo
  ? <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" className={`${size} rounded-full object-cover`} />
  : <div aria-hidden="true" className={`${size} flex items-center justify-center rounded-full bg-soft font-display text-2xl font-bold`}>{m.name[0]}</div>

function Card({ m, onOpen }) {
  const tilt = useTilt(6)
  return (
    <li><button {...tilt} onClick={() => onOpen(m)} aria-label={`Open profile of ${m.name}`} className="layered w-full rounded-2xl bg-white p-4 text-center">
      <div className="flex justify-center"><Avatar m={m} size="h-24 w-24" /></div>
      <h2 className="mt-3 font-display text-base font-bold">{m.name}</h2>
      <p className="text-sm">{m.role}</p>
    </button></li>
  )
}
/** Accessible profile dialog: Esc closes, focus moves in and returns. */
function Profile({ m, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const prev = document.activeElement; ref.current.focus()
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => { window.removeEventListener('keydown', k); prev?.focus() }
  }, [])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`${m.name} profile`} onClick={e => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-white p-6 text-center">
        <div className="flex justify-center"><Avatar m={m} size="h-32 w-32" /></div>
        <h2 className="mt-4 font-display text-2xl font-bold">{m.name}</h2>
        <p className="font-semibold text-brand">{m.role}</p>
        <p className="mt-3">{m.bio}</p>
        <p className="mt-3 text-sm">{m.skills.join(' · ')}</p>
        <div className="mt-4 flex justify-center gap-4 text-sm underline">
          {m.links.linkedin && <a href={m.links.linkedin} rel="noopener">LinkedIn</a>}
          {m.links.github && <a href={m.links.github} rel="noopener">GitHub</a>}
        </div>
        <button onClick={onClose} className="btn btn-ghost mt-6">Close</button>
      </div>
    </div>
  )
}
export default function Members() {
  const [open, setOpen] = useState(null)
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-4xl font-extrabold">Members</h1>
      <p className="mt-2">Select a member to see their profile.</p>
      <ul className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">{team.map(m => <Card key={m.name} m={m} onOpen={setOpen} />)}</ul>
      {open && <Profile m={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
