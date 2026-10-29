# ZGDC–CASPAM Chapter Website
Vite + React + Tailwind + GSAP + Three.js.

## Setup
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Folder structure
- `src/pages/` Home, About, Members, Events, Contact (hash routes: `#/about` etc.; wired in `App.jsx` + `Navbar.jsx`)
- `src/components/` Intro, Navbar, Hero, Scene3D, Tracks, Footer, Logo
- `src/data/` `team.json`, `events.json`, `site.json` — non-developers edit these only
- `src/hooks/useTilt.js` hover tilt
- `src/index.css` brand colours (CSS variables) + global styles
- `public/` logo and static files

## Edit content
- Members: add an object to `src/data/team.json` (`name`, `role`, `bio`, `skills`, `links`, `photo` = e.g. `/team/ayesha.jpg`, file saved in `public/team/`, square, under 200 KB).
- Events: add to `src/data/events.json`. `status`: `upcoming`/`past`. Registration: set `registerUrl` (Google Form) or leave empty to use the built-in form. Notes: put PDFs in `public/notes/` and list them in `notes` (`{ "title": "Slides", "file": "/notes/web-day1.pdf" }`).
- Site-wide: `site.json` (contact email, address, social links, optional `formEndpoint` for Formspree/Apps Script so registrations/contact don't rely on email).
- Text: `pages/About.jsx` (search for `TODO`).

## Swap the logo and colours
1. Replace `public/logo.png` (transparent PNG).
2. Update the `--brand-*` variables in `src/index.css`. `--brand-main` is a darker blue used for text/buttons so contrast stays above 4.5:1.

## Git workflow (15 people)
- `main` = production (auto-deploys). Protect it; no direct pushes.
- `dev` = integration branch.
- Each person: `git checkout -b feature/<name>-<task>` from `dev`, commit small, open a PR into `dev`, get 1 review.
- Lead merges `dev` → `main` for releases. Content-only edits (JSON) use `content/<name>` branches.

## Deploy on Vercel
1. Push to GitHub.
2. vercel.com → Add New → Project → import the repo.
3. Framework preset: Vite. Build `npm run build`, output `dist`. Deploy.
4. Every PR gets a preview URL; merges to `main` go live.

## Free database (Firebase Firestore)
Event registrations and contact messages are saved to Firestore (free Spark plan, no card needed). Until it is configured, the forms fall back to email.

**Setup (one person, ~10 min)**
1. console.firebase.google.com → Add project (disable Analytics).
2. Build → Firestore Database → Create database → production mode → region closest to Pakistan (e.g. `asia-south1`).
3. Project settings → Your apps → Web (`</>`) → register app → copy the config values.
4. Copy `.env.example` to `.env` and paste the 4 values. Never commit `.env`.
5. Firestore → Rules tab → paste the contents of `firestore.rules` → Publish. This lets visitors only *create* validated records; nobody can read or delete from the website.
6. Vercel → Project → Settings → Environment Variables → add the same 4 `VITE_FIREBASE_*` values → redeploy.

**Reading the data:** Firebase console → Firestore → `registrations` / `messages`. Only members added under Project settings → Users and permissions can see it. Copy or export from there (exports need the paid plan; for CSV, a lead can copy rows or use a Google Sheet via Apps Script later).

**Free limits (Spark):** 1 GiB storage, 50k reads and 20k writes per day — plenty for a club.

**Collaborators on the database:** add teammates in Firebase console → Project settings → Users and permissions (Editor/Viewer). Share config via the team's private channel, not the repo.

Note: the Firebase web config is not a secret (it only identifies the project); the security comes from `firestore.rules`.
