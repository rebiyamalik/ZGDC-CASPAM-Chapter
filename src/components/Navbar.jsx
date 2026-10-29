import Logo from './Logo'
const links = [['Home', 'home'], ['About Us', 'about'], ['Members', 'members'], ['Events', 'events'], ['Contact Us', 'contact']]
export default function Navbar({ route }) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 px-4 py-2">
        <a href="#/home" className="flex items-center gap-2 font-display font-bold" aria-label="ZGDC–CASPAM home">
          <Logo /> <span className="hidden lg:inline">ZGDC–<span className="text-brand">CASPAM</span></span>
        </a>
        <ul className="flex gap-3 text-sm font-medium sm:gap-6">
          {links.map(([t, r]) => (
            <li key={r}><a href={`#/${r}`} aria-current={route === r ? 'page' : undefined}
              className={`inline-block border-b-2 py-2 ${route === r ? 'border-brand text-brand' : 'border-transparent hover:text-brand'}`}>{t}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
