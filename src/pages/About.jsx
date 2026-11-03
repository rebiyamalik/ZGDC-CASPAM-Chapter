import { useEffect } from 'react'
import { ZGDC } from '../data/zgdcInfo'
import {
  EyeIcon, BookIcon, UsersIcon, GrowthIcon, SparkleIcon,
  ArrowIcon, HeartIcon, RocketIcon, TargetIcon, BrainIcon,
  CodeIcon, GlobeIcon,
} from '../components/Icons'
import '../styles/About.css'

const missionPillars = [
  {
    color:"#4285F4", Icon:BookIcon,
    title:"Promoting Practical Learning",
    desc:"Providing hands-on workshops, interactive sessions, and real-world learning experiences that go beyond theory.",
  },
  {
    color:"#EA4335", Icon:SparkleIcon,
    title:"Encouraging Innovation",
    desc:"Creating a space where students can experiment with new ideas, explore emerging technologies, and build meaningful solutions.",
  },
  {
    color:"#34A853", Icon:UsersIcon,
    title:"Building Collaboration",
    desc:"Encouraging teamwork, peer learning, and knowledge sharing across all experience levels and backgrounds.",
  },
  {
    color:"#FBBC05", Icon:GrowthIcon,
    title:"Developing Future Leaders",
    desc:"Helping students grow not just as developers, but as communicators, problem-solvers, and community contributors.",
  },
  {
    color:"#4285F4", Icon:RocketIcon,
    title:"Turning Ideas into Reality",
    desc:"Supporting students in transforming creative concepts into practical projects that create genuine impact.",
  },
]

const stats = [
  { num:`${ZGDC.members}`, label:"Members",        color:"#4285F4" },
  { num:"CASPAM",          label:"Campus",          color:"#EA4335" },
  { num:"AI Baithak",      label:"Upcoming Event",  color:"#34A853" },
  { num:ZGDC.founded,     label:"Year",             color:"#FBBC05" },
]

export default function About() {
  useEffect(() => {
    document.title = 'About Us | ZGDC CASPAM Chapter'
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = Object.assign(document.createElement('meta'),{name:'description'}); document.head.appendChild(m) }
    m.content = 'Learn about the Zakariyan Google Developer Club (ZGDC) CASPAM Chapter at BZU Multan — our mission, vision, and objectives.'
  }, [])

  return (
    <main className="zg-page" style={{ background:'#fff' }}>

      {/* ── HERO / WHO WE ARE ── */}
      <section className="about-hero" aria-labelledby="about-heading">
        <div className="zg-wrap about-hero-grid">
          <div className="fade-up">
            <div className="zg-dots" aria-hidden="true"><i/><i/><i/><i/></div>
            <span className="zg-eyebrow">About Us</span>
            <h1 id="about-heading" style={{
              fontFamily:"'Poppins','Sora',sans-serif",
              fontWeight:800,
              fontSize:"clamp(32px,5.5vw,52px)",
              lineHeight:1.15,
              color:"#202124",
              margin:"8px 0 20px",
            }}>
              Who We Are
            </h1>
            <p style={{ fontSize:17, lineHeight:1.8, marginBottom:18, color:"#5F6368" }}>
              <em style={{ fontStyle:"normal", fontWeight:600, color:"#202124" }}>
                Building Ideas. Empowering Innovators. Shaping the Future.
              </em>
            </p>
            <p style={{ fontSize:16, lineHeight:1.8, marginBottom:20, color:"#5F6368" }}>
              Zakariyan Google Developer Club &ndash; CASPAM Chapter (ZGDC-CASPAM) is a student-driven
              technology community at the Center for Advanced Studies in Pure and Applied Mathematics
              (CASPAM), Bahauddin Zakariya University, Multan. We bring together curious minds,
              aspiring developers, and technology enthusiasts who share a passion for learning,
              innovation, and building meaningful solutions.
            </p>
            <p style={{ fontSize:16, lineHeight:1.8, marginBottom:32, color:"#5F6368" }}>
              Our community provides a collaborative space where students can explore emerging
              technologies, exchange ideas, develop practical skills, and turn their creativity
              into real-world projects. Through learning opportunities, technical activities, and
              community engagement, we aim to make technology more accessible and inspire students
              to grow together.
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

        {/* ── Stats strip — white/light bg, 4 items ── */}
        <div style={{ background:"#F8F9FA", borderTop:"1px solid #E8EAED", borderBottom:"1px solid #E8EAED", marginTop:48 }}>
          <div className="zg-wrap">
            <div className="about-stats-row" style={{
              display:"grid",
              gridTemplateColumns:"repeat(4,1fr)",
              textAlign:"center",
              gap:0,
            }}>
              {stats.map(({ num, label, color }, i) => (
                <div key={label} style={{
                  padding:"28px 16px",
                  borderRight: i < stats.length - 1 ? "1px solid #E8EAED" : "none",
                }}>
                  <div style={{
                    fontFamily:"'Poppins',sans-serif", fontWeight:800,
                    fontSize:"clamp(20px,3vw,34px)", lineHeight:1,
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

          <style>{`
            @media (max-width:600px) {
              .about-stats-row { grid-template-columns: repeat(2,1fr) !important; }
              .about-stats-row > div { border-right: 1px solid #E8EAED !important; }
              .about-stats-row > div:nth-child(2n) { border-right: none !important; }
              .about-stats-row > div { border-bottom: 1px solid #E8EAED; }
            }
          `}</style>
        </div>
      </section>

      <hr className="zg-divider"/>

      {/* ── VISION ── */}
      <section className="zg-section" aria-labelledby="vision-heading" style={{ background:"#fff" }}>
        <div className="zg-wrap">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }} className="about-two-col">
            <div>
              <span className="zg-eyebrow">Our Vision</span>
              <h2 id="vision-heading" style={{
                fontFamily:"'Poppins',sans-serif", fontWeight:800,
                fontSize:"clamp(24px,3.5vw,36px)", color:"#202124", margin:"10px 0 18px",
              }}>
                Where Curiosity Meets Creativity
              </h2>
              <p style={{ fontSize:16, lineHeight:1.85, color:"#5F6368" }}>
                To cultivate a vibrant, inclusive, and innovation-driven technology ecosystem at
                CASPAM where students are empowered to explore, create, and lead. We envision a
                future where every student has the opportunity to discover their potential, develop
                meaningful skills, and contribute to the evolving world of technology through
                learning, collaboration, and purposeful action.
              </p>
            </div>
            <div style={{
              background:"linear-gradient(135deg,rgba(66,133,244,.06),rgba(52,168,83,.06))",
              border:"1px solid rgba(66,133,244,.15)", borderRadius:24,
              padding:40, textAlign:"center",
            }}>
              <div style={{
                width:72, height:72, borderRadius:20, background:"rgba(66,133,244,.1)",
                display:"grid", placeItems:"center", color:"#4285F4",
                margin:"0 auto 20px",
              }}>
                <EyeIcon size={36}/>
              </div>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:18, color:"#202124", lineHeight:1.5 }}>
                &ldquo;From curious students to confident technology leaders.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="zg-divider"/>

      {/* ── MISSION ── */}
      <section className="zg-section" id="mission" aria-labelledby="mission-heading" style={{ background:"#F8F9FA" }}>
        <div className="zg-wrap">
          <div className="zg-title">
            <span className="zg-eyebrow">Our Mission</span>
            <h2 id="mission-heading" style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:"clamp(24px,3.5vw,36px)", color:"#202124", margin:"10px 0 18px",
            }}>
              Empowering Students Through Technology
            </h2>
            <p style={{ fontSize:16, lineHeight:1.8, color:"#5F6368" }}>
              Our mission is to empower students with the knowledge, skills, and confidence needed to
              explore and build with modern technologies. We strive to create opportunities for
              hands-on learning, encourage collaboration, promote emerging fields such as Artificial
              Intelligence and software development, and support students in transforming their ideas
              into practical projects.
            </p>
          </div>

          {/* 5 Pillars */}
          <div className="zg-grid">
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
                <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:17, color:"#202124", marginBottom:8 }}>{title}</h3>
                <p style={{ fontSize:15, color:"#5F6368", lineHeight:1.65 }}>{desc}</p>
              </article>
            ))}
          </div>

          {/* Closing statement */}
          <div style={{
            marginTop:48, background:"#fff", borderRadius:16,
            border:"1px solid rgba(66,133,244,.15)",
            borderLeft:"4px solid #4285F4",
            padding:"24px 28px",
            maxWidth:720, marginLeft:"auto", marginRight:"auto",
          }}>
            <p style={{ fontSize:15, lineHeight:1.85, color:"#5F6368", margin:0 }}>
              At ZGDC&ndash;CASPAM, we believe that technology is best learned by building,
              collaborating, and growing together. Every session, every project, and every
              conversation moves us closer to a stronger, more capable community.
            </p>
          </div>
        </div>
      </section>

      <hr className="zg-divider"/>

      {/* ── JOIN CTA ── */}
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
