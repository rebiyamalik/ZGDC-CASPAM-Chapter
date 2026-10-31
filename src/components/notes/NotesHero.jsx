import { useRef } from "react";
import SearchBar from "./SearchBar.jsx";

// Floating tags that sit at different depths in the 3D scene.
// "depth" controls how far each one moves when the mouse moves (parallax).
const TAGS = [
  { label: "PDF", color: "red", depth: 26, className: "zr-tag--a" },
  { label: "Slides", color: "yellow", depth: 40, className: "zr-tag--b" },
  { label: "Notebook", color: "green", depth: 18, className: "zr-tag--c" },
];

// Small tumbling cubes that drift around the stack. `depth` = parallax strength.
const CUBES = [
  { color: "blue", size: 34, depth: 54, className: "zr-cubewrap--a" },
  { color: "yellow", size: 28, depth: 30, className: "zr-cubewrap--b" },
  { color: "red", size: 38, depth: 44, className: "zr-cubewrap--c" },
  { color: "green", size: 24, depth: 70, className: "zr-cubewrap--d" },
];
const FACES = ["front", "back", "right", "left", "top", "bottom"];

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
            <img className="zr-eyebrow__logo" src={`${import.meta.env.BASE_URL}zgdc-logo.jpg`} alt="Zakariyan Google Developer Club logo" width="80" height="80" />
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
          <div className="zr-orbit">
            <div className="zr-ring zr-ring--one"><i /></div>
            <div className="zr-ring zr-ring--two"><i /></div>
          </div>
          <div className="zr-sway">
            <div className="zr-stack">
              {SLABS.map((color, index) => (
                <div key={color} className={`zr-slab zr-slab--${color}`} style={{ "--layer": index }} />
              ))}
            </div>
          </div>
          <div className="zr-coin">
            <img src={`${import.meta.env.BASE_URL}zgdc-logo.jpg`} alt="" width="120" height="120" />
          </div>
          {CUBES.map((cube) => (
            <div key={cube.color} className={`zr-cubewrap ${cube.className}`} style={{ "--depth": cube.depth, "--s": `${cube.size}px` }}>
              <div className={`zr-cube zr-cube--${cube.color}`}>
                {FACES.map((face) => <span key={face} className={`zr-face zr-face--${face}`} />)}
              </div>
            </div>
          ))}
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
