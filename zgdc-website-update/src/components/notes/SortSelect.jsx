// Sorting options. To add one: add a line here and a matching entry in Notes.jsx.
export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Title A to Z" },
  { value: "category", label: "Category" },
];

export default function SortSelect({ value, onChange }) {
  return (
    <div className="zr-sort">
      <label htmlFor="zr-sort" className="zr-sort__label">Sort by</label>
      <select id="zr-sort" className="zr-sort__select" value={value} onChange={(event) => onChange(event.target.value)}>
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
