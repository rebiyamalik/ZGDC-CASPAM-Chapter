import { useEffect, useState } from 'react'
import { ZGDC } from '../data/zgdcInfo'
import SocialLinks from '../components/SocialLinks'
import { MailIcon, PinIcon, LinkedInIcon, SendIcon, CheckIcon, ArrowIcon, SparkleIcon } from '../components/Icons'
import '../styles/Contact.css'

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const rules = {
  name:    v => v.trim().length >= 2   ? '' : 'Please enter your full name (at least 2 characters).',
  email:   v => emailRx.test(v.trim()) ? '' : 'Please enter a valid email address.',
  subject: v => v.trim().length >= 3   ? '' : 'Please enter a subject (at least 3 characters).',
  message: v => v.trim().length >= 10  ? '' : 'Message must be at least 10 characters.',
}
const EMPTY = { name:'', email:'', subject:'', message:'' }

const faqs = [
  {
    q: "What is ZGDC–CASPAM?",
    a: "Zakariyan Google Developer Club – CASPAM Chapter (ZGDC-CASPAM) is a student-driven technology community at the Center for Advanced Studies in Pure and Applied Mathematics (CASPAM), Bahauddin Zakariya University, Multan. We bring together students who are passionate about technology, learning, and innovation.",
  },
  {
    q: "Who can join the community?",
    a: "Any student at CASPAM, BZU who has an interest in technology, programming, artificial intelligence, innovation, and development is welcome to join and participate in our community activities.",
  },
  {
    q: "How can students participate in events?",
    a: "Visit our Events section to discover upcoming workshops, sessions, and community activities. Event details and registration information are provided whenever available.",
  },
  {
    q: "How can students register for upcoming sessions?",
    a: "For AI Baithak and other upcoming sessions, visit the Events page and complete the registration form. Seats are limited, so early registration is recommended.",
  },
  {
    q: "What topics are covered in AI Baithak?",
    a: "AI Baithak covers Prompt Engineering, Artificial Intelligence fundamentals, App Development, and Google AI Studio. It is designed to introduce students to modern AI tools, emerging technologies, and practical development concepts.",
  },
  {
    q: "Where can students access event notes and learning resources?",
    a: "Learning resources, session notes, and workshop materials are available in the Notes section. Materials are added after each session and organized by category for easy access.",
  },
  {
    q: "How can students contact the society?",
    a: "You can reach us through the contact form on this page, by email, or through our official LinkedIn page. Visit the Contact section for all available communication channels.",
  },
]

function FAQSection() {
  const [open, setOpen] = useState(null)
  return (
    <section style={{ background:"var(--soft)", padding:"80px 0", borderTop:"1px solid var(--border)" }}>
      <div style={{ maxWidth:760, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div className="eyebrow" style={{ justifyContent:"center" }}>FAQ</div>
          <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"clamp(26px,4vw,36px)", color:"var(--ink)", marginBottom:12, marginTop:10 }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color:"var(--text)", fontSize:16 }}>Everything you need to know about ZGDC&ndash;CASPAM.</p>
        </div>

        <div style={{ display:"grid", gap:10 }}>
          {faqs.map((f, i) => (
            <div key={i} className="accordion-item">
              <button className="accordion-btn" aria-expanded={open===i} onClick={()=>setOpen(open===i?null:i)}>
                <span>{f.q}</span>
                <span className="accordion-icon">{open===i ? "−" : "+"}</span>
              </button>
              {open===i && <div className="accordion-body">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Contact() {
  const [values,  setValues]  = useState(EMPTY)
  const [errors,  setErrors]  = useState({})
  const [status,  setStatus]  = useState(null)
  const [mailto,  setMailto]  = useState('')

  useEffect(() => {
    document.title = 'Contact Us | ZGDC CASPAM Chapter'
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = Object.assign(document.createElement('meta'),{name:'description'}); document.head.appendChild(m) }
    m.content = 'Contact the Zakariyan Google Developer Club CASPAM Chapter — email, social media, or our contact form.'
  }, [])

  const validate = (k, v) => rules[k](v)
  const handleChange = ({ target: { name, value } }) => {
    setValues(v => ({ ...v, [name]: value }))
    if (errors[name] !== undefined) setErrors(e => ({ ...e, [name]: validate(name, value) }))
  }
  const handleBlur = ({ target: { name, value } }) => setErrors(e => ({ ...e, [name]: validate(name, value) }))
  const handleSubmit = e => {
    e.preventDefault()
    const next = Object.fromEntries(Object.keys(rules).map(k => [k, validate(k, values[k])]))
    setErrors(next)
    if (Object.values(next).some(Boolean)) { setStatus('err'); return }
    const link = `mailto:${ZGDC.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(`${values.message}\n\nFrom: ${values.name} (${values.email})`)}`
    setMailto(link); setStatus('ok')
  }
  const handleReset = () => { setValues(EMPTY); setErrors({}); setStatus(null); setMailto('') }

  const inp = {
    style:{ width:'100%', padding:'12px 14px', borderRadius:10,
      border:'1.5px solid var(--border)', fontSize:15,
      fontFamily:"'Inter',sans-serif", background:'#fff',
      color:'var(--ink)', transition:'border-color .2s, box-shadow .2s', outline:'none' },
    onFocus: e => { e.target.style.borderColor='var(--blue)'; e.target.style.boxShadow='0 0 0 3px rgba(66,133,244,.15)' },
    onBlur:  e => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none' },
  }

  return (
    <main style={{ background:'#fff' }}>
      <section style={{ padding:'80px 0' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px' }}>

          {/* Header */}
          <div style={{ textAlign:'center', marginBottom:56, maxWidth:580, margin:'0 auto 56px' }}>
            <div className="eyebrow" style={{ justifyContent:'center' }}>Contact</div>
            <h1 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:'clamp(32px,5vw,46px)', color:'var(--ink)', marginBottom:14 }}>
              Get in Touch
            </h1>
            <p style={{ fontSize:17, color:'var(--text)', lineHeight:1.75 }}>
              Questions about events, workshops, or joining ZGDC&ndash;CASPAM? We&apos;d love to hear from you.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:32, alignItems:'start' }} className="contact-grid">

            {/* ── Left: info + social ── */}
            <div style={{ display:'grid', gap:18 }}>
              {/* Email */}
              <div style={{ background:'#fff', border:'1px solid var(--border)',
                borderTop:'4px solid #4285F4', borderRadius:16, padding:24,
                display:'flex', gap:16, alignItems:'flex-start', boxShadow:'var(--shadow-sm)' }}>
                <div style={{ width:48, height:48, borderRadius:12, background:'rgba(66,133,244,.1)',
                  display:'grid', placeItems:'center', color:'#4285F4', flexShrink:0 }}>
                  <MailIcon size={22}/>
                </div>
                <div>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:'var(--ink)', marginBottom:4 }}>Email</h3>
                  <a href={`mailto:${ZGDC.email}`} style={{ color:'#4285F4', textDecoration:'none', fontSize:14, wordBreak:'break-all' }}>{ZGDC.email}</a>
                </div>
              </div>

              {/* Location */}
              <div style={{ background:'#fff', border:'1px solid var(--border)',
                borderTop:'4px solid #EA4335', borderRadius:16, padding:24,
                display:'flex', gap:16, alignItems:'flex-start', boxShadow:'var(--shadow-sm)' }}>
                <div style={{ width:48, height:48, borderRadius:12, background:'rgba(234,67,53,.1)',
                  display:'grid', placeItems:'center', color:'#EA4335', flexShrink:0 }}>
                  <PinIcon size={22}/>
                </div>
                <div>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:'var(--ink)', marginBottom:4 }}>Location</h3>
                  <p style={{ fontSize:14, color:'var(--text)', lineHeight:1.65 }}>{ZGDC.address}</p>
                </div>
              </div>

              {/* LinkedIn */}
              <div style={{ background:'#fff', border:'1px solid var(--border)',
                borderTop:'4px solid #0A66C2', borderRadius:16, padding:24,
                display:'flex', gap:16, alignItems:'flex-start', boxShadow:'var(--shadow-sm)' }}>
                <div style={{ width:48, height:48, borderRadius:12, background:'rgba(10,102,194,.1)',
                  display:'grid', placeItems:'center', color:'#0A66C2', flexShrink:0 }}>
                  <LinkedInIcon size={22}/>
                </div>
                <div>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:'var(--ink)', marginBottom:4 }}>LinkedIn</h3>
                  <a href={ZGDC.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{ color:'#0A66C2', textDecoration:'none', fontSize:14 }}>
                    ZGDC CASPAM Chapter ↗
                  </a>
                </div>
              </div>

              {/* Follow us */}
              <div style={{ background:'#fff', border:'1px solid var(--border)',
                borderTop:'4px solid #34A853', borderRadius:16, padding:24, boxShadow:'var(--shadow-sm)' }}>
                <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:'var(--ink)', marginBottom:6 }}>Follow Us</h3>
                <p style={{ fontSize:14, color:'var(--text)', marginBottom:14 }}>Find ZGDC&ndash;CASPAM on social media.</p>
                <SocialLinks size={44}/>
              </div>

              {/* AI Baithak CTA — no emoji */}
              <div style={{ background:'linear-gradient(135deg,rgba(66,133,244,.07),rgba(52,168,83,.07))',
                border:'1px solid rgba(66,133,244,.18)', borderRadius:16, padding:24 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:'rgba(66,133,244,.12)',
                    display:'grid', placeItems:'center', color:'#4285F4', flexShrink:0 }}>
                    <SparkleIcon size={18}/>
                  </div>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:'var(--ink)', margin:0 }}>
                    Interested in AI Baithak?
                  </h3>
                </div>
                <p style={{ fontSize:14, color:'var(--text)', lineHeight:1.65, marginBottom:16 }}>
                  Want to explore AI, Prompt Engineering, Google AI Studio, and App Development?
                  Join us at AI Baithak!
                </p>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                  <a href="#/events" className="btn btn-primary" style={{ padding:'10px 18px', fontSize:13 }}>
                    <ArrowIcon size={14}/> Event Details
                  </a>
                  <a href="#/contact" className="btn btn-ghost" style={{ padding:'10px 18px', fontSize:13 }}>
                    More Info
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div style={{ background:'#fff', border:'1px solid rgba(66,133,244,.2)',
              borderTop:'4px solid #4285F4', borderRadius:20, padding:36, boxShadow:'var(--shadow)' }}>
              <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:22, color:'var(--ink)', marginBottom:24 }}>
                Send a Message
              </h2>

              {[
                { name:'name',    label:'Full Name',     type:'text',  ac:'name'  },
                { name:'email',   label:'Email Address', type:'email', ac:'email' },
                { name:'subject', label:'Subject',       type:'text'              },
              ].map(({ name, label, type, ac }) => (
                <div key={name} style={{ marginBottom:18 }}>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'var(--ink)', marginBottom:6 }}
                    htmlFor={name}>{label}</label>
                  <input id={name} name={name} type={type} autoComplete={ac}
                    value={values[name]} onChange={handleChange} onBlur={handleBlur}
                    required disabled={status==='ok'}
                    aria-invalid={!!errors[name]||undefined} aria-describedby={`${name}-err`}
                    {...inp}
                    style={{ ...inp.style, borderColor: errors[name] ? 'var(--red)' : 'var(--border)' }}
                  />
                  {errors[name] && <small id={`${name}-err`} role="alert" style={{ color:'var(--red)', fontSize:12, marginTop:4, display:'block' }}>{errors[name]}</small>}
                </div>
              ))}

              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'var(--ink)', marginBottom:6 }} htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5}
                  value={values.message} onChange={handleChange} onBlur={handleBlur}
                  required disabled={status==='ok'}
                  aria-invalid={!!errors.message||undefined} aria-describedby="message-err"
                  {...inp}
                  style={{ ...inp.style, resize:'vertical', borderColor: errors.message ? 'var(--red)' : 'var(--border)' }}
                />
                {errors.message && <small id="message-err" role="alert" style={{ color:'var(--red)', fontSize:12, marginTop:4, display:'block' }}>{errors.message}</small>}
              </div>

              {status !== 'ok' && (
                <button className="btn btn-primary" type="submit" onClick={handleSubmit}
                  style={{ width:'100%', justifyContent:'center', padding:'14px' }}>
                  <SendIcon size={16}/> Send Message
                </button>
              )}

              <div aria-live="polite" style={{ marginTop:16 }}>
                {status==='err' && (
                  <div style={{ background:'rgba(234,67,53,.08)', border:'1px solid rgba(234,67,53,.2)',
                    borderRadius:10, padding:'12px 16px', fontSize:14, color:'var(--ink)' }}>
                    ⚠️ Please fix the highlighted fields above and try again.
                  </div>
                )}
                {status==='ok' && (
                  <div style={{ background:'rgba(52,168,83,.08)', border:'1px solid rgba(52,168,83,.2)',
                    borderRadius:10, padding:'14px 16px', fontSize:14, color:'var(--ink)', lineHeight:1.7 }}>
                    <CheckIcon size={16} style={{ verticalAlign:'middle', marginRight:6, color:'var(--green)' }}/>
                    <strong>Ready to send!</strong> Open your email app to deliver this message.{' '}
                    <a href={mailto} style={{ color:'var(--blue)', fontWeight:600 }}>Click here</a> to open.<br/>
                    <button type="button" onClick={handleReset}
                      style={{ marginTop:10, background:'none', border:'none', color:'var(--blue)',
                        fontWeight:600, cursor:'pointer', padding:0, fontSize:13 }}>
                      ← Send another message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      <style>{`
        @media (max-width:820px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
