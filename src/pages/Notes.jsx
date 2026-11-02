import { BookIcon, BrainIcon, SparkleIcon, CodeIcon, GlobeIcon, TerminalIcon, RocketIcon } from '../components/Icons'

const topics = [
  { color:"#4285F4", Icon:BrainIcon,    title:"Artificial Intelligence",
    desc:"Foundational concepts of AI, machine learning basics, real-world applications, and how AI is transforming modern technology.",
    tags:["AI Basics","Machine Learning","Deep Learning","Applications"] },
  { color:"#EA4335", Icon:SparkleIcon,  title:"Prompt Engineering",
    desc:"How to write effective prompts, communicate with AI tools, and get better results from AI-generated content.",
    tags:["ChatGPT","Gemini","Best Practices","Techniques"] },
  { color:"#FBBC05", Icon:GlobeIcon,    title:"Google AI Studio",
    desc:"Introduction to Google's AI development platform — experimenting with AI models and building AI-powered applications.",
    tags:["Gemini API","AI Models","Google Tools","Prototyping"] },
  { color:"#34A853", Icon:CodeIcon,     title:"App Development",
    desc:"Core concepts of designing and building applications, from ideation and wireframing to development and deployment.",
    tags:["Mobile","Web","Flutter","React"] },
  { color:"#9C27B0", Icon:TerminalIcon, title:"Programming & Development",
    desc:"Programming fundamentals, coding best practices, version control, and beginner-friendly development resources.",
    tags:["Python","JavaScript","Git","GitHub"] },
  { color:"#FF6D00", Icon:RocketIcon,   title:"Emerging Technologies",
    desc:"Overview of new and exciting technology trends including cloud computing, IoT, blockchain, and more.",
    tags:["Cloud","IoT","Blockchain","Trends"] },
]

export default function Notes() {
  return (
    <section style={{ background:"#fff", padding:"80px 0" }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom:56 }}>
          <div className="eyebrow">Resources</div>
          <h1 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800,
            fontSize:"clamp(32px,5vw,48px)", color:"var(--ink)", marginBottom:16 }}>
            Basics &amp; Notes
          </h1>
          <p style={{ fontSize:17, color:"var(--text)", maxWidth:600, lineHeight:1.75 }}>
            Beginner-friendly learning materials and resources organised by topic.
            Notes and resources will be added here after each session.
          </p>
          <div style={{ marginTop:16, padding:"14px 20px", background:"rgba(66,133,244,.07)",
            border:"1px solid rgba(66,133,244,.2)", borderRadius:12, display:"inline-block",
            fontSize:14, color:"var(--blue)", fontWeight:500 }}>
            📌 Content will be updated after AI Baithak and future events.
          </div>
        </div>

        {/* Topic cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:24 }}>
          {topics.map(({ color, Icon, title, desc, tags }) => (
            <article key={title} style={{
              background:"#fff", border:"1px solid var(--border)",
              borderLeft:`4px solid ${color}`, borderRadius:16,
              padding:28, boxShadow:"var(--shadow-sm)",
              transition:"transform .25s, box-shadow .25s",
              display:"flex", flexDirection:"column", gap:14,
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="var(--shadow)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="var(--shadow-sm)";}}
            >
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:48, height:48, borderRadius:12, background:`${color}15`,
                  display:"grid", placeItems:"center", color, flexShrink:0 }}>
                  <Icon size={22}/>
                </div>
                <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:18, color:"var(--ink)" }}>
                  {title}
                </h2>
              </div>
              <p style={{ fontSize:14, color:"var(--text)", lineHeight:1.7 }}>{desc}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:"auto" }}>
                {tags.map(t => (
                  <span key={t} style={{
                    fontSize:12, fontWeight:600, padding:"4px 10px",
                    borderRadius:999, background:`${color}12`, color,
                    border:`1px solid ${color}25`,
                  }}>{t}</span>
                ))}
              </div>
              <div style={{ borderTop:"1px solid var(--border)", paddingTop:14, marginTop:4 }}>
                <p style={{ fontSize:13, color:"var(--muted)", display:"flex", alignItems:"center", gap:6 }}>
                  <BookIcon size={14}/> Notes coming after AI Baithak
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Stay connected note */}
        <div style={{ marginTop:56, background:"var(--soft)", borderRadius:20, padding:"36px 32px",
          textAlign:"center", border:"1px solid var(--border)" }}>
          <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:22, color:"var(--ink)", marginBottom:10 }}>
            Stay Connected for Updates
          </h3>
          <p style={{ fontSize:15, color:"var(--text)", marginBottom:20, maxWidth:480, margin:"0 auto 20px" }}>
            Follow ZGDC–CASPAM on LinkedIn and Instagram to get notified when new notes and resources are published.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="https://www.linkedin.com/company/zakariyan-google-developer-club-caspam-chapter"
              className="btn btn-primary" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/zgdc_caspam_chapter?vrfl=d2V6djkwMDA2YXhx"
              className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </section>
  )
}
