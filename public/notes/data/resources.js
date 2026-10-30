// ---------------------------------------------------------------------------
// NOTES & LEARNING RESOURCES: the only file you edit after each session.
//
// The library starts EMPTY on purpose. Add one entry per published file.
//
// HOW TO PUBLISH A RESOURCE (example: first session's PDF)
//   1. Put the PDF in the folder  public/notes/   (same folder the Events page uses).
//      Use a simple name with no spaces, e.g.  python-session-1.pdf
//   2. Add an object to the `resources` list below (copy the template).
//   3. Commit. The card appears on the Notes page after the site redeploys.
//
// TEMPLATE (copy it inside the [ ] below and fill every line):
//
//   {
//     id: 1,                                     // unique number, never reuse one
//     title: "Python Basics: Session 1 Notes",
//     description: "One or two short sentences about the material.",  // optional
//     category: "Programming",                   // must match a name in CATEGORIES
//     topic: "Python",                           // optional short subject label
//     fileType: "PDF",                           // "PDF" | "Slides" | "Notebook" | "Link"
//     session: "Session 1",                      // optional
//     addedOn: "2026-11-06",                     // required, YYYY-MM-DD
//     approved: true,                            // only after a lead approves it
//     resourceUrl: file("python-session-1.pdf"), // opens the file
//     downloadUrl: file("python-session-1.pdf"), // optional, "" hides Download
//   },
//
// WHAT THE PAGE SHOWS
//   A resource is published only if ALL of these are true:
//     - approved is exactly true
//     - title, category (listed in CATEGORIES), fileType and addedOn are valid
//     - it has at least one real link (resourceUrl or downloadUrl)
//   Anything else is hidden, never shown half-finished. While you run
//   `npm run dev`, the browser console explains why an entry was skipped.
//   Open / Download buttons exist only for links that are present and valid.
//
// For a file that lives elsewhere (Google Drive, YouTube) write the full
// address instead of file(...):  resourceUrl: "https://...".
// Never write a link you have not opened and checked.
// ---------------------------------------------------------------------------

// Turns a file name into its web address inside public/notes/
export const file = (name) => `${import.meta.env.BASE_URL}notes/${name}`;

// Category names used by the filter buttons ("All Resources" is added by the UI).
export const CATEGORIES = [
  "Programming",
  "Web Development",
  "AI & Machine Learning",
  "Data Analytics",
  "Workshop Materials",
];

// Short description of what each category will hold. Shown only while the
// library is empty (as a preview). Edit the wording freely.
export const CATEGORY_INFO = {
  "Programming": "Programming fundamentals, practice problems and coding guides.",
  "Web Development": "HTML, CSS, JavaScript and modern web project guides.",
  "AI & Machine Learning": "Introductions to AI and machine learning, with hands-on notebooks.",
  "Data Analytics": "Working with data: cleaning, analysis and clear visual stories.",
  "Workshop Materials": "Slides, handouts and exercises from ZGDC workshops.",
};

// Starts empty on purpose. Sessions have not started yet.
export const resources = [];
