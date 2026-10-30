import { useRef } from "react";
import logo from "../../assets/zgdc-logo.png";
import SearchBar from "./SearchBar.jsx";

// Floating tags that sit at different depths in the 3D scene.
// "depth" controls how far each one moves when the mouse moves (parallax).
const TAGS = [
  { label: "PDF", color: "red", depth: 26, className: "zr-tag--a" },
  { label: "Slides", color: "yellow", depth: 40, className: "zr-tag--b" },
  { label: "Notebook", color: "green", depth: 18, className: "zr-tag--c" },
];

// The four slabs of the 3D stack, bottom to top.
const SLABS = ["green", "yellow", "red", "blue"];

// `hasResources` decides what sits under the intro text: the search box once
// there is something to search, otherwise a calm status line.
export default function NotesHero({ hasResources, searchTerm, onSearchChange }) {
  const heroRef = useRef(null);
  const frameRef = useRef(0);

  // Parallax: the stack and tags shift toward the mouse pointer.
  // Batched with requestAnimationFrame; skipped for touch and reduced motion.
  function handlePointerMove(event) {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const box = heroRef.current.getBoundingClientRect();
      heroRef.current.style.setProperty("--mx", ((clientX - box.left) / box.width - 0.5).toFixed(3));
      heroRef.current.style.setProperty("--my", ((clientY - box.top) / box.height - 0.5).toFixed(3));
    });
  }

  return (
    <header ref={heroRef} className="zr-hero" onPointerMove={handlePointerMove}>
      <div className="zr-container zr-hero__inner">
        <div className="zr-hero__content">
          <p className="zr-eyebrow">
            <img className="zr-eyebrow__logo" src={logo} alt="Zakariyan Google Developer Club logo" width="80" height="80" />
            <span>ZGDC Resource Library</span>
          </p>

          <h1 className="zr-hero__title">
            Notes &amp; <span className="zr-hero__highlight">Learning</span> Resources
          </h1>

          <p className="zr-hero__intro">
            Explore study notes, programming guides, workshop materials, and
            learning resources shared with the ZGDC community.
          </p>

          {hasResources ? (
            <>
              <SearchBar value={searchTerm} onChange={onSearchChange} />
              <p className="zr-hero__hint">New files are added after every session.</p>
            </>
          ) : (
            <p className="zr-status">
              <span className="zr-status__dot" aria-hidden="true" />
              Library opening with our first session
            </p>
          )}
        </div>

        {/* Visual concept: a stack of resource "layers" in the four brand
            colours, with file-type tags floating at different depths. */}
        <div className="zr-scene" aria-hidden="true">
          <div className="zr-scene__wash" />
          <div className="zr-sway">
            <div className="zr-stack">
              {SLABS.map((color, index) => (
                <div key={color} className={`zr-slab zr-slab--${color}`} style={{ "--layer": index }} />
              ))}
            </div>
          </div>
          {TAGS.map((tag) => (
            <span key={tag.label} className={`zr-tag zr-tag--${tag.color} ${tag.className}`} style={{ "--depth": tag.depth }}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
