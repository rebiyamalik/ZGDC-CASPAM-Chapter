import { lazy, Suspense } from 'react'
const Scene3D = lazy(() => import('./Scene3D')) // keeps Three.js out of the first bundle
export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
      <div>
        <p className="mb-3 font-semibold text-brand">BZU Multan · Google Developer Club</p>
        <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">Build. Learn. <span className="text-brand">Ship</span> together.</h1>
        <p className="mt-4 max-w-md text-lg">ZGDC–CASPAM is where Zakariyan students grow into developers, designers and data people.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#/contact" className="btn btn-primary">Join the chapter</a>
          <a href="#/events" className="btn btn-ghost">See events</a>
        </div>
      </div>
      <div className="h-72 sm:h-96"><Suspense fallback={null}><Scene3D /></Suspense></div>
    </section>
  )
}
