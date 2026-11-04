import { useEffect } from 'react'
import { ZGDC } from '../data/zgdcInfo'
import { EyeIcon, ArrowIcon, HeartIcon } from '../components/Icons'
import '../styles/About.css'

/* ── Shared: Google colour dots ── */
const GoogleDots = () => (
  <div style={{ display:"flex", gap:7, marginBottom:20 }}>
    {["#4285F4","#EA4335","#FBBC05","#34A853"].map(c => (
      <span key={c} style={{ width:11, height:11, borderRadius:"50%", background:c, display:"inline-block" }}/>
    ))}
  </div>
)

/* ── What We Do — 4 pill-bar cards ── */
const whatWeDo = [
  { color:"#4285F4", title:"Technology & AI Workshops",
    desc:"Hands-on learning experiences in AI, programming, automation, and emerging technologies." },
  { color:"#EA4335", title:"Projects & Development",
    desc:"Building practical applications, experimenting with new ideas, and solving real-world problems." },
  { color:"#FBBC05", title:"Competitions & Innovation",
    desc:"Providing opportunities to showcase creativity, technical skills, and innovative thinking." },
  { color:"#34A853", title:"Community & Collaboration",
    desc:"Connecting students, sharing knowledge, supporting one another, and growing together." },
]

/* ── Mission commitments ── */
const commitments = [
  { title:"Promoting Practical Learning",
    desc:"Creating opportunities for hands-on experience through workshops, technical sessions, and real-world projects." },
  { title:"Encouraging Innovation",
    desc:"Inspiring students to explore emerging technologies, including Artificial Intelligence, software development, automation, and digital innovation." },
  { title:"Building Collaboration",
    desc:"Connecting students from diverse academic backgrounds to exchange ideas, share expertise, and develop solutions together." },
  { title:"Developing Future Leaders",
    desc:"Nurturing creativity, problem-solving, teamwork, and technical leadership through community engagement and collaborative initiatives." },
  { title:"Turning Ideas into Reality",
    desc:"Supporting students in transforming concepts into functional projects, innovative products, and meaningful contributions." },
]

const commitmentColors = ["#4285F4","#EA4335","#34A853","#FBBC05","#4285F4"]

/* ── Stats strip ── */
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
    m.content = 'Learn about the Zakariyan Google Developer Club (ZGDC) CASPAM Chapter at BZU Multan.'
  }, [])

  return (
    <main style={{ background:'#fff' }}>

      {/* ═══ HERO / WHO WE ARE ══════════════════════════════════════════ */}
      <section style={{ background:"#fff", padding:"88px 0 0" }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>
          <div className="fade-up">
            <GoogleDots/>

            <p style={{ fontSize:12, fontWeight:700, color:"#4285F4", textTransform:"uppercase",
              letterSpacing:".10em", marginBottom:12 }}>About Us</p>

            <h1 style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:"clamp(34px,5vw,56px)", lineHeight:1.1,
              color:"#202124", marginBottom:20,
            }}>
              Who We Are
            </h1>

            <p style={{ fontSize:17, fontWeight:600, color:"#202124", lineHeight:1.7, marginBottom:18 }}>
              Building Ideas. Empowering Innovators. Shaping the Future.
            </p>

            <p style={{ fontSize:16, lineHeight:1.85, marginBottom:16, color:"#5F6368" }}>
              <strong>Zakariyan Google Developer Club &ndash; CASPAM Chapter (ZGDC&ndash;CASPAM)</strong> is
              a student-driven technology community based at the Center for Advanced Studies in Pure and
              Applied Mathematics (CASPAM), Bahauddin Zakariya University, Multan.
            </p>
            <p style={{ fontSize:16, lineHeight:1.85, marginBottom:16, color:"#5F6368" }}>
              We bring together students, aspiring developers, creative thinkers, and technology enthusiasts
              who believe in learning by doing and innovation through collaboration.
            </p>
            <p style={{ fontSize:16, lineHeight:1.85, marginBottom:36, color:"#5F6368" }}>
              ZGDC&ndash;CASPAM serves as a platform where curiosity meets technology and ideas evolve into
              practical solutions. Through technical workshops, hands-on sessions, collaborative projects,
              competitions, mentorship, and community-driven initiatives, we strive to create an environment
              where students don&apos;t just learn about technology &mdash; they learn to build with it.
            </p>

            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <a className="btn btn-primary" href="#/contact" style={{ padding:"14px 28px", fontSize:15 }}>
                Get in Touch <ArrowIcon size={17}/>
              </a>
              <a className="btn btn-ghost" href="#mission" style={{ padding:"14px 28px", fontSize:15 }}>
                Our Mission
              </a>
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div style={{ background:"#F8F9FA", borderTop:"1px solid #E8EAED", borderBottom:"1px solid #E8EAED", marginTop:60 }}>
          <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>
            <div className="about-stats-row" style={{
              display:"grid", gridTemplateColumns:"repeat(4,1fr)",
              textAlign:"center",
            }}>
              {stats.map(({ num, label, color }, i) => (
                <div key={label} style={{
                  padding:"30px 16px",
                  borderRight: i < 3 ? "1px solid #E8EAED" : "none",
                }}>
                  <div style={{
                    fontFamily:"'Poppins',sans-serif", fontWeight:800,
                    fontSize:"clamp(18px,2.5vw,30px)", lineHeight:1,
                    color, marginBottom:6,
                  }}>{num}</div>
                  <div style={{
                    fontSize:11, fontWeight:700, color:"#9AA0A6",
                    textTransform:"uppercase", letterSpacing:".10em",
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width:600px) {
              .about-stats-row { grid-template-columns: repeat(2,1fr) !important; }
              .about-stats-row > div { border-right: 1px solid #E8EAED !important; border-bottom: 1px solid #E8EAED; }
              .about-stats-row > div:nth-child(2n) { border-right: none !important; }
              .about-stats-row > div:nth-last-child(-n+2) { border-bottom: none; }
            }
          `}</style>
        </div>
      </section>

      {/* ═══ WHAT WE DO ════════════════════════════════════════════════ */}
      <section style={{ background:"#F8F9FA", padding:"88px 0" }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ marginBottom:44 }}>
            <GoogleDots/>
            <p style={{ fontSize:12, fontWeight:700, color:"#4285F4", textTransform:"uppercase",
              letterSpacing:".10em", marginBottom:12 }}>What We Do</p>
            <h2 style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:"clamp(28px,4vw,44px)", color:"#202124",
              lineHeight:1.15,
            }}>
              Our Activities &amp; Focus Areas
            </h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
            {whatWeDo.map(({ color, title, desc }) => (
              <div key={title} style={{
                background:"#fff", borderRadius:16,
                border:"1px solid #E8EAED",
                padding:"28px 28px 30px",
                boxShadow:"0 1px 3px rgba(60,64,67,.07), 0 4px 12px rgba(60,64,67,.04)",
                transition:"transform .22s ease, box-shadow .22s ease",
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 4px 20px rgba(60,64,67,.13)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 1px 3px rgba(60,64,67,.07), 0 4px 12px rgba(60,64,67,.04)";}}
              >
                <div style={{ width:44, height:6, borderRadius:999, background:color, marginBottom:22 }}/>
                <h3 style={{
                  fontFamily:"'Poppins',sans-serif", fontWeight:700,
                  fontSize:18, color:"#202124", marginBottom:10,
                }}>{title}</h3>
                <p style={{ fontSize:15, color:"#5F6368", lineHeight:1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VISION ════════════════════════════════════════════════════ */}
      <section style={{ background:"#fff", padding:"88px 0" }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ display:"grid", gap:56, alignItems:"center" }} className="about-vision-grid">

            <div>
              <GoogleDots/>
              <p style={{ fontSize:12, fontWeight:700, color:"#4285F4", textTransform:"uppercase",
                letterSpacing:".10em", marginBottom:12 }}>Our Vision</p>
              <h2 style={{
                fontFamily:"'Poppins',sans-serif", fontWeight:800,
                fontSize:"clamp(28px,4vw,44px)", color:"#202124",
                lineHeight:1.15, marginBottom:22,
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
              padding:44, textAlign:"center",
            }}>
              <div style={{
                width:72, height:72, borderRadius:20, background:"rgba(66,133,244,.10)",
                display:"grid", placeItems:"center", color:"#4285F4",
                margin:"0 auto 24px",
              }}>
                <EyeIcon size={36}/>
              </div>
              <p style={{
                fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:20,
                color:"#202124", lineHeight:1.5, fontStyle:"italic",
              }}>
                &ldquo;From curious students to confident technology leaders.&rdquo;
              </p>
            </div>
          </div>

          <style>{`
            .about-vision-grid { grid-template-columns: 1.1fr 1fr; }
            @media (max-width:820px) { .about-vision-grid { grid-template-columns: 1fr; } }
          `}</style>
        </div>
      </section>

      {/* ═══ MISSION ════════════════════════════════════════════════════ */}
      <section id="mission" style={{ background:"#F8F9FA", padding:"88px 0" }}>
        <div style={{ maxWidth:800, margin:"0 auto", padding:"0 24px" }}>
          <GoogleDots/>
          <p style={{ fontSize:12, fontWeight:700, color:"#4285F4", textTransform:"uppercase",
            letterSpacing:".10em", marginBottom:12 }}>Our Mission</p>
          <h2 style={{
            fontFamily:"'Poppins',sans-serif", fontWeight:800,
            fontSize:"clamp(28px,4vw,44px)", color:"#202124",
            lineHeight:1.15, marginBottom:18,
          }}>
            Empowering Students Through Technology
          </h2>
          <p style={{ fontSize:16, lineHeight:1.8, color:"#5F6368", marginBottom:36 }}>
            Our mission is to bridge the gap between learning and practical implementation by
            empowering students with the skills, knowledge, and confidence to build with modern technologies.
          </p>

          <p style={{ fontSize:16, fontWeight:700, color:"#202124", marginBottom:24 }}>
            We are committed to:
          </p>

          <div style={{ display:"grid", gap:14, marginBottom:40 }}>
            {commitments.map(({ title, desc }, i) => (
              <div key={title} style={{
                background:"#fff", borderRadius:14,
                border:"1px solid #E8EAED",
                borderLeft:`4px solid ${commitmentColors[i]}`,
                padding:"20px 24px",
                boxShadow:"0 1px 3px rgba(60,64,67,.07)",
                display:"flex", gap:16, alignItems:"flex-start",
              }}>
                <div style={{
                  width:28, height:28, borderRadius:"50%",
                  background:`${commitmentColors[i]}15`, color:commitmentColors[i],
                  display:"grid", placeItems:"center",
                  fontSize:13, fontWeight:700, flexShrink:0, marginTop:1,
                }}>
                  {i + 1}
                </div>
                <div>
                  <p style={{
                    fontFamily:"'Poppins',sans-serif", fontWeight:700,
                    fontSize:16, color:"#202124", marginBottom:4,
                  }}>{title}</p>
                  <p style={{ fontSize:15, color:"#5F6368", lineHeight:1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing */}
          <div style={{
            background:"#fff", borderRadius:14,
            border:"1px solid rgba(66,133,244,.18)",
            padding:"22px 28px", textAlign:"center",
          }}>
            <p style={{ fontSize:15, lineHeight:1.85, color:"#5F6368", fontStyle:"italic", margin:0 }}>
              At ZGDC&ndash;CASPAM, we believe that technology is best learned by building,
              innovation grows through collaboration, and every great idea deserves an opportunity to become reality.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ JOIN CTA ════════════════════════════════════════════════════ */}
      <section style={{ background:"#fff", padding:"88px 0" }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>
          <div style={{
            background:"linear-gradient(135deg,#1a56c4,#34A853)",
            borderRadius:28, padding:"64px 32px",
            textAlign:"center", position:"relative", overflow:"hidden",
          }}>
            <HeartIcon size={36} style={{ color:"#fff", margin:"0 auto 16px", display:"block", opacity:.9 }}/>
            <h2 style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:"clamp(24px,3.5vw,38px)", color:"#fff", marginBottom:14,
            }}>Want to join or collaborate?</h2>
            <p style={{ fontSize:17, color:"rgba(255,255,255,.85)", marginBottom:30, lineHeight:1.7 }}>
              Reach out to the ZGDC CASPAM team &mdash; we would love to hear from you.
            </p>
            <a href="#/contact" className="btn" style={{
              background:"#fff", color:"#1a56c4",
              padding:"14px 32px", fontSize:15, fontWeight:700,
              boxShadow:"0 4px 20px rgba(0,0,0,.15)",
            }}>Contact Us</a>
          </div>
        </div>
      </section>

    </main>
  )
}
