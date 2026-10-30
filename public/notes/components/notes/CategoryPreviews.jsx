import { themeFor } from "./theme.js";

// One simple icon per category name (falls back to a folder for new categories)
const ICONS = {
  "Programming": <path d="M8 6 3 12l5 6M16 6l5 6-5 6M13.5 5l-3 14" />,
  "Web Development": <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  "AI & Machine Learning": <><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>,
  "Data Analytics": <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  "Workshop Materials": <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M12 17v3M8 20h8" /></>,
};
const FALLBACK = <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />;

// A preview of what each category will hold. These are descriptions of the
// categories, not resources: no counts, titles or files are shown.
export default function CategoryPreviews({ categories, info }) {
  return (
    <section className="zr-previews" aria-labelledby="zr-previews-heading">
      <h2 id="zr-previews-heading" className="zr-previews__title">What will be shared here</h2>
      <ul className="zr-previews__list">
        {categories.map((name, index) => (
          <li key={name} className={`zr-preview zr-preview--${themeFor(name)}`} style={{ "--order": index }}>
            <span className="zr-preview__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {ICONS[name] ?? FALLBACK}
              </svg>
            </span>
            <h3 className="zr-preview__name">{name}</h3>
            {info[name] && <p className="zr-preview__text">{info[name]}</p>}
            <p className="zr-preview__status">Nothing published yet</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
