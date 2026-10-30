import { useEffect } from "react";
import {
  ArrowIcon,
  TargetIcon, EyeIcon,
  CodeIcon, BulbIcon, BookIcon, UsersIcon,
  RocketIcon, TerminalIcon, CalendarIcon, GlobeIcon,
  StarIcon, HeartIcon,
} from "../components/Icons";
import "../styles/About.css";

// ─── Static data (edit here, no layout changes needed) ────────
const objectives = [
  {
    color: "blue",
    Icon:  CodeIcon,
    title: "Promote Programming",
    text:  "Encourage every student to explore coding, problem-solving, and software development.",
  },
  {
    color: "red",
    Icon:  BulbIcon,
    title: "Inspire Innovation",
    text:  "Turn creative ideas into real projects that address genuine challenges.",
  },
  {
    color: "yellow",
    Icon:  BookIcon,
    title: "Continuous Learning",
    text:  "Support students in building solid technical skills through workshops and study jams.",
  },
  {
    color: "green",
    Icon:  UsersIcon,
    title: "Build Community",
    text:  "Foster teamwork, mentorship, and peer learning across all experience levels.",
  },
];

const activities = [
  {
    color: "blue",
    Icon:  RocketIcon,
    title: "Workshops",
    text:  "Hands-on sessions on programming, web dev, ML, and emerging technologies.",
  },
  {
    color: "red",
    Icon:  TerminalIcon,
    title: "Coding Sessions",
    text:  "Practice nights, peer learning, and friendly coding challenges.",
  },
  {
    color: "yellow",
    Icon:  CalendarIcon,
    title: "Tech Events",
    text:  "Speaker talks, hackathons, meetups, and community gatherings.",
  },
  {
    color: "green",
    Icon:  GlobeIcon,
    title: "Learning Tracks",
    text:  "Structured study groups, curated resources, and skill-building paths.",
  },
];

const stats = [
  { num: "50+",  label: "Members"  },
  { num: "10+",  label: "Events"   },
  { num: "2024", label: "Founded"  },
  { num: "BZU",  label: "Campus"   },
];

// ─── Sub-components ───────────────────────────────────────────
function InfoCard({ color, Icon, title, text }) {
  return (
    <article className={`zg-card ${color}`} role="article">
      <div className="zg-icon" aria-hidden="true">
        <Icon size={24} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function About() {
  useEffect(() => {
    document.title = "About Us | ZGDC CASPAM Chapter";

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = Object.assign(document.createElement("meta"), { name });
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta(
      "description",
      "Learn about the Zakariyan Google Developer Club (ZGDC) CASPAM Chapter at BZU Multan — our mission, vision, objectives, and student activities."
    );
  }, []);

  return (
    <main className="zg-page" id="about-main">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="about-hero" aria-labelledby="about-heading">
        <div className="zg-wrap about-hero-grid">

          {/* Left: text */}
          <div>
            <div className="zg-dots" aria-hidden="true">
              <i /><i /><i /><i />
            </div>
            <span className="zg-eyebrow">About Us</span>
            <h1 id="about-heading">
              We are the{" "}
              <span className="about-gradient">
                Zakariyan Google Developer Club
              </span>
            </h1>
            <p className="about-lead">
              A student-led technology community at CASPAM, Bahauddin Zakariya
              University — where curious learners build skills in programming,
              technology, and innovation together.
            </p>
            <div className="about-actions">
              <a className="zg-btn zg-btn-primary" href="#/contact">
                Get in Touch <ArrowIcon size={18} />
              </a>
              <a className="zg-btn zg-btn-outline" href="#mission">
                Our Mission
              </a>
            </div>
          </div>

          {/* Right: 3-D logo */}
          <div className="about-logo-wrap">
            <div className="about-logo-3d">
              <img
                className="about-logo-img"
                src="/zgdc-logo.jpg"
                alt="Zakariyan Google Developer Club logo"
                width="360"
                height="360"
              />
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="zg-wrap">
          <div className="about-stats" role="list" aria-label="Club highlights">
            {stats.map(({ num, label }) => (
              <div className="about-stat" key={label} role="listitem">
                <span className="about-stat-num" aria-label={`${num} ${label}`}>
                  {num}
                </span>
                <span className="about-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="zg-divider" />

      {/* ── WHO WE ARE ───────────────────────────────────────── */}
      <section className="zg-section zg-alt" aria-label="Who we are">
        <div className="zg-wrap about-two">
          <div className="about-photo">
            <img
              src="/team-work.jpg"
              alt="ZGDC CASPAM members collaborating"
              loading="lazy"
              width="600"
              height="420"
              style={{ objectFit: "cover" }}
            />
            <span className="about-badge" aria-hidden="true">🤝 Teamwork</span>
          </div>
          <div className="about-who">
            <span className="zg-eyebrow">Who We Are</span>
            <h2>A community built on learning&nbsp;&amp;&nbsp;collaboration</h2>
            <p>
              ZGDC CASPAM brings together students who love technology. We create
              a welcoming space to learn, share ideas, work on real projects, and
              grow as developers and future leaders.
            </p>
            <p>
              Our community is open to every student — from first-time coders
              exploring their first "Hello World" to experienced builders pushing
              the limits of what's possible.
            </p>
            <p>
              As part of the global Google Developer Groups ecosystem, we connect
              our campus to a worldwide network of learners and innovators.
            </p>
          </div>
        </div>
      </section>

      <hr className="zg-divider" />

      {/* ── MISSION & VISION ─────────────────────────────────── */}
      <section className="zg-section" id="mission" aria-labelledby="mv-heading">
        <div className="zg-wrap">
          <div className="zg-title">
            <span className="zg-eyebrow">Purpose</span>
            <h2 id="mv-heading">Our Mission &amp; Vision</h2>
            <p>The values that drive everything we do as a community.</p>
          </div>
          <div className="zg-grid about-mv">
            <InfoCard
              color="blue"
              Icon={TargetIcon}
              title="Mission"
              text="To promote programming, technology, and innovation by giving students real opportunities to learn, collaborate, and develop practical technical skills that matter."
            />
            <InfoCard
              color="green"
              Icon={EyeIcon}
              title="Vision"
              text="A confident student developer community at BZU that learns together, builds useful solutions, and grows into the technology leaders of tomorrow."
            />
          </div>
        </div>
      </section>

      <hr className="zg-divider" />

      {/* ── OBJECTIVES ───────────────────────────────────────── */}
      <section
        className="zg-section zg-alt"
        aria-labelledby="objectives-heading"
      >
        <div className="zg-wrap">
          <div className="zg-title">
            <span className="zg-eyebrow">Goals</span>
            <h2 id="objectives-heading">Main Objectives</h2>
            <p>Four pillars that guide our activities and decision-making.</p>
          </div>
          <div className="zg-grid">
            {objectives.map((o) => (
              <InfoCard key={o.title} {...o} />
            ))}
          </div>
        </div>
      </section>

      <hr className="zg-divider" />

      {/* ── ACTIVITIES ───────────────────────────────────────── */}
      <section className="zg-section" aria-labelledby="activities-heading">
        <div className="zg-wrap">
          <div className="zg-title">
            <span className="zg-eyebrow">Activities</span>
            <h2 id="activities-heading">What We Do</h2>
            <p>Planned activities designed to grow your skills and network.</p>
          </div>
          <div className="zg-grid">
            {activities.map((a) => (
              <InfoCard key={a.title} {...a} />
            ))}
          </div>
        </div>
      </section>

      <hr className="zg-divider" />

      {/* ── JOIN CTA ─────────────────────────────────────────── */}
      <section className="zg-section zg-alt" aria-label="Join us">
        <div className="zg-wrap">
          <div className="about-cta">
            <StarIcon size={36} style={{ color: "#fff", margin: "0 auto 16px", display: "block" }} />
            <h2>Want to join or collaborate?</h2>
            <p>
              Reach out to the ZGDC CASPAM team — we would love to hear from you,
              whether you are a student, faculty member, or industry partner.
            </p>
            <a className="zg-btn" href="#/contact">
              <HeartIcon size={18} /> Contact Us
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
