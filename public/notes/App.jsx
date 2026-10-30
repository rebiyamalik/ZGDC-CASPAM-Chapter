import { useState } from 'react'
import useRoute from './hooks/useRoute'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Members from './pages/Members'
import Events from './pages/Events'
import Notes from './pages/Notes'
import Contact from './pages/Contact'

/** The 6 pages. To add a page: create it in /pages and add a line here + in Navbar. */
const pages = { home: Home, about: About, members: Members, events: Events, notes: Notes, contact: Contact }

export default function App() {
  const route = useRoute()
  const Page = pages[route] || Home
  // Intro plays once per visit (sessionStorage), see Intro.jsx
  const [introDone, setIntroDone] = useState(() => { try { return sessionStorage.getItem('zgdc-intro') === '1' } catch { return false } })
  const replay = () => { try { sessionStorage.removeItem('zgdc-intro') } catch {} window.scrollTo(0, 0); setIntroDone(false) }
  return (
    <>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      <button className="sr-only focus:not-sr-only focus:fixed focus:z-[60] focus:bg-white focus:p-3"
        onClick={() => document.getElementById('main').focus()}>Skip to content</button>
      <Navbar route={route} />
      <main id="main" tabIndex={-1} className="outline-none"><Page /></main>
      <Footer onReplay={replay} />
    </>
  )
}
