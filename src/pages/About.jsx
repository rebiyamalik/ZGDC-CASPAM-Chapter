import { useEffect } from 'react'
import { ZGDC } from '../data/zgdcInfo'
import {
  EyeIcon, BookIcon, UsersIcon, GrowthIcon, SparkleIcon,
  ArrowIcon, HeartIcon, RocketIcon, TargetIcon, BrainIcon
} from '../components/Icons'
import '../styles/About.css'

const missionPillars = [
  { color:"#4285F4", Icon:BookIcon,    title:"Learning",      desc:"Hands-on workshops, study sessions, and skill-building resources for every level." },
  { color:"#EA4335", Icon:SparkleIcon, title:"Innovation",    desc:"Turn creative ideas into real projects that address genuine challenges." },
  { color:"#34A853", Icon:UsersIcon,   title:"Collaboration", desc:"Teamwork, mentorship, and peer learning across all experience levels." },
  { color:"#FBBC05", Icon:GrowthIcon,  title:"Growth",        desc:"Personal and professional development through community, practice, and leadership." },
]

const stats = [
  { num:`${ZGDC.members}`, label:"Members",       color:"#4285F4" },
  { num:"1",               label:"Upcoming Event", color:"#EA4335" },
  { num:ZGDC.founded,     label:"Year",           color:"#34A853" },
  { num:"CASPAM · BZU",  label:"Campus",          color:"#FBBC05" },
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
            <p style={{ fontSize:17, lineHeight:1.8, marginBottom:20, color:"#5F6368" }}>
              Zakariyan Google Developer Club – CASPAM Chapter (ZGDC-CASPAM) is a student-driven
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

        {/* ── Stats strip (same style as homepage, white bg) ── */}
        <div style={{ background:"#F8F9FA", borderTop:"1px solid #E8EAED", borderBottom:"1px solid #E8EAED", marginTop:48 }}>
          <div className="zg-wrap">
            <div className="about-stats-row" style={{
              display:"grid",
              gridTemplateColumns:"repeat(4,1fr)",
              textAlign:"center",
              gap:0,
            }}>
              {stats.map(({ num, label, color }) => (
                <div key={label} style={{
                  padding:"28px 16px",
                  borderRight:"1px solid #E8EAED",
                }}>
                  <div style={{
                    fontFamily:"'Poppins',sans-serif", fontWeight:800,
                    fontSize:"clamp(26px,3.5vw,38px)", lineHeight:1,
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
                To build an innovative and inclusive student technology community where curiosity leads
                to creativity, ideas turn into meaningful solutions, and students become confident
                creators, problem-solvers, and future technology leaders. We envision a future where
                our members contribute to the evolving world of technology through knowledge,
                collaboration, and innovation.
              </p>
            </div>
            <div style={{
              background:"linear-gradient(135deg,rgba(66,133,244,.06),rgba(52,168,83,.06))",
              border:"1px solid rgba(66,133,244,.15)", borderRadius:24,
              padding:40, textAlign:"center",
            }}>
              {/* SVG rocket icon instead of emoji */}
              <div style={{
                width:72, height:72, borderRadius:20, background:"rgba(66,133,244,.1)",
                display:"grid", placeItems:"center", color:"#4285F4",
                margin:"0 auto 20px",
              }}>
                <RocketIcon size={36}/>
              </div>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:18, color:"#202124", lineHeight:1.5 }}>
                "From curious students to confident technology leaders."
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

          {/* 4 Pillars */}
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
                <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:18, color:"#202124", marginBottom:8 }}>{title}</h3>
                <p style={{ fontSize:15, color:"#5F6368", lineHeight:1.65 }}>{desc}</p>
              </article>
            ))}
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
            <p>Reach out to the ZGDC CASPAM team — we would love to hear from you.</p>
            <a className="zg-btn" href="#/contact">Contact Us</a>
          </div>
        </div>
      </section>

    </main>
  )
}
