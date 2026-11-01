// Shown when resources exist but none fit the current search or category.
export default function NoMatch({ query, category, onClearSearch, onClearCategory, onClearAll }) {
  const hasQuery = Boolean(query);
  const hasCategory = Boolean(category);

  return (
    <div className="zr-empty" role="status">
      <div className="zr-empty__shapes" aria-hidden="true">
        <i /> <i /> <i />
      </div>
      <h3 className="zr-empty__title">No resources found</h3>
      <p className="zr-empty__text">
        {hasQuery && <>Nothing matches <strong>&ldquo;{query}&rdquo;</strong></>}
        {hasQuery && hasCategory && " "}
        {hasCategory && <>{hasQuery ? "in" : "Nothing is published in"} <strong>{category}</strong></>}
        . Try a different search term or choose another category.
      </p>
      <div className="zr-empty__actions">
        {hasQuery && hasCategory && (
          <>
            <button type="button" className="zr-btn zr-btn--outline" onClick={onClearSearch}>Clear search</button>
            <button type="button" className="zr-btn zr-btn--outline" onClick={onClearCategory}>Show all categories</button>
          </>
        )}
        <button type="button" className="zr-btn zr-btn--primary" onClick={onClearAll}>Clear filters</button>
      </div>
    </div>
  );
}
