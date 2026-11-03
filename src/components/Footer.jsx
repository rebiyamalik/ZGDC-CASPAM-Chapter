import { ZGDC } from '../data/zgdcInfo'
import { FacebookIcon, InstagramIcon, LinkedInIcon, MailIcon } from './Icons'

const navLinks = [
  ["Home","home"],["About Us","about"],["Members","members"],
  ["Events","events"],["Notes","notes"],["Contact Us","contact"],
]
const socialLinks = [
  { href:ZGDC.facebook,  Icon:FacebookIcon,  label:"Facebook",  color:"#1877F2" },
  { href:ZGDC.instagram, Icon:InstagramIcon, label:"Instagram", color:"#E1306C" },
  { href:ZGDC.linkedin,  Icon:LinkedInIcon,  label:"LinkedIn",  color:"#0A66C2" },
  { href:`mailto:${ZGDC.email}`, Icon:MailIcon, label:"Email", color:"#34A853" },
]

export default function Footer({ onReplay }) {
  const year = new Date().getFullYear()
  const iconBtn = (href, Icon, label, color) => (
    <a key={label} href={href} aria-label={label}
      target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer"
      style={{ width:40, height:40, borderRadius:'50%', display:'grid', placeItems:'center',
        border:'1.5px solid rgba(255,255,255,.15)', color:'rgba(255,255,255,.65)',
        textDecoration:'none', transition:'all .2s', flexShrink:0 }}
      onMouseEnter={e=>{e.currentTarget.style.background=color;e.currentTarget.style.borderColor=color;e.currentTarget.style.color='#fff';e.currentTarget.style.transform='translateY(-3px)';}}
      onMouseLeave={e=>{e.currentTarget.style.background='';e.currentTarget.style.borderColor='rgba(255,255,255,.15)';e.currentTarget.style.color='rgba(255,255,255,.65)';e.currentTarget.style.transform='';}}
    >
      <Icon size={18}/>
    </a>
  )

  return (
    <footer style={{ background:'#202124', color:'rgba(255,255,255,.7)', fontFamily:"'Inter',system-ui,sans-serif" }}
      role="contentinfo">
      {/* 4-colour accent bar */}
      <div style={{ height:3, background:'linear-gradient(90deg,#4285F4 0%,#EA4335 33%,#FBBC05 66%,#34A853 100%)' }} aria-hidden="true"/>

      <div style={{ maxWidth:1140, margin:'0 auto', padding:'56px 24px 32px' }}>
        <div className="footer-grid" style={{ display:'grid', gap:40, marginBottom:48 }}>

          {/* Brand column */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <img src="/zgdc-logo.jpg" alt="ZGDC Logo" style={{
                width:50, height:50, borderRadius:'50%', border:'2px solid rgba(66,133,244,.4)',
                background:'#fff', objectFit:'contain' }}/>
              <div>
                <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, color:'#F1F3F4', fontSize:16, lineHeight:1.2 }}>
                  ZGDC – CASPAM
                </div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,.45)' }}>Google Developer Club · BZU Multan</div>
              </div>
            </div>
            <p style={{ fontSize:14, lineHeight:1.8, maxWidth:280, color:'rgba(255,255,255,.6)', marginBottom:20 }}>
              A student-led technology community at CASPAM, Bahauddin Zakariya University, Multan.
            </p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {socialLinks.map(({ href, Icon, label, color }) => iconBtn(href, Icon, label, color))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 style={{ fontFamily:"'Poppins',sans-serif", color:'#F1F3F4', fontSize:15, fontWeight:600, marginBottom:18 }}>
              Quick Links
            </h3>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'grid', gap:9 }}>
              {navLinks.map(([label, route]) => (
                <li key={route}>
                  <a href={`#/${route}`}
                    style={{ fontSize:14, color:'rgba(255,255,255,.55)', textDecoration:'none', transition:'color .2s' }}
                    onMouseEnter={e=>{e.currentTarget.style.color='#4285F4';}}
                    onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,.55)';}}
                  >→ {label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Upcoming */}
          <div>
            <h3 style={{ fontFamily:"'Poppins',sans-serif", color:'#F1F3F4', fontSize:15, fontWeight:600, marginBottom:18 }}>
              Contact & Connect
            </h3>
            <div style={{ display:'grid', gap:10, fontSize:14, color:'rgba(255,255,255,.55)' }}>
              <p style={{ margin:0, lineHeight:1.7 }}>📍 {ZGDC.address}</p>
              <p style={{ margin:0 }}>
                ✉️{' '}<a href={`mailto:${ZGDC.email}`}
                  style={{ color:'#4285F4', textDecoration:'none' }}>{ZGDC.email}</a>
              </p>
              <p style={{ margin:0 }}>
                🔗{' '}<a href={ZGDC.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ color:'#4285F4', textDecoration:'none' }}>LinkedIn Page</a>
              </p>
              <div style={{ marginTop:8, padding:'12px 16px', background:'rgba(66,133,244,.1)',
                border:'1px solid rgba(66,133,244,.2)', borderRadius:10 }}>
                <div style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,.8)', marginBottom:4 }}>
                  🤖 Upcoming: AI Baithak
                </div>
                <a href="#/events" style={{ fontSize:13, color:'#4285F4', textDecoration:'none' }}>
                  View event details →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height:1, background:'rgba(255,255,255,.08)', marginBottom:24 }} aria-hidden="true"/>

        {/* Bottom */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
          flexWrap:'wrap', gap:12, fontSize:13, color:'rgba(255,255,255,.35)' }}>
          <p style={{ margin:0 }}>
            © {year} Zakariyan Google Developer Club – CASPAM Chapter. All rights reserved.
          </p>
          <button onClick={onReplay} style={{ background:'none', border:'none',
            color:'rgba(255,255,255,.35)', cursor:'pointer', fontSize:13,
            textDecoration:'underline', padding:0 }}>
            Replay intro
          </button>
        </div>
      </div>

      <style>{`
        .footer-grid { grid-template-columns: 1.4fr 0.8fr 1fr; }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
