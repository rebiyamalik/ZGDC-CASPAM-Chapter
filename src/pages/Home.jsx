import Hero from '../components/Hero'
import Tracks from '../components/Tracks'
export default function Home() {
  return (
    <>
      <Hero />
      <Tracks />
      <section className="bg-soft py-14 text-center">
        <h2 className="font-display text-3xl font-bold">Ready to join?</h2>
        <p className="mt-2">Come to our next event or get in touch.</p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="#/events" className="btn btn-primary">See events</a>
          <a href="#/contact" className="btn btn-ghost">Contact us</a>
        </div>
      </section>
    </>
  )
}
