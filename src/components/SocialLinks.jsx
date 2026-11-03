import { ZGDC } from "../data/zgdcInfo";
import { FacebookIcon, InstagramIcon, LinkedInIcon, MailIcon } from "./Icons";

const links = [
  { key:"fb",   label:"ZGDC on Facebook",  href:ZGDC.facebook,  Icon:FacebookIcon,  color:"#1877F2" },
  { key:"ig",   label:"ZGDC on Instagram", href:ZGDC.instagram, Icon:InstagramIcon, color:"#E1306C" },
  { key:"li",   label:"ZGDC on LinkedIn",  href:ZGDC.linkedin,  Icon:LinkedInIcon,  color:"#0A66C2" },
  { key:"mail", label:"Email ZGDC",        href:`mailto:${ZGDC.email}`, Icon:MailIcon, color:"#34A853" },
];

export default function SocialLinks({ size = 42, className = "" }) {
  return (
    <ul className={`flex flex-wrap gap-2 list-none p-0 m-0 ${className}`} aria-label="ZGDC social links">
      {links.map(({ key, label, href, Icon, color }) => (
        <li key={key}>
          <a
            href={href}
            aria-label={label}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            style={{ width: size, height: size, borderRadius: "50%", display: "grid", placeItems: "center",
              border: "1.5px solid var(--border)", color: "var(--text)", background: "#fff",
              transition: "all .2s", textDecoration: "none", flexShrink: 0 }}
            onMouseEnter={e => {
              e.currentTarget.style.background = color;
              e.currentTarget.style.borderColor = color;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.transform = "";
            }}
          >
            <Icon size={size * 0.45} />
          </a>
        </li>
      ))}
    </ul>
  );
}
