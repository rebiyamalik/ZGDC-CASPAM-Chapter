/* Inline SVG icon set — no external library needed.
   Usage: <CodeIcon size={24} />   or just  <CodeIcon />  (default 22 px)  */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const Svg = ({ size = 22, filled, children, ...rest }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...(filled ? { fill: "currentColor" } : stroke)}
    {...rest}
  >
    {children}
  </svg>
);

// ── Brand / Social ────────────────────────────────────────────
export const FacebookIcon = (p) => (
  <Svg filled {...p}>
    <path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8S15.6 3.5 14.4 3.5c-2.6 0-4.2 1.5-4.2 4.3v2.7H7.4v3.3h2.8V22z" />
  </Svg>
);
export const InstagramIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </Svg>
);
export const LinkedInIcon = (p) => (
  <Svg filled {...p}>
    <path d="M5 3.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM3.4 8.6h3.2V20H3.4zM9 8.6h3v1.6c.5-.9 1.7-1.9 3.5-1.9 3.4 0 4 2.2 4 5.1V20h-3.2v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V20H9z" />
  </Svg>
);
export const MailIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
);

// ── UI ────────────────────────────────────────────────────────
export const ArrowIcon     = (p) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>;
export const PinIcon       = (p) => <Svg {...p}><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></Svg>;
export const PhoneIcon     = (p) => <Svg {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A20 20 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 17z" /></Svg>;
export const CheckIcon     = (p) => <Svg {...p}><polyline points="20 6 9 17 4 12" /></Svg>;
export const SendIcon      = (p) => <Svg {...p}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></Svg>;

// ── About page icons ──────────────────────────────────────────
export const TargetIcon    = (p) => <Svg {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></Svg>;
export const EyeIcon       = (p) => <Svg {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Svg>;
export const CodeIcon      = (p) => <Svg {...p}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></Svg>;
export const BulbIcon      = (p) => <Svg {...p}><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" /></Svg>;
export const UsersIcon     = (p) => <Svg {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2 21a7 7 0 0 1 14 0M17 4.5a3.5 3.5 0 0 1 0 7M22 21a6 6 0 0 0-4-5.6" /></Svg>;
export const BookIcon      = (p) => <Svg {...p}><path d="M4 4h6a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3" /><path d="M20 4v15h-7" /></Svg>;
export const RocketIcon    = (p) => <Svg {...p}><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M14 4c3-1 6-1 6-1s0 3-1 6l-7 7-5-5zM9 13l-4-1 2-3 4 1M11 15l1 4 3-2-1-4" /></Svg>;
export const TerminalIcon  = (p) => <Svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 10 3 2-3 2M13 15h4" /></Svg>;
export const CalendarIcon  = (p) => <Svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Svg>;
export const StarIcon      = (p) => <Svg {...p}><polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2" /></Svg>;
export const HeartIcon     = (p) => <Svg {...p}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z" /></Svg>;
export const GlobeIcon     = (p) => <Svg {...p}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></Svg>;
