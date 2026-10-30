import { ZGDC } from "../data/zgdcInfo";
import { FacebookIcon, InstagramIcon, LinkedInIcon, MailIcon } from "./Icons";

const navLinks = [
  ["Home",       "home"],
  ["About Us",   "about"],
  ["Members",    "members"],
  ["Events",     "events"],
  ["Contact Us", "contact"],
];

const socialLinks = [
  { key: "fb",   href: ZGDC.facebook,          Icon: FacebookIcon,  label: "Facebook",  color: "#1877F2" },
  { key: "ig",   href: ZGDC.instagram,         Icon: InstagramIcon, label: "Instagram", color: "#E1306C" },
  { key: "li",   href: ZGDC.linkedin || null,  Icon: LinkedInIcon,  label: "LinkedIn",  color: "#0A66C2" },
  { key: "mail", href: `mailto:${ZGDC.email}`, Icon: MailIcon,      label: "Email",     color: "#34A853" },
];

export default function Footer({ onReplay }) {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #14171F 0%, #1B2030 100%)",
        color: "#BDC1C6",
        fontFamily: "'Inter', system-ui, sans-serif",
        marginTop: "auto",
      }}
      role="contentinfo"
    >
      {/* Coloured top border */}
      <div
        style={{
          height: 4,
          background: "linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853)",
        }}
        aria-hidden="true"
      />

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "56px 24px 32px" }}>

        {/* Top row: brand + nav columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr",
            gap: 40,
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <img
                src="/zgdc-logo.jpg"
                alt="ZGDC Logo"
                style={{
                  width: 52, height: 52, borderRadius: "50%",
                  border: "2px solid rgba(66,133,244,.4)",
                  background: "#fff",
                  objectFit: "contain",
                }}
              />
              <div>
                <div style={{ fontFamily: "'Poppins','Sora',sans-serif", fontWeight: 700, color: "#F1F3F4", fontSize: 16, lineHeight: 1.2 }}>
                  ZGDC – CASPAM
                </div>
                <div style={{ fontSize: 12, color: "#9AA0A6" }}>Chapter · BZU Multan</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 280 }}>
              A student-led Google Developer Group at the Centre for Advanced Studies in Pure
              and Applied Mathematics, BZU Multan.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
              {socialLinks.map(({ key, href, Icon, label, color }) =>
                href ? (
                  <a
                    key={key}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={{
                      width: 40, height: 40, borderRadius: "50%",
                      display: "grid", placeItems: "center",
                      border: "1.5px solid rgba(255,255,255,.12)",
                      color: "#BDC1C6",
                      textDecoration: "none",
                      transition: "all .2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = color;
                      e.currentTarget.style.borderColor = color;
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,.12)";
                      e.currentTarget.style.color = "#BDC1C6";
                      e.currentTarget.style.transform = "";
                    }}
                  >
                    <Icon size={18} />
                  </a>
                ) : (
                  <span
                    key={key}
                    aria-label={`${label} (coming soon)`}
                    title="Coming soon"
                    style={{
                      width: 40, height: 40, borderRadius: "50%",
                      display: "grid", placeItems: "center",
                      border: "1.5px solid rgba(255,255,255,.08)",
                      color: "#5F6368", opacity: .5,
                    }}
                  >
                    <Icon size={18} />
                  </span>
                )
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 style={{ fontFamily: "'Poppins',sans-serif", color: "#F1F3F4", fontSize: 15, fontWeight: 600, marginBottom: 18 }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {navLinks.map(([label, route]) => (
                <li key={route}>
                  <a
                    href={`#/${route}`}
                    style={{
                      fontSize: 14, color: "#9AA0A6",
                      textDecoration: "none", transition: "color .2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#4285F4"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#9AA0A6"; }}
                  >
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontFamily: "'Poppins',sans-serif", color: "#F1F3F4", fontSize: 15, fontWeight: 600, marginBottom: 18 }}>
              Contact
            </h3>
            <div style={{ display: "grid", gap: 12, fontSize: 14, color: "#9AA0A6" }}>
              <p style={{ margin: 0, lineHeight: 1.7 }}>
                📍 {ZGDC.address}
              </p>
              <p style={{ margin: 0 }}>
                ✉️{" "}
                <a
                  href={`mailto:${ZGDC.email}`}
                  style={{ color: "#4285F4", textDecoration: "none" }}
                >
                  {ZGDC.email}
                </a>
              </p>
              <p style={{ margin: 0 }}>
                🎓 Project Lead: <span style={{ color: "#F1F3F4" }}>{ZGDC.lead}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{ height: 1, background: "rgba(255,255,255,.08)", marginBottom: 24 }}
          aria-hidden="true"
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 13,
            color: "#5F6368",
          }}
        >
          <p style={{ margin: 0 }}>
            © {year} Zakariyan Google Developer Club – CASPAM Chapter. All rights reserved.
          </p>
          <button
            onClick={onReplay}
            style={{
              background: "none", border: "none",
              color: "#9AA0A6", cursor: "pointer",
              fontSize: 13, padding: 0,
              textDecoration: "underline",
            }}
          >
            Replay intro
          </button>
        </div>
      </div>

      {/* Responsive tweak */}
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
