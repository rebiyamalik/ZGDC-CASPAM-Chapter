import events from '../data/events.json'
import RegistrationForm from '../components/RegistrationForm'

function EventCard({ ev }) {
  const up = ev.status === 'upcoming'
  return (
    <li className="layered mb-6 rounded-2xl bg-white p-6">
      <time dateTime={ev.date} className="text-sm font-semibold text-brand">{ev.date} · {ev.time} · {ev.venue}</time>
      <h3 className="mt-1 font-display text-xl font-bold">{ev.title}</h3>
      <p className="mt-1">{ev.desc}</p>
      {up && (ev.registerUrl
        ? <a href={ev.registerUrl} className="btn btn-primary mt-4" rel="noopener">Register on form</a>
        : <RegistrationForm ev={ev} />)}
      {ev.notes.length > 0 && (
        <div className="mt-4"><h4 className="text-sm font-bold">Notes (PDF)</h4>
          <ul className="mt-1 list-disc pl-5">{ev.notes.map(n => <li key={n.file}><a className="text-brand underline" href={n.file} download>{n.title}</a></li>)}</ul></div>
      )}
    </li>
  )
}
export default function Events() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-extrabold">Events</h1>
      {['upcoming', 'past'].map(s => (
        <div key={s}>
          <h2 className="mb-4 mt-10 font-display text-2xl font-bold capitalize">{s} events</h2>
          <ul>{events.filter(e => e.status === s).map(e => <EventCard key={e.id} ev={e} />)}</ul>
        </div>
      ))}
    </section>
  )
}
