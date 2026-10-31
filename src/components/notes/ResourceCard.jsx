import { useRef } from "react";
import FileTypeIcon from "./FileTypeIcon.jsx";
import Highlight from "./Highlight.jsx";
import { themeFor } from "./theme.js";
import { isValidUrl } from "../../lib/notesPublishing.js";

// "6 Nov 2026" plus whether the item is recent enough to get a "New" tag
function describeDate(addedOn) {
  const date = new Date(`${addedOn}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return { text: "", isNew: false };
  const text = date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  const ageInDays = (Date.now() - date.getTime()) / 86400000;
  return { text, isNew: ageInDays >= 0 && ageInDays <= 14 };
}

// A published resource. The page only passes in approved, complete entries, and
// the buttons below still check each link, so a button never points nowhere.
export default function ResourceCard({ resource, index, query = "", featured = false }) {
  const { id, title, description, category, topic, fileType, session, addedOn, resourceUrl, downloadUrl } = resource;
  const cardRef = useRef(null);
  const frameRef = useRef(0);

  const hasOpenLink = isValidUrl(resourceUrl);
  const hasDownload = isValidUrl(downloadUrl);
  const { text: dateText, isNew } = describeDate(addedOn);
  const theme = themeFor(category);

  // 3D tilt + light spot while a mouse moves over the card (batched per frame).
  function handlePointerMove(event) {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const box = card.getBoundingClientRect();
      const x = (clientX - box.left) / box.width;
      const y = (clientY - box.top) / box.height;
      card.style.setProperty("--tilt-y", `${((x - 0.5) * 7).toFixed(2)}deg`);
      card.style.setProperty("--tilt-x", `${(-(y - 0.5) * 7).toFixed(2)}deg`);
      card.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
      card.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
    });
  }

  function resetTilt() {
    cancelAnimationFrame(frameRef.current);
    const card = cardRef.current;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  }

  const headingId = `zr-card-${id}`;

  return (
    <article
      ref={cardRef}
      className={`zr-card zr-card--${theme} ${featured ? "zr-card--featured" : ""}`}
      style={{ "--order": Math.min(index, 12) }}
      aria-labelledby={headingId}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="zr-card__head">
        <span className={`zr-ftype zr-ftype--${fileType.toLowerCase()}`}>
          <FileTypeIcon fileType={fileType} />
        </span>
        <div className="zr-card__flags">
          {featured && <span className="zr-flag zr-flag--latest">Latest</span>}
          {!featured && isNew && <span className="zr-flag zr-flag--new">New</span>}
        </div>
      </div>

      <div className="zr-card__body">
        <p className="zr-card__category">
          <span className={`zr-dot zr-dot--${theme}`} aria-hidden="true" />
          {category}
        </p>
        <h3 id={headingId} className="zr-card__title">
          <Highlight text={title} query={query} />
        </h3>
        {description && (
          <p className="zr-card__description">
            <Highlight text={description} query={query} />
          </p>
        )}
      </div>

      <dl className="zr-meta">
        <div><dt>Type</dt><dd>{fileType}</dd></div>
        {topic && <div><dt>Topic</dt><dd><Highlight text={topic} query={query} /></dd></div>}
        {session && <div><dt>Session</dt><dd>{session}</dd></div>}
        {dateText && <div><dt>Added</dt><dd><time dateTime={addedOn}>{dateText}</time></dd></div>}
      </dl>

      <div className="zr-actions">
        {hasOpenLink && (
          <a className="zr-btn zr-btn--primary" href={resourceUrl} target="_blank" rel="noopener noreferrer">
            Open
            <span className="zr-sr-only"> {title} (opens in a new tab)</span>
            <span aria-hidden="true"> ↗</span>
          </a>
        )}
        {hasDownload && (
          <a className="zr-btn zr-btn--outline" href={downloadUrl} download>
            Download
            <span className="zr-sr-only"> {title}</span>
          </a>
        )}
      </div>
    </article>
  );
}
