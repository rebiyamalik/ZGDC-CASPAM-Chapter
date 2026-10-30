import { ZGDC } from "../data/zgdcInfo";
import { FacebookIcon, InstagramIcon, LinkedInIcon, MailIcon } from "./Icons";

const links = [
  { key: "fb",   label: "ZGDC on Facebook",   href: ZGDC.facebook,              Icon: FacebookIcon,   color: "blue" },
  { key: "ig",   label: "ZGDC on Instagram",  href: ZGDC.instagram,             Icon: InstagramIcon,  color: "red"  },
  { key: "li",   label: "ZGDC on LinkedIn",   href: ZGDC.linkedin,              Icon: LinkedInIcon,   color: "blue" },
  { key: "mail", label: "Email ZGDC",          href: `mailto:${ZGDC.email}`,     Icon: MailIcon,       color: "yellow" },
];

export default function SocialLinks({ className = "" }) {
  return (
    <ul className={`zg-social ${className}`} aria-label="ZGDC social media links">
      {links.map(({ key, label, href, Icon, color }) => (
        <li key={key}>
          {href ? (
            <a
              className={`zg-social-link ${color}`}
              href={href}
              aria-label={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
            >
              <Icon />
            </a>
          ) : (
            <span
              className={`zg-social-link ${color} is-disabled`}
              aria-label={`${label} (coming soon)`}
              role="img"
              title="Coming soon"
            >
              <Icon />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
