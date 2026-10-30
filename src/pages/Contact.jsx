import { useEffect, useState } from "react";
import { ZGDC } from "../data/zgdcInfo";
import SocialLinks from "../components/SocialLinks";
import { MailIcon, PinIcon, SendIcon, CheckIcon } from "../components/Icons";
import "../styles/Contact.css";

// ─── Validation ───────────────────────────────────────────────
const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const rules = {
  name:    (v) => (v.trim().length >= 2   ? "" : "Please enter your full name (at least 2 characters)."),
  email:   (v) => (emailRx.test(v.trim()) ? "" : "Please enter a valid email address."),
  subject: (v) => (v.trim().length >= 3   ? "" : "Please enter a subject (at least 3 characters)."),
  message: (v) => (v.trim().length >= 10  ? "" : "Message must be at least 10 characters."),
};

const EMPTY = { name: "", email: "", subject: "", message: "" };

// ─── Page ─────────────────────────────────────────────────────
export default function Contact() {
  const [values,  setValues]  = useState(EMPTY);
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState(null); // null | "ok" | "err"
  const [mailto,  setMailto]  = useState("");

  // Page meta
  useEffect(() => {
    document.title = "Contact Us | ZGDC CASPAM Chapter";
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = Object.assign(document.createElement("meta"), { name }); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Contact the Zakariyan Google Developer Club CASPAM Chapter — email, social media, or our contact form.");
  }, []);

  const validate = (name, value) => rules[name](value);

  const handleChange = ({ target: { name, value } }) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name] !== undefined)
      setErrors((e) => ({ ...e, [name]: validate(name, value) }));
  };

  const handleBlur = ({ target: { name, value } }) =>
    setErrors((e) => ({ ...e, [name]: validate(name, value) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = Object.fromEntries(
      Object.keys(rules).map((k) => [k, validate(k, values[k])])
    );
    setErrors(next);

    if (Object.values(next).some(Boolean)) {
      setStatus("err");
      return;
    }

    const link =
      `mailto:${ZGDC.email}` +
      `?subject=${encodeURIComponent(values.subject)}` +
      `&body=${encodeURIComponent(`${values.message}\n\nFrom: ${values.name} (${values.email})`)}`;

    setMailto(link);
    setStatus("ok");
  };

  const handleReset = () => {
    setValues(EMPTY);
    setErrors({});
    setStatus(null);
    setMailto("");
  };

  // ── Info cards config ────────────────────────────────────────
  const infoCards = [
    {
      color: "blue",
      Icon:  MailIcon,
      title: "Email",
      color2: "blue",
      content: (
        <a href={`mailto:${ZGDC.email}`}>{ZGDC.email}</a>
      ),
    },
    {
      color: "red",
      Icon:  PinIcon,
      title: "Location",
      content: <p>{ZGDC.address}</p>,
    },
  ];

  const textFields = [
    { name: "name",    label: "Full Name",     type: "text",  autoComplete: "name"  },
    { name: "email",   label: "Email Address", type: "email", autoComplete: "email" },
    { name: "subject", label: "Subject",       type: "text"                         },
  ];

  return (
    <main className="zg-page" id="contact-main">

      <section className="contact-hero" aria-labelledby="contact-heading">
        <div className="zg-wrap">

          {/* Intro */}
          <div className="contact-intro">
            <span className="zg-eyebrow">Contact Us</span>
            <h1 id="contact-heading">Get in Touch</h1>
            <p>
              Have a question about events, workshops, or joining ZGDC CASPAM
              Chapter? We would love to hear from you.
            </p>
          </div>

          <div className="contact-grid">

            {/* ── Left: info cards + social ── */}
            <div className="contact-stack">
              {infoCards.map(({ color, Icon, title, content }) => (
                <div key={title} className={`zg-card ${color} contact-info`}>
                  <div className="zg-icon" aria-hidden="true">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3>{title}</h3>
                    {content}
                  </div>
                </div>
              ))}

              <div className="zg-card green contact-follow">
                <h3>Follow Us</h3>
                <p>Find ZGDC CASPAM Chapter on social media.</p>
                <SocialLinks />
                {!ZGDC.linkedin && (
                  <p className="contact-note">
                    LinkedIn page coming soon!
                  </p>
                )}
              </div>
            </div>

            {/* ── Right: form ── */}
            <form
              className="zg-card blue contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-labelledby="form-heading"
            >
              <h2 id="form-heading">Send a Message</h2>

              {/* Text inputs */}
              {textFields.map(({ name, label, type, autoComplete }) => (
                <div className="contact-field" key={name}>
                  <label htmlFor={name}>{label}</label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    value={values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors[name] || undefined}
                    aria-describedby={`${name}-err`}
                    required
                    disabled={status === "ok"}
                  />
                  <small
                    id={`${name}-err`}
                    className="contact-error"
                    role="alert"
                    aria-live="polite"
                  >
                    {errors[name]}
                  </small>
                </div>
              ))}

              {/* Textarea */}
              <div className="contact-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.message || undefined}
                  aria-describedby="message-err"
                  required
                  disabled={status === "ok"}
                />
                <small
                  id="message-err"
                  className="contact-error"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.message}
                </small>
              </div>

              {/* Submit */}
              {status !== "ok" && (
                <button
                  className="zg-btn zg-btn-primary contact-submit"
                  type="submit"
                >
                  <SendIcon size={17} /> Send Message
                </button>
              )}

              {/* Status messages */}
              <div className="contact-status" aria-live="polite">
                {status === "err" && (
                  <div className="box err">
                    ⚠️ Please fix the highlighted fields above and try again.
                  </div>
                )}
                {status === "ok" && (
                  <div className="box ok">
                    <CheckIcon size={18} style={{ verticalAlign: "middle", marginRight: 6 }} />
                    <strong>Ready to send!</strong> Your message is prepared but not yet
                    delivered — no backend is connected.{" "}
                    <a href={mailto}>
                      Open in your email app to send it
                    </a>
                    .
                    <br />
                    <button
                      type="button"
                      onClick={handleReset}
                      style={{
                        marginTop: 10,
                        background: "none",
                        border: "none",
                        color: "var(--zg-blue)",
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: 0,
                        fontSize: 14,
                      }}
                    >
                      ← Send another message
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
