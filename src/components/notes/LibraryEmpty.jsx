// The designed state for an empty library (before the first session).
// It promises nothing it cannot keep: no counts, no files, no dates.
const STEPS = [
  { title: "A session takes place", text: "Each ZGDC session or workshop produces notes and materials." },
  { title: "Materials are approved", text: "The team reviews every file before it is shared." },
  { title: "Files appear here", text: "Approved notes, slides and files are published on this page." },
];

export default function LibraryEmpty() {
  return (
    <div className="zr-library">
      <div className="zr-library__panel" role="status">
        <div className="zr-folder" aria-hidden="true">
          <span className="zr-folder__back" />
          <i className="zr-fly zr-fly--a" />
          <i className="zr-fly zr-fly--b" />
          <i className="zr-fly zr-fly--c" />
          <span className="zr-folder__paper zr-folder__paper--green" />
          <span className="zr-folder__paper zr-folder__paper--yellow" />
          <span className="zr-folder__front" />
        </div>
        <h2 className="zr-library__title">Your Learning Library Is Getting Ready</h2>
        <p className="zr-library__text">
          Our learning resources will be published here as ZGDC sessions and workshops begin.
          Stay connected and check back for new notes, presentations and learning materials.
        </p>
      </div>

      <ol className="zr-steps" aria-label="How the library grows">
        {STEPS.map((step, index) => (
          <li key={step.title} className="zr-step">
            <span className="zr-step__num" aria-hidden="true">{index + 1}</span>
            <div>
              <h3 className="zr-step__title">{step.title}</h3>
              <p className="zr-step__text">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
