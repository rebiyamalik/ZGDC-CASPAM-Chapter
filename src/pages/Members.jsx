import { useEffect, useMemo, useRef, useState } from 'react'
import team from '../data/team.json'
import './members.css'

/** Members page. The people come from src/data/team.json (edit that file only).
 *  Each person: name, role, group ("leadership" | "executive" | "media"), program, class,
 *  and optional photo (e.g. "/team/ayesha.jpg"), bio, skills, links.linkedin / links.github. */

const GROUPS = [
  { id: 'leadership', label: 'Leadership', blurb: 'The office bearers who lead the chapter.' },
  { id: 'executive', label: 'Executive Members', blurb: 'The members who run sessions, events and projects.' },
  { id: 'media', label: 'Media & Technical Team', blurb: 'The team behind media, design, finance and information.' },
]
const THEMES = ['blue', 'red', 'yellow', 'green']
const NOTIFIED_BY = [
  { name: 'Dr. Safia Mirza', title: 'DSA (Female), CASPAM' },
  { name: 'Prof. Dr. Ahtsham Ul Haq Bokhari', title: 'DSA (Male), CASPAM' },
  { name: 'Prof. Dr. Imran Javaid', title: 'Director, CASPAM' },
]

// "Ateeq ur Rehman" -> "AR", "M Ali Abid" -> "MA"
const initials = (name) => {
  const words = name.split(/\s+/).filter((w) => /^[A-Z]/.test(w))
  return words.length > 1 ? words.slice(0, 2).map((w) => w[0]).join('') : name.slice(0, 2).toUpperCase()
}
const themeOf = (index) => THEMES[index % THEMES.length]
const meta = (m) => [m.program, m.class].filter(Boolean).join(' · ')

function Avatar({ m, theme, className = '' }) {
  return m.photo
    ? <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" className={`zm-avatar zm-avatar--photo ${className}`} />
    : <span aria-hidden="true" className={`zm-avatar zm-avatar--${theme} ${className}`}>{initials(m.name)}</span>
}

/** 3D hero: a ring of coins (one per office bearer) turning around the chapter logo. */
function Scene({ people }) {
  const ring = people.slice(0, 7)
  return (
    <div className="zm-scene" aria-hidden="true">
      <div className="zm-scene__wash" />
      <div className="zm-ringwrap">
        <div className="zm-ring3d" style={{ '--n': ring.length }}>
          {ring.map((m, i) => (
            <div key={m.name} className="zm-slot" style={{ '--a': (360 / ring.length) * i }}>
              <div className="zm-unspin" style={{ '--a': (360 / ring.length) * i }}>
                <span className={`zm-avatar zm-avatar--${themeOf(i)} zm-avatar--ring`}>{initials(m.name)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="zm-logo"><img src={`${import.meta.env.BASE_URL}zgdc-logo.jpg`} alt="" width="120" height="120" /></div>
      <i className="zm-orb zm-orb--a" /><i className="zm-orb zm-orb--b" /><i className="zm-orb zm-orb--c" />
    </div>
  )
}

function Card({ m, index, big, onOpen }) {
  const theme = themeOf(index)
  const move = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const c = e.currentTarget, r = c.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    c.style.setProperty('--ty', `${((x - 0.5) * 12).toFixed(2)}deg`)
    c.style.setProperty('--tx', `${(-(y - 0.5) * 12).toFixed(2)}deg`)
    c.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
    c.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
  }
  const leave = (e) => { e.currentTarget.style.setProperty('--tx', '0deg'); e.currentTarget.style.setProperty('--ty', '0deg') }
  return (
    <li className={`zm-card zm-card--${theme} ${big ? 'zm-card--big' : ''}`} style={{ '--order': index % 8 }} onPointerMove={move} onPointerLeave={leave}>
      <button type="button" className="zm-card__btn" onClick={(e) => onOpen(m, e.currentTarget)} aria-label={`Open profile of ${m.name}, ${m.role}`}>
        <Avatar m={m} theme={theme} className={big ? 'zm-avatar--lg' : ''} />
        <span className="zm-card__name">{m.name}</span>
        <span className="zm-card__role">{m.role}</span>
        <span className="zm-card__meta">{meta(m)}</span>
      </button>
    </li>
  )
}

/** Accessible profile dialog: Esc closes, Tab stays inside, focus returns to the card. */
function Profile({ m, theme, opener, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current.focus()
    const key = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      const f = ref.current.querySelectorAll('a[href], button')
      if (!f.length) return
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); opener?.focus() }
  }, [])
  const group = GROUPS.find((g) => g.id === m.group)
  const links = [['LinkedIn', m.links?.linkedin], ['GitHub', m.links?.github]].filter(([, url]) => url)
  return (
    <div className="zm-backdrop" onClick={onClose}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`${m.name} profile`} onClick={(e) => e.stopPropagation()} className={`zm-dialog zm-dialog--${theme}`}>
        <Avatar m={m} theme={theme} className="zm-avatar--xl" />
        <h2 className="zm-dialog__name">{m.name}</h2>
        <p className="zm-dialog__role">{m.role}</p>
        <dl className="zm-dialog__facts">
          <div><dt>Team</dt><dd>{group?.label}</dd></div>
          {m.program && <div><dt>Program</dt><dd>{m.program}</dd></div>}
          {m.class && <div><dt>Class</dt><dd>{m.class}</dd></div>}
        </dl>
        {m.bio && <p className="zm-dialog__bio">{m.bio}</p>}
        {m.skills?.length > 0 && <p className="zm-dialog__skills">{m.skills.join(' · ')}</p>}
        {links.length > 0 && (
          <div className="zm-dialog__links">{links.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}</a>)}</div>
        )}
        <button type="button" className="btn btn-ghost zm-dialog__close" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default function Members() {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('all')
  const [open, setOpen] = useState(null)

  const people = useMemo(() => team.map((m, i) => ({ ...m, _i: i })), [])
  const counts = useMemo(() => Object.fromEntries(GROUPS.map((g) => [g.id, people.filter((m) => m.group === g.id).length])), [people])
  const programs = useMemo(() => new Set(people.map((m) => m.program).filter(Boolean)).size, [people])
  const q = query.trim().toLowerCase()
  const visible = (m) => (group === 'all' || m.group === group) && (!q || `${m.name} ${m.role} ${m.program} ${m.class}`.toLowerCase().includes(q))
  const shown = people.filter(visible)
  const clear = () => { setQuery(''); setGroup('all') }

  return (
    <div className="zm">
      <header className="zm-hero">
        <div className="zm-container zm-hero__inner">
          <div className="zm-hero__content">
            <p className="zm-eyebrow"><span className="zm-dots" aria-hidden="true"><i /><i /><i /><i /></span>The ZGDC student team</p>
            <h1 className="zm-hero__title">Meet the <span className="zm-hl">people</span> behind ZGDC</h1>
            <p className="zm-hero__intro">The students who lead, organise and build at the Zakariyan Google Developer Club, CASPAM Chapter. Select a card to see a profile.</p>
            <ul className="zm-stats">
              <li><b>{people.length}</b> members</li>
              <li><b>{counts.leadership}</b> office bearers</li>
              <li><b>{programs}</b> programs</li>
            </ul>
          </div>
          <Scene people={people.filter((m) => m.group === 'leadership')} />
        </div>
      </header>

      <div className="zm-container zm-body">
        <div className="zm-toolbar">
          <div className="zm-search" role="search">
            <label htmlFor="zm-search" className="zm-sr">Search members by name, role or program</label>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            <input id="zm-search" type="search" placeholder="Search by name, role or program" value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
          </div>
          <div className="zm-chips" role="group" aria-label="Filter by team">
            {[{ id: 'all', label: 'Everyone', n: people.length }, ...GROUPS.map((g) => ({ id: g.id, label: g.label, n: counts[g.id] }))].map((c) => (
              <button key={c.id} type="button" className={`zm-chip ${group === c.id ? 'is-active' : ''}`} aria-pressed={group === c.id} onClick={() => setGroup(c.id)}>
                {c.label}<span className="zm-chip__n">{c.n}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="zm-sr" role="status" aria-live="polite">{shown.length} {shown.length === 1 ? 'member' : 'members'} shown</p>

        {shown.length === 0 ? (
          <div className="zm-none">
            <h2>No members found</h2>
            <p>Nobody matches "{query}". Try a different name, role or program.</p>
            <button type="button" className="btn btn-ghost" onClick={clear}>Show everyone</button>
          </div>
        ) : GROUPS.map((g) => {
          const list = shown.filter((m) => m.group === g.id)
          if (!list.length) return null
          return (
            <section key={g.id} className="zm-section" aria-labelledby={`zm-h-${g.id}`}>
              <div className="zm-section__head">
                <h2 id={`zm-h-${g.id}`}>{g.label}</h2>
                <p>{g.blurb}</p>
              </div>
              <ul className={`zm-grid ${g.id === 'leadership' ? 'zm-grid--lead' : ''}`}>
                {list.map((m, i) => <Card key={m.name} m={m} index={i} big={g.id === 'leadership'} onOpen={(person, el) => setOpen({ m: person, el, theme: themeOf(i) })} />)}
              </ul>
            </section>
          )
        })}

        <aside className="zm-notice" aria-label="About this list">
          <p className="zm-notice__title">Appointed by official notification dated 27 October 2026</p>
          <ul>
            {NOTIFIED_BY.map((p) => <li key={p.name}><b>{p.name}</b><span>{p.title}</span></li>)}
          </ul>
        </aside>
      </div>

      {open && <Profile m={open.m} theme={open.theme} opener={open.el} onClose={() => setOpen(null)} />}
    </div>
  )
}
