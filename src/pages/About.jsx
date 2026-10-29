export default function About() {
  const items = [['Mission', 'Help BZU students learn modern tech, build real projects and prepare for careers.'],
    ['What we run', 'Workshops, hack sessions, study jams, speaker talks and career sessions.'],
    ['Who can join', 'Any BZU student. No experience needed — just curiosity.']]
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-4xl font-extrabold">About us</h1>
      <p className="mt-4 text-lg">The Zakariyan Google Developer Club – CASPAM Chapter is a student-led community at Bahauddin Zakariya University, Multan. {/* TODO: add chapter history/faculty advisor */}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {items.map(([t, d]) => <div key={t} className="layered rounded-2xl bg-white p-6"><h2 className="font-display text-xl font-bold">{t}</h2><p className="mt-2">{d}</p></div>)}
      </div>
    </section>
  )
}
