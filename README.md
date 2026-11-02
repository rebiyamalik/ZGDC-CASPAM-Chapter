# 🚀 ZGDC–CASPAM Chapter Website

**Zakariyan Google Developer Club – CASPAM Chapter**
Center for Advanced Studies in Pure and Applied Mathematics (CASPAM)
Bahauddin Zakariya University, Multan, Pakistan

[![Live Site](https://img.shields.io/badge/Live-zgdccaspamchapter.vercel.app-blue?style=flat-square&logo=vercel)](https://zgdccaspamchapter.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-ZGDC--CASPAM-black?style=flat-square&logo=github)](https://github.com/rebiyamalik/ZGDC-CASPAM-Chapter)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D-000000?logo=threedotjs&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)

---

## 📋 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `#/home` | Hero, stats (25 Members), AI Baithak event, FAQ |
| About Us | `#/about` | Introduction, vision, mission, objectives |
| Members | `#/members` | Team profiles and member cards |
| Events | `#/events` | AI Baithak (upcoming) + future events |
| Notes | `#/notes` | Basics & notes by topic |
| Contact Us | `#/contact` | Contact form, social links, LinkedIn |

---

## 🎨 Design System

- **Theme:** Light (white background `#FFFFFF`)
- **Primary Blue:** `#4285F4`
- **Red:** `#EA4335`
- **Yellow:** `#FBBC05`
- **Green:** `#34A853`
- **Text:** `#202124` / `#5F6368`
- **Footer:** `#202124` (near black)
- **Fonts:** Inter (body), Poppins (headings), Sora (display)

---

## 🛠️ Tech Stack

| Area | Tool |
|------|------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS + custom CSS |
| Animation | GSAP + CSS animations |
| 3D | Three.js (hero only) |
| Database | Firebase Firestore (optional) |
| Deployment | Vercel (auto-deploy from GitHub) |

---

## 👥 Team Assignments

| Member | Module |
|--------|--------|
| **Rebiya Ismail** | Project Lead, Homepage, Design System, Database |
| **Mubashira Zainab** | About Us, Contact Us, Events, Notes (Basics & Notes section) |
| **Muhammad Ramzan** | Notes Section (Resources) |
| **Mehreen Sultana** | Members, Events Page |
| **Ateeq ur Rehman** | AI Integration |
| **Others** | Registration |

---

## ⚙️ Local Development

```bash
# 1. Clone the repository
git clone https://github.com/rebiyamalik/ZGDC-CASPAM-Chapter.git
cd ZGDC-CASPAM-Chapter

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## 📁 Folder Structure

```text
public/                  Logo, static files
  zgdc-logo.jpg          Club logo
src/
  pages/                 Home, About, Members, Events, Notes, Contact
  components/            Navbar, Hero, Scene3D, Tracks, Footer, Icons, SocialLinks
  data/
    team.json            Members list
    events.json          Events (AI Baithak + future)
    zgdcInfo.js          Single source of truth for club details
    site.json            Contact details and social links
  styles/                About.css, Contact.css, zgdc-shared.css
  index.css              Design tokens (CSS variables) + global styles
  App.jsx                Router and page switching
hooks/
  useRoute.js            Hash-based routing
  useTilt.js             Hover tilt effect
firestore.rules          Database security rules
```

---

## 📝 Updating Content

### Club info (email, address, social links)
```
src/data/zgdcInfo.js
```

### Events
```
src/data/events.json
```
Set `"status": "upcoming"` or `"status": "past"`.

### Members
Add photos to `public/team/` and update:
```
src/data/team.json
```
Photos should be square (1:1 ratio), under 200 KB.

### Environment variables (Firebase)
Copy `.env.example` to `.env` and fill in your values.
**Never commit `.env` to GitHub.**

---

## 🚀 Deployment (Vercel)

1. Push code to the `main` branch on GitHub.
2. Vercel auto-deploys on every push.
3. Add environment variables in Vercel → Project → Settings → Environment Variables.

---

## 🗄️ Free Database (Firebase Firestore)

Event registrations and contact messages are saved to Firestore (free Spark plan). Until configured, forms fall back to email.

**Setup (~10 minutes):**
1. console.firebase.google.com → Add project → disable Analytics.
2. Build → Firestore Database → Create database → production mode → region `asia-south1`.
3. Project settings → Your apps → Web → register app → copy config values.
4. Copy `.env.example` to `.env` and paste the values. Never commit `.env`.
5. Firestore → Rules → paste contents of `firestore.rules` → Publish.
6. Vercel → Project → Settings → Environment Variables → add same `VITE_FIREBASE_*` values → redeploy.

---

## 🔗 Official Links

- 🌐 [Website](https://zgdccaspamchapter.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/company/zakariyan-google-developer-club-caspam-chapter)
- 📷 [Instagram](https://www.instagram.com/zgdc_caspam_chapter)
- 👥 [Facebook](https://www.facebook.com/zgdccaspam)
- 📧 rebiyamalik86@gmail.com

---

*Built with ❤️ by the ZGDC–CASPAM team · BZU Multan · 2026*
