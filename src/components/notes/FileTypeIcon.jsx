// One small icon per file type, drawn inline so no icon library is needed.
const PATHS = {
  PDF: (
    <>
      <path d="M6 3h8l5 5v13H6z" />
      <path d="M14 3v5h5" />
      <path d="M9 15h6M9 18h4" />
    </>
  ),
  Slides: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M12 17v3M8 20h8M7 10h6M7 13h4" />
    </>
  ),
  Notebook: (
    <>
      <path d="M8 6 3 12l5 6M16 6l5 6-5 6" />
      <path d="m13.5 5-3 14" />
    </>
  ),
  Link: (
    <>
      <path d="M10 14 20 4M14 4h6v6" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
};

export default function FileTypeIcon({ fileType }) {
  return (
    <svg className="zr-ftype-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[fileType] ?? PATHS.PDF}
    </svg>
  );
}
