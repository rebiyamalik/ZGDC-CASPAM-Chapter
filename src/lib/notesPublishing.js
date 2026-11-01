// Decides which entries in src/data/resources.js may be shown to visitors.
// Pure functions with no React, so the rules are easy to read and test.

export const FILE_TYPES = ["PDF", "Slides", "Notebook", "Link"];

const isText = (value) => typeof value === "string" && value.trim() !== "";

// A real link: a full https/http address or a path on this site (/notes/x.pdf).
// Rejects empty text, "#" placeholders, "//host" and javascript: links.
export function isValidUrl(value) {
  if (!isText(value)) return false;
  const url = value.trim();
  if (url.startsWith("//")) return false;
  return /^(https?:\/\/\S+|\/\S+)$/.test(url);
}

function isRealDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

// Returns a list of problems (empty list = the entry is complete and valid).
export function checkResource(item, categories) {
  const problems = [];
  if (item.id === undefined || item.id === null || item.id === "") problems.push("missing id");
  if (!isText(item.title)) problems.push("missing title");
  if (!categories.includes(item.category)) problems.push(`category "${item.category}" is not listed in CATEGORIES`);
  if (!FILE_TYPES.includes(item.fileType)) problems.push(`fileType must be one of ${FILE_TYPES.join(", ")}`);
  if (!isRealDate(item.addedOn)) problems.push("addedOn must be a real date written like 2026-11-06");

  const hasOpen = isValidUrl(item.resourceUrl);
  const hasDownload = isValidUrl(item.downloadUrl);
  if (isText(item.resourceUrl) && !hasOpen) problems.push("resourceUrl is not a valid link");
  if (isText(item.downloadUrl) && !hasDownload) problems.push("downloadUrl is not a valid link");
  if (!hasOpen && !hasDownload) problems.push("needs a valid resourceUrl or downloadUrl");
  return problems;
}

// Keeps only approved, complete resources. `onSkip(item, problems)` is called
// for approved entries that were hidden, so authors can be told why.
export function getPublishedResources(list, categories, onSkip) {
  return list.filter((item) => {
    if (item.approved !== true) {
      // approved: false / missing is a normal draft; any other value is a typo worth flagging
      if (item.approved !== undefined && item.approved !== false) {
        onSkip?.(item, ["approved must be exactly true (without quotes) to publish"]);
      }
      return false;
    }
    const problems = checkResource(item, categories);
    if (problems.length > 0) {
      onSkip?.(item, problems);
      return false;
    }
    return true;
  });
}
