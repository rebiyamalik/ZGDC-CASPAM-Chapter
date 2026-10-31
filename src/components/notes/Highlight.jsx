// Wraps the part of `text` that matches the search `query` in <mark>.
export default function Highlight({ text, query }) {
  if (!query) return text;
  const start = text.toLowerCase().indexOf(query);
  if (start === -1) return text;
  const end = start + query.length;
  return (
    <>
      {text.slice(0, start)}
      <mark className="zr-mark">{text.slice(start, end)}</mark>
      {text.slice(end)}
    </>
  );
}
