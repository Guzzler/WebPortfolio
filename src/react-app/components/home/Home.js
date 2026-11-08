import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SiteTopBar from "../common/SiteTopBar";
import Icon, { PixelIcon } from "../common/Icon";
import Tour from "../../game/Tour";
import TileTrail from "../../game/TileTrail";
import { useMicroInteractions } from "../../game/interactions";
import { ACHIEVEMENTS, useAchievements } from "../../game/achievements";
import Arcade from "./Arcade";
import Toolkit, { FxChips, Glyph } from "./Toolkit";
import PlayerCard from "./PlayerCard";
import { getAllPosts } from "../blog/posts";
import { track } from "../../../analytics";
import {
  profile,
  experience,
  earlierExperience,
  impact,
  education,
  interests,
  offScreen,
} from "../../content";
import "./Home.css";

const SECTION_IDS = ["top", "work", "impact", "games", "writing", "skills", "background", "contact"];
const HEADLINE = "I build AI systems, and I care about who they reach.";
const TITLE_CONTEXT = "Since my first open-source project in 2015 I've built tools for classrooms, public health and conservation, and I make small games on the side because they're the most fun way I know to practise design.";

const formatDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Tracks which section is on screen, which have been seen, and awards Explorer.
const useSectionSpy = () => {
  const { unlock } = useAchievements();
  const [active, setActive] = useState("top");
  const [seen, setSeen] = useState({ top: true });

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);

    let activeObserver;
    const observeActive = () => {
      if (activeObserver) activeObserver.disconnect();
      // Percentage root margins are resolved against width, even vertically.
      const line = Math.round(window.innerHeight * 0.42);
      activeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
        },
        { rootMargin: `-${line}px 0px -${window.innerHeight - line - 1}px 0px` }
      );
      els.forEach((el) => activeObserver.observe(el));
    };
    const seenObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSeen((s) => (s[e.target.id] ? s : { ...s, [e.target.id]: true }));
        });
      },
      { threshold: 0 }
    );
    observeActive();
    els.forEach((el) => seenObserver.observe(el));
    window.addEventListener("resize", observeActive);
    return () => {
      window.removeEventListener("resize", observeActive);
      activeObserver.disconnect();
      seenObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (SECTION_IDS.every((id) => seen[id])) unlock("explorer");
  }, [seen, unlock]);

  return { active, seen };
};

const Zone = ({ id, level, title, lede, seen, children }) => (
  <section id={id} className={`zone${seen ? " is-seen" : ""}`} aria-labelledby={`${id}-title`}>
    <div className="zone-margin">
      <span className="zone-level" aria-hidden="true">
        {level}
      </span>
      <h2 id={`${id}-title`} className="zone-title" tabIndex={-1}>
        {title}
      </h2>
    </div>
    <div className="zone-content">
      {lede ? <p className="zone-lede">{lede}</p> : null}
      {children}
    </div>
  </section>
);

const ExternalLink = ({ href, children, event, className, ...rest }) => (
  <a
    {...rest}
    href={href}
    className={className}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => track("External Link", { destination: event || href })}
  >
    {children}
  </a>
);

// Copies the address and confirms in place; some people don't use a mail app.
const CopyEmail = ({ email, onCopy }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      onCopy();
      window.setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      /* clipboard blocked; the mailto link still works */
    }
  };
  return (
    <button type="button" className={`copy-btn${copied ? " is-copied" : ""}`} onClick={copy}>
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
};

const Home = () => {
  useMicroInteractions();
  const { hash } = useLocation();
  const { unlocked, unlock, openPanel } = useAchievements();
  const { active, seen } = useSectionSpy();
  const [touring, setTouring] = useState(false);
  const startRef = useRef(null);
  const resumeRef = useRef(null);
  const posts = getAllPosts().slice(0, 3);
  const count = Object.keys(unlocked).length;

  useLayoutEffect(() => {
    if (touring || !resumeRef.current) return;
    const target = resumeRef.current;
    resumeRef.current = null;
    const { top, bottom } = target.getBoundingClientRect();
    if (top < document.querySelector(".hud").offsetHeight || bottom > window.innerHeight) {
      target.scrollIntoView({ block: "start", behavior: "instant" });
    }
    target.focus({ preventScroll: true });
  }, [touring]);

  const closeTour = (target) => {
    resumeRef.current = target === "#top"
      ? startRef.current
      : document.querySelector(`${target} h2`);
    setTouring(false);
  };

  useEffect(() => {
    document.title = "Sharang Pai | AI engineer at Luma AI";
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) window.setTimeout(() => el.scrollIntoView(), 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const onEmail = (where) => {
    track("Email Click", { where });
    unlock("hello");
  };

  const tourInert = touring ? "" : undefined;

  return (
    <div className={`home${touring ? " is-touring" : ""}`}>
      <a className="skip-link" href="#work" inert={tourInert}>
        Skip to content
      </a>
      <SiteTopBar active={active} variant="game" inert={tourInert} />

      <main inert={tourInert}>
        <section
          id="top"
          className="title-screen"
          aria-labelledby="headline"
        >
          <TileTrail />
          <div className="title-copy">
            <h1 id="headline" className="headline">
              {HEADLINE.split(" ").map((word, i) => (
                <React.Fragment key={i}>
                  <span className="headline-word" style={{ "--i": i }}>
                    {word}
                  </span>{" "}
                </React.Fragment>
              ))}
            </h1>
            <p className="title-intro">
              I'm Sharang Pai, an engineer at{" "}
              <ExternalLink href="https://lumalabs.ai" event="Luma AI Hero">
                Luma AI
              </ExternalLink>
              , where I lead Evaluations Engineering and work on Luma Agents.
              <span className="title-context-wide"> {TITLE_CONTEXT}</span>
            </p>

            <div className="title-actions">
              <button ref={startRef} type="button" className="press-start" data-magnet onClick={() => setTouring(true)}>
                <span className="press-start-caret" aria-hidden="true">
                  ▶
                </span>
                Press start
                <span className="press-start-sub">1-minute tour</span>
              </button>
              <a
                className="btn-line"
                data-magnet
                href={`mailto:${profile.email}`}
                onClick={() => onEmail("hero")}
              >
                <Icon name="mail" size={16} />
                Email me
              </a>
            </div>

            <p className="title-context">{TITLE_CONTEXT}</p>

            <ul className="title-links" aria-label="Elsewhere">
              <li>
                <ExternalLink href={profile.links.github} event="GitHub">
                  <Icon name="github" size={16} /> GitHub
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={profile.links.linkedin} event="LinkedIn">
                  <Icon name="linkedin" size={16} /> LinkedIn
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={profile.links.itch} event="itch.io">
                  <Icon name="gamepad" size={17} /> itch.io
                </ExternalLink>
              </li>
            </ul>
          </div>

          <PlayerCard />
        </section>

        <Zone
          id="work"
          level="1-1"
          title="Work"
          seen={seen.work}
          lede="Product engineering, founding-team work and applied ML, across AI, health, fintech and climate."
        >
          <ol className="quest-log">
            {experience.map((job, i) => (
              <li
                key={job.company}
                className={`quest${i === 0 ? " is-current" : ""}`}
                style={{ "--i": i }}
                data-glow
              >
                <span className="quest-marker" aria-hidden="true" />
                <p className="quest-dates">{job.dates}</p>
                <div className="quest-body">
                  <h3 className="quest-company">
                    <ExternalLink href={job.url} event={job.company}>
                      {job.company}
                    </ExternalLink>
                    {job.note ? <span className="quest-note">{job.note}</span> : null}
                    {i === 0 ? <span className="quest-now">Now</span> : null}
                  </h3>
                  <p className="quest-role">{job.role}</p>
                  <p className="quest-summary">{job.summary}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="earlier">
            <h3 className="earlier-title">Earlier</h3>
            <ul>
              {earlierExperience.map((e) => (
                <li key={e.company}>
                  <span className="earlier-year">{e.year}</span>
                  <span>
                    <strong>{e.company}</strong> {e.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Zone>

        <Zone
          id="impact"
          level="1-2"
          title="Impact"
          seen={seen.impact}
          lede="The work I care about most. Since 2015 I've built open tools for people the tech industry tends to skip, and it's where I want to spend more of my career."
        >
          <ul className="impact-grid">
            {impact.map((item) => (
              <li
                key={item.title}
                className={`impact-card fx-host${item.url ? " is-linked" : ""}`}
                style={{ "--project": item.accent }}
                data-glow
              >
                <div className="impact-head">
                  <Glyph type={item.motif} />
                  <h3 className="impact-title">
                    {item.url ? (
                      <ExternalLink href={item.url} event={item.title} className="impact-main-link">
                        {item.title}
                      </ExternalLink>
                    ) : (
                      item.title
                    )}
                  </h3>
                  {item.url ? (
                    <Icon name="arrowUpRight" size={18} className="impact-arrow" />
                  ) : (
                    <span className="impact-status">{item.status}</span>
                  )}
                </div>
                <p className="impact-role">
                  {item.role}
                  {item.years ? `, ${item.years}` : ""}
                </p>
                {item.eras ? (
                  <ol className="impact-eras" aria-label="Timeline">
                    {item.eras.map((era) => (
                      <li key={era.years}>
                        <span className="era-years">{era.years}</span>
                        <span className="era-label">{era.label}</span>
                      </li>
                    ))}
                  </ol>
                ) : null}
                <p className="impact-summary">{item.summary}</p>
                {item.outcome ? (
                  <p className="impact-outcome">
                    <PixelIcon name="star" size={13} />
                    {item.outcome}
                  </p>
                ) : null}
                {item.links ? (
                  <p className="impact-links">
                    {item.links.map((l) => (
                      <ExternalLink key={l.url} href={l.url} event={`${item.title} ${l.label}`}>
                        {l.label}
                      </ExternalLink>
                    ))}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Zone>

        <Zone
          id="games"
          level="1-3"
          title="Games"
          seen={seen.games}
          lede="I co-create and program small games, mostly for game jams and mostly in Unity. They're where I practise feel, feedback and pacing. Pick a cartridge to play."
        >
          <Arcade />
          <ExternalLink href={profile.links.itch} event="itch.io all" className="more-link">
            All games on itch.io <Icon name="arrowUpRight" size={15} />
          </ExternalLink>
        </Zone>

        <Zone
          id="writing"
          level="1-4"
          title="Writing"
          seen={seen.writing}
          lede="Essays on AI, technology and the choices that come with building it."
        >
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="post-row select-frame"
                  data-glow
                  onClick={() => track("Blog Post Click", { post: post.slug, from: "home" })}
                >
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="post-title">{post.title}</span>
                  <span className="post-excerpt">{post.excerpt}</span>
                  <span className="post-read">{post.readingTime}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/blog" className="more-link">
            All writing
          </Link>
        </Zone>

        <Zone
          id="skills"
          level="1-5"
          title="Skills"
          seen={seen.skills}
          lede="What I reach for when building. Select a language or technology for a closer look."
        >
          <Toolkit />
        </Zone>

        <Zone id="background" level="1-6" title="Background" seen={seen.background}>
          <div className="background-grid">
            <div>
              <h3 className="sub-title">Education</h3>
              <ul className="edu-list">
                {education.map((e) => (
                  <li key={e.school}>
                    <p className="edu-school">
                      {e.school} <span>{e.year}</span>
                    </p>
                    <p className="edu-degree">{e.degree}</p>
                    <p className="edu-detail">{e.detail}</p>
                    <p className="edu-course">{e.coursework}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="background-side">
              <div>
                <h3 className="sub-title">Interests</h3>
                <FxChips items={interests} label="Interests" />
              </div>
              <div>
                <h3 className="sub-title">Off screen</h3>
                <FxChips items={offScreen} label="Hobbies" />
              </div>
            </div>
          </div>
        </Zone>
      </main>

      <footer id="contact" className="credits" inert={tourInert}>
        <div className="credits-inner">
          <p className="credits-kicker" aria-hidden="true">
            Thanks for playing
          </p>
          <h2 className="credits-title" tabIndex={-1}>Let's build something that matters.</h2>
          <p className="credits-copy">
            If something here resonated, or you're working on technology for the public good,
            I'd like to hear about it.
          </p>
          <div className="credits-mail">
            <a
              className="credits-email"
              href={`mailto:${profile.email}`}
              onClick={() => onEmail("footer")}
            >
              {profile.email}
            </a>
            <CopyEmail email={profile.email} onCopy={() => onEmail("copy")} />
          </div>
          <ul className="credits-links">
            <li>
              <ExternalLink href={profile.links.github} event="GitHub footer">
                GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.linkedin} event="LinkedIn footer">
                LinkedIn
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.itch} event="itch.io footer">
                itch.io
              </ExternalLink>
            </li>
            <li>
              <button type="button" className="text-btn" onClick={openPanel}>
                Achievements {count}/{ACHIEVEMENTS.length}
              </button>
            </li>
          </ul>
        </div>
      </footer>

      {touring ? <Tour onClose={closeTour} /> : null}
    </div>
  );
};

export default Home;
