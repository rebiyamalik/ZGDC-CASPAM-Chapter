import { themeFor } from "./theme.js";

// "All Resources" is added here, so the data file only lists real categories.
export const ALL = "All Resources";

export default function CategoryFilters({ categories, counts, selectedCategory, onSelect }) {
  const options = [ALL, ...categories];

  return (
    <div className="zr-filters" role="group" aria-label="Filter by category">
      {options.map((name) => {
        const isActive = name === selectedCategory;
        return (
          <button
            key={name}
            type="button"
            className={`zr-chip ${isActive ? "zr-chip--active" : ""}`}
            aria-pressed={isActive}
            onClick={() => onSelect(name)}
          >
            {name !== ALL && <span className={`zr-dot zr-dot--${themeFor(name)}`} aria-hidden="true" />}
            {name}
            <span className="zr-chip__count">
              <span className="zr-sr-only"> (</span>
              {counts[name] ?? 0}
              <span className="zr-sr-only"> resources)</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
