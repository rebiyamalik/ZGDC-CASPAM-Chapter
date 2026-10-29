import site from '../data/site.json'
export default function Footer({ onReplay }) {
  return (
    <footer className="bg-ink py-12 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="font-display text-xl font-bold">ZGDC–CASPAM Chapter</p>
        <ul className="mt-5 flex justify-center gap-6">
          {Object.entries(site.social).map(([n, u]) => <li key={n}><a href={u || '#'} className="underline" rel="noopener">{n}</a></li>)}
        </ul>
        <p className="mt-6 text-sm">{site.address}</p>
        <button onClick={onReplay} className="mt-4 text-sm underline">Replay intro</button>
      </div>
    </footer>
  )
}
