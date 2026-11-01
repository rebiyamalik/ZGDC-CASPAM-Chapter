import { useEffect, useRef } from "react";

// Controlled search input. Keyboard extras:
//   "/"  anywhere on the page focuses the search box
//   Esc  clears the text while the box is focused
export default function SearchBar({ value, onChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable);
      if (event.key === "/" && !isTyping && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="zr-search" role="search">
      <label htmlFor="zr-resource-search" className="zr-sr-only">
        Search resources by title, topic or description
      </label>
      <svg className="zr-search__icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        id="zr-resource-search"
        ref={inputRef}
        className="zr-search__input"
        type="search"
        placeholder="Search notes and topics"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && value) {
            event.preventDefault();
            onChange("");
          }
        }}
        autoComplete="off"
        enterKeyHint="search"
      />
      {value ? (
        <button type="button" className="zr-search__clear" onClick={() => { onChange(""); inputRef.current?.focus(); }}>
          <span className="zr-sr-only">Clear search</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      ) : (
        <kbd className="zr-search__kbd" aria-hidden="true">/</kbd>
      )}
    </div>
  );
}
