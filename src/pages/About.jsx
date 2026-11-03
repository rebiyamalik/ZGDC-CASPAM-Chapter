import { useEffect } from 'react'
import { ZGDC } from '../data/zgdcInfo'
import {
  EyeIcon, BookIcon, UsersIcon, GrowthIcon, SparkleIcon,
  ArrowIcon, HeartIcon, RocketIcon, CodeIcon, GlobeIcon,
} from '../components/Icons'
import '../styles/About.css'

/* ── What We Do — 4 cards ───────────────────────────────── */
const whatWeDo = [
  {
    color:"#4285F4", Icon:SparkleIcon,
    title:"Technology & AI Workshops",
    desc:"Hands-on learning experiences in AI, programming, automation, and emerging technologies.",
  },
  {
    color:"#EA4335", Icon:CodeIcon,
    title:"Projects & Development",
    desc:"Building practical applications, experimenting with new ideas, and solving real-world problems.",
  },
  {
    color:"#FBBC05", Icon:GrowthIcon,
    title:"Competitions & Innovation",
    desc:"Providing opportunities to showcase creativity, technical skills, and innovative thinking.",
  },
  {
    color:"#34A853", Icon:UsersIcon,
    title:"Community & Collaboration",
    desc:"Connecting students, sharing knowledge, supporting one another, and growing together.",
  },
]

/* ── Mission pillars — 5 commitments ───────────────────── */
const missionPillars = [
  {
    color:"#4285F4", Icon:BookIcon,
    title:"Promoting Practical Learning",
    desc:"Creating opportunities for hands-on experience through workshops, technical sessions, and real-world projects.",
  },
  {
    color:"#EA4335", Icon:SparkleIcon,
    title:"Encouraging Innovation",
    desc:"Inspiring students to explore emerging technologies, including Artificial Intelligence, software development, automation, and digital innovation.",
  },
  {
    color:"#34A853", Icon:UsersIcon,
    title:"Building Collaboration",
    desc:"Connecting students from diverse academic backgrounds to exchange ideas, share expertise, and develop solutions together.",
  },
  {
    color:"#FBBC05", Icon:GrowthIcon,
    title:"Developing Future Leaders",
    desc:"Nurturing creativity, problem-solving, teamwork, and technical leadership through community engagement and collaborative initiatives.",
  },
  {
    color:"#4285F4", Icon:RocketIcon,
    title:"Turning Ideas into Reality",
    desc:"Supporting students in transforming concepts into functional projects, innovative products, and meaningful contributions.",
  },
]

/* ── Stats strip — 4 items ──────────────────────────────── */
const stats = [
  { num:`${ZGDC.members}`, label:"Members",       color:"#4285F4" },
  { num:"CASPAM",          label:"Campus",         color:"#EA4335" },
  { num:"AI Baithak",      label:"Upcoming Event", color:"#34A853" },
  { num:ZGDC.founded,     label:"Year",            color:"#FBBC05" },
]

export default function About() {
  useEffect(() => {
    document.title = 'About Us | ZGDC CASPAM Chapter'
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = Object.assign(document.createElement('meta'),{name:'description'}); document.head.appendChild(m) }
    m.content = 'Learn about the Zakariyan Google Developer Club (ZGDC) CASPAM Chapter at BZU Multan — our mission, vision, and community activities.'
  }, [])

  return (
    <main className="zg-page" style={{ background:'#fff' }}>

      {/* ── HERO / WHO WE ARE ────────────────────────────── */}
      <section className="about-hero" aria-labelledby="about-heading">
        <div className="zg-wrap about-hero-grid">
          <div className="fade-up">
            <div className="zg-dots" aria-hidden="true"><i/><i/><i/><i/></div>

            {/* Eyebrow — plain text, no sideline */}
            <p style={{ fontSize:12, fontWeight:600, color:"#4285F4", textTransform:"uppercase",
              letterSpacing:".12em", marginBottom:12 }}>About Us</p>

            <h1 id="about-heading" style={{
              fontFamily:"'Poppins','Sora',sans-serif", fontWeight:800,
              fontSize:"clamp(32px,5.5vw,52px)", lineHeight:1.15,
              color:"#202124", margin:"8px 0 16px",
            }}>
              Who We Are
            </h1>

            <p style={{ fontSize:16, fontWeight:600, color:"#202124", lineHeight:1.7, marginBottom:16 }}>
              Building Ideas. Empowering Innovators. Shaping the Future.
            </p>

            <p style={{ fontSize:16, lineHeight:1.8, marginBottom:16, color:"#5F6368" }}>
              <strong>Zakariyan Google Developer Club &ndash; CASPAM Chapter (ZGDC&ndash;CASPAM)</strong> is
              a student-driven technology community based at the Center for Advanced Studies in Pure and
              Applied Mathematics (CASPAM), Bahauddin Zakariya University, Multan.
            </p>
            <p style={{ fontSize:16, lineHeight:1.8, marginBottom:16, color:"#5F6368" }}>
              We bring together students, aspiring developers, creative thinkers, and technology enthusiasts
              who believe in learning by doing and innovation through collaboration.
            </p>
            <p style={{ fontSize:16, lineHeight:1.8, marginBottom:32, color:"#5F6368" }}>
              ZGDC&ndash;CASPAM serves as a platform where curiosity meets technology and ideas evolve into
              practical solutions. Through technical workshops, hands-on sessions, collaborative projects,
              competitions, mentorship, and community-driven initiatives, we strive to create an environment
              where students don&apos;t just learn about technology &mdash; they learn to build with it.
            </p>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <a className="zg-btn zg-btn-primary" href="#/contact">Get in Touch <ArrowIcon size={17}/></a>
              <a className="zg-btn zg-btn-outline" href="#mission">Our Mission</a>
            </div>
          </div>

          {/* 3-D logo */}
          <div className="about-logo-wrap">
            <div className="about-logo-3d">
              <img className="about-logo-img" src="/zgdc-logo.jpg"
                alt="Zakariyan Google Developer Club logo" width="360" height="360"/>
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div style={{ background:"#F8F9FA", borderTop:"1px solid #E8EAED", borderBottom:"1px solid #E8EAED", marginTop:48 }}>
          <div className="zg-wrap">
            <div className="about-stats-row" style={{
              display:"grid", gridTemplateColumns:"repeat(4,1fr)",
              textAlign:"center", gap:0,
            }}>
              {stats.map(({ num, label, color }, i) => (
                <div key={label} style={{
                  padding:"28px 16px",
                  borderRight: i < stats.length - 1 ? "1px solid #E8EAED" : "none",
                }}>
                  <div style={{
                    fontFamily:"'Poppins',sans-serif", fontWeight:800,
                    fontSize:"clamp(18px,2.5vw,32px)", lineHeight:1,
                    color, marginBottom:6,
                  }}>
                    {num}
                  </div>
                  <div style={{
                    fontSize:12, fontWeight:600, color:"#9AA0A6",
                    textTransform:"uppercase", letterSpacing:".08em",
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="zg-divider"/>

      {/* ── WHAT WE DO ───────────────────────────────────── */}
      <section className="zg-section" aria-labelledby="whatwedo-heading" style={{ background:"#F8F9FA" }}>
        <div className="zg-wrap">
          <div style={{ textAlign:"center", maxWidth:600, margin:"0 auto 48px" }}>
            <p style={{ fontSize:12, fontWeight:600, color:"#4285F4", textTransform:"uppercase",
              letterSpacing:".12em", marginBottom:12 }}>What We Do</p>
            <h2 id="whatwedo-heading" style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:"clamp(24px,3.5vw,36px)", color:"#202124", marginBottom:14,
            }}>
              Our Activities &amp; Focus Areas
            </h2>
            <p style={{ fontSize:16, color:"#5F6368", lineHeight:1.75 }}>
              ZGDC&ndash;CASPAM brings students together across a wide range of technology disciplines —
              from AI workshops to collaborative community projects.
            </p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
            {whatWeDo.map(({ color, Icon, title, desc }) => (
              <div key={title} style={{
                background:"#fff", borderRadius:16,
                border:`1px solid ${color}20`,
                padding:28, boxShadow:"0 1px 3px rgba(60,64,67,.10), 0 4px 12px rgba(60,64,67,.05)",
                transition:"transform .25s, box-shadow .25s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 2px 8px rgba(60,64,67,.14), 0 8px 24px rgba(60,64,67,.08)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 1px 3px rgba(60,64,67,.10), 0 4px 12px rgba(60,64,67,.05)";}}
              >
                {/* Coloured accent bar */}
                <div style={{ width:40, height:4, borderRadius:4, background:color, marginBottom:20 }}/>
                <div style={{ width:48, height:48, borderRadius:12, background:`${color}15`,
                  display:"grid", placeItems:"center", color, marginBottom:16 }}>
                  <Icon size={22}/>
                </div>
                <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:17,
                  color:"#202124", marginBottom:10 }}>{title}</h3>
                <p style={{ fontSize:14, color:"#5F6368", lineHeight:1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="zg-divider"/>

      {/* ── VISION ───────────────────────────────────────── */}
      <section className="zg-section" aria-labelledby="vision-heading" style={{ background:"#fff" }}>
        <div className="zg-wrap">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }} className="about-two-col">
            <div>
              <p style={{ fontSize:12, fontWeight:600, color:"#4285F4", textTransform:"uppercase",
                letterSpacing:".12em", marginBottom:12 }}>Our Vision</p>
              <h2 id="vision-heading" style={{
                fontFamily:"'Poppins',sans-serif", fontWeight:800,
                fontSize:"clamp(24px,3.5vw,36px)", color:"#202124", marginBottom:20,
              }}>
                Where Curiosity Meets Creativity
              </h2>
              <p style={{ fontSize:16, lineHeight:1.85, color:"#5F6368", marginBottom:16 }}>
                To cultivate a vibrant, inclusive, and innovation-driven technology ecosystem where
                students are empowered to become creators, critical thinkers, problem-solvers, and
                future technology leaders.
              </p>
              <p style={{ fontSize:16, lineHeight:1.85, color:"#5F6368" }}>
                We envision a community where curiosity sparks innovation, collaboration drives progress,
                and knowledge becomes the foundation for solutions that make a meaningful impact on society.
              </p>
            </div>
            <div style={{
              background:"linear-gradient(135deg,rgba(66,133,244,.06),rgba(52,168,83,.06))",
              border:"1px solid rgba(66,133,244,.12)", borderRadius:24,
              padding:40, textAlign:"center",
            }}>
              <div style={{
                width:72, height:72, borderRadius:20, background:"rgba(66,133,244,.1)",
                display:"grid", placeItems:"center", color:"#4285F4",
                margin:"0 auto 20px",
              }}>
                <EyeIcon size={36}/>
              </div>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:18,
                color:"#202124", lineHeight:1.55 }}>
                &ldquo;From curious students to confident technology leaders.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="zg-divider"/>

      {/* ── MISSION ──────────────────────────────────────── */}
      <section className="zg-section" id="mission" aria-labelledby="mission-heading" style={{ background:"#F8F9FA" }}>
        <div className="zg-wrap">
          <div style={{ textAlign:"center", maxWidth:680, margin:"0 auto 48px" }}>
            <p style={{ fontSize:12, fontWeight:600, color:"#4285F4", textTransform:"uppercase",
              letterSpacing:".12em", marginBottom:12 }}>Our Mission</p>
            <h2 id="mission-heading" style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:"clamp(24px,3.5vw,36px)", color:"#202124", marginBottom:18,
            }}>
              Empowering Students Through Technology
            </h2>
            <p style={{ fontSize:16, lineHeight:1.8, color:"#5F6368" }}>
              Our mission is to bridge the gap between learning and practical implementation by
              empowering students with the skills, knowledge, and confidence to build with modern technologies.
            </p>
          </div>

          {/* 5 Pillars */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20, marginBottom:44 }}>
            {missionPillars.map(({ color, Icon, title, desc }) => (
              <article key={title} style={{
                background:"#fff", border:`1px solid ${color}22`,
                borderTop:`4px solid ${color}`, borderRadius:20,
                padding:28, boxShadow:"0 1px 3px rgba(60,64,67,.12), 0 4px 12px rgba(60,64,67,.06)",
                transition:"transform .25s, box-shadow .25s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 2px 8px rgba(60,64,67,.14), 0 8px 24px rgba(60,64,67,.08)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 1px 3px rgba(60,64,67,.12), 0 4px 12px rgba(60,64,67,.06)";}}
              >
                <div style={{ width:52, height:52, borderRadius:14, background:`${color}15`,
                  display:"grid", placeItems:"center", color, marginBottom:14 }}>
                  <Icon size={24}/>
                </div>
                <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:17,
                  color:"#202124", marginBottom:8 }}>{title}</h3>
                <p style={{ fontSize:15, color:"#5F6368", lineHeight:1.65 }}>{desc}</p>
              </article>
            ))}
          </div>

          {/* Closing statement */}
          <div style={{
            background:"#fff", borderRadius:16,
            border:"1px solid rgba(66,133,244,.15)",
            borderLeft:"4px solid #4285F4",
            padding:"24px 28px",
            maxWidth:740, margin:"0 auto",
          }}>
            <p style={{ fontSize:15, lineHeight:1.85, color:"#5F6368", margin:0, textAlign:"center" }}>
              At ZGDC&ndash;CASPAM, we believe that technology is best learned by building,
              innovation grows through collaboration, and every great idea deserves an opportunity to become reality.
            </p>
          </div>
        </div>
      </section>

      <hr className="zg-divider"/>

      {/* ── JOIN CTA ──────────────────────────────────────── */}
      <section className="zg-section" style={{ background:"#fff" }}>
        <div className="zg-wrap">
          <div className="about-cta">
            <HeartIcon size={36} style={{ color:"#fff", margin:"0 auto 16px", display:"block" }}/>
            <h2>Want to join or collaborate?</h2>
            <p>Reach out to the ZGDC CASPAM team &mdash; we would love to hear from you.</p>
            <a className="zg-btn" href="#/contact">Contact Us</a>
          </div>
        </div>
      </section>

    </main>
  )
}
