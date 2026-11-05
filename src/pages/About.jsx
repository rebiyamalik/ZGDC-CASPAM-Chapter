import { useEffect } from 'react'
import { ZGDC } from '../data/zgdcInfo'
import { ArrowIcon, HeartIcon } from '../components/Icons'
import '../styles/About.css'

const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"]

const whatWeDo = [
  { color:colors[0], number:"01", title:"Technology & AI Workshops", desc:"Hands-on learning experiences in AI, programming, automation, and emerging technologies." },
  { color:colors[1], number:"02", title:"Projects & Development", desc:"Building practical applications, experimenting with new ideas, and solving real-world problems." },
  { color:colors[2], number:"03", title:"Competitions & Innovation", desc:"Providing opportunities to showcase creativity, technical skills, and innovative thinking." },
  { color:colors[3], number:"04", title:"Community & Collaboration", desc:"Connecting students, sharing knowledge, supporting one another, and growing together." },
]

const commitments = [
  { title:"Promoting Practical Learning", desc:"Creating opportunities for hands-on experience through workshops, technical sessions, and real-world projects." },
  { title:"Encouraging Innovation", desc:"Inspiring students to explore emerging technologies, including Artificial Intelligence, software development, automation, and digital innovation." },
  { title:"Building Collaboration", desc:"Connecting students from diverse academic backgrounds to exchange ideas, share expertise, and develop solutions together." },
  { title:"Developing Future Leaders", desc:"Nurturing creativity, problem-solving, teamwork, and technical leadership through community engagement and collaborative initiatives." },
  { title:"Turning Ideas into Reality", desc:"Supporting students in transforming concepts into functional projects, innovative products, and meaningful contributions." },
]

function ColorRule() {
  return <div className="about-color-rule" aria-hidden="true"><i/><i/><i/><i/></div>
}

function Eyebrow({ children }) {
  return <span className="about-eyebrow">{children}</span>
}

export default function About() {
  useEffect(() => {
    document.title = 'About Us | ZGDC CASPAM Chapter'
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = Object.assign(document.createElement('meta'), { name:'description' })
      document.head.appendChild(meta)
    }
    meta.content = 'Learn about the Zakariyan Google Developer Club (ZGDC) CASPAM Chapter at BZU Multan.'
  }, [])

  return (
    <main className="about-page">
      <section className="about-intro">
        <div className="about-shell about-intro-inner">
          <Eyebrow>About us · BZU Multan</Eyebrow>
          <h1>A student community for developers at <span>BZU Multan</span></h1>
          <p className="about-intro-lead">Building Ideas. Empowering Innovators. Shaping the Future.</p>
          <p className="about-intro-copy">
            <strong>Zakariyan Google Developer Club – CASPAM Chapter (ZGDC–CASPAM)</strong> is a
            student-driven technology community based at the Center for Advanced Studies in Pure
            and Applied Mathematics (CASPAM), Bahauddin Zakariya University, Multan.
            We bring together students, aspiring developers, creative thinkers, and technology
            enthusiasts who believe in learning by doing and innovation through collaboration.
          </p>
          <div className="about-intro-actions">
            <a className="btn btn-primary" href="#/contact">Get in Touch <ArrowIcon size={15}/></a>
            <a className="btn btn-ghost" href="#mission">Explore Our Mission</a>
          </div>
          <div className="about-stats" aria-label="Chapter facts">
            <div><strong>{ZGDC.members}+</strong><span>Members</span></div>
            <div><strong>CASPAM</strong><span>Our campus</span></div>
            <div><strong>{ZGDC.founded}</strong><span>Established</span></div>
          </div>
        </div>
      </section>

      <section className="about-pillars-section">
        <div className="about-shell about-pillars">
          <article className="about-pillar about-pillar-mission">
            <span className="about-pillar-kicker">Our mission</span>
            <h2>Empowering students through technology</h2>
            <p>Bridge the gap between learning and practical implementation by building the skills, knowledge, and confidence to work with modern technologies.</p>
          </article>
          <article className="about-pillar about-pillar-vision">
            <span className="about-pillar-kicker">Our vision</span>
            <h2>Where curiosity meets creativity</h2>
            <p>Cultivate an inclusive, innovation-driven community where students grow into creators, critical thinkers, problem-solvers, and future technology leaders.</p>
          </article>
        </div>
      </section>

      <section className="about-activities-section">
        <div className="about-shell">
          <div className="about-section-heading">
            <Eyebrow>What we do</Eyebrow>
            <h2>Our Activities &amp; Focus Areas</h2>
            <p>From first experiments to practical projects, we create opportunities to explore technology and learn together.</p>
            <ColorRule/>
          </div>
          <div className="about-activity-grid">
            {whatWeDo.map(item => (
              <article className="about-activity-card" key={item.title} style={{"--about-accent":item.color}}>
                <span className="about-activity-number">{item.number}</span>
                <span className="about-activity-mark" aria-hidden="true"><i/></span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-vision-section">
        <div className="about-shell about-vision-grid">
          <div className="about-vision-copy">
            <Eyebrow>Where curiosity meets creativity</Eyebrow>
            <h2>Ideas grow when people learn and build together.</h2>
            <p>ZGDC–CASPAM serves as a platform where curiosity meets technology and ideas evolve into practical solutions. Through technical workshops, hands-on sessions, collaborative projects, competitions, and community-driven initiatives, students learn to build with technology — not just learn about it.</p>
            <p>We envision a community where curiosity sparks innovation, collaboration drives progress, and knowledge becomes the foundation for solutions that make a meaningful impact on society.</p>
            <ColorRule/>
          </div>
          <figure className="about-vision-photo">
            <img src="/about-lab.jpg" alt="ZGDC CASPAM students learning together in the computer lab"/>
            <figcaption>Learning together · Building what’s next</figcaption>
          </figure>
        </div>
      </section>

      <section className="about-commitments-section" id="mission">
        <div className="about-shell">
          <div className="about-section-heading about-commitments-heading">
            <Eyebrow>Our mission in action</Eyebrow>
            <h2>What we are committed to</h2>
            <p>We aim to turn shared curiosity into skills, confidence, and practical outcomes.</p>
            <ColorRule/>
          </div>
          <div className="about-commitment-grid">
            {commitments.map((item, index) => (
              <article className="about-commitment" key={item.title} style={{"--about-accent":colors[index % colors.length]}}>
                <span className="about-commitment-number">{String(index+1).padStart(2,"0")}</span>
                <div><h3>{item.title}</h3><p>{item.desc}</p></div>
              </article>
            ))}
          </div>
          <p className="about-belief">At ZGDC–CASPAM, we believe technology is best learned by building, innovation grows through collaboration, and every great idea deserves an opportunity to become reality.</p>
        </div>
      </section>

      <section className="about-join-section">
        <div className="about-shell">
          <div className="about-join-card">
            <span className="about-join-icon"><HeartIcon size={28}/></span>
            <Eyebrow>Be part of the community</Eyebrow>
            <h2>Want to join or collaborate?</h2>
            <p>Reach out to the ZGDC CASPAM team — we would love to hear from you.</p>
            <div className="about-join-actions">
              <a href="#/contact" className="btn btn-primary">Contact Us <ArrowIcon size={15}/></a>
              <a href="#/members" className="btn btn-ghost">Meet the Team</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
