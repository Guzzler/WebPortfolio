import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { track } from "../../../analytics";
import { useTheme } from "../../theme";
import { ACHIEVEMENTS, useAchievements } from "../../game/achievements";
import Icon, { PixelIcon } from "./Icon";
import "./SiteTopBar.css";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "impact", label: "Impact" },
  { id: "games", label: "Games" },
];

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame;
    const update = () => {
      frame = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return progress;
};

// variant "game" (home) shows an XP bar; "reading" (blog) shows plain reading progress.
const SiteTopBar = ({ active, variant = "game" }) => {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const onBlog = pathname.startsWith("/blog");
  const { theme, toggleTheme } = useTheme();
  const { unlocked, unlock, openPanel } = useAchievements();
  const progress = useScrollProgress();
  const navRef = useRef(null);
  const [indicator, setIndicator] = useState(null);

  const current = onBlog ? "writing" : active;

  useLayoutEffect(() => {
    const nav = navRef.current;
    const el = nav && nav.querySelector(`[data-nav="${current}"]`);
    if (!el) {
      setIndicator(null);
      return;
    }
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [current]);

  const trackNav = (target) => track("Site Nav Click", { target });
  const count = Object.keys(unlocked).length;

  const onTheme = () => {
    toggleTheme();
    unlock("night");
  };

  return (
    <header className={`hud hud-${variant}`}>
      <div className="hud-inner">
        <Link to="/" className="hud-home" onClick={() => trackNav("home")}>
          <span className="hud-mark" aria-hidden="true">SP</span>
          <span className="hud-name">Sharang Pai</span>
        </Link>

        <nav className="hud-nav" aria-label="Primary" ref={navRef}>
          {SECTIONS.map((s) =>
            onHome ? (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-nav={s.id}
                className={`hud-link${current === s.id ? " is-active" : ""}`}
                aria-current={current === s.id ? "true" : undefined}
                onClick={() => trackNav(s.id)}
              >
                {s.label}
              </a>
            ) : (
              <Link
                key={s.id}
                to={`/#${s.id}`}
                data-nav={s.id}
                className="hud-link"
                onClick={() => trackNav(s.id)}
              >
                {s.label}
              </Link>
            )
          )}
          <Link
            to="/blog"
            data-nav="writing"
            className={`hud-link${current === "writing" ? " is-active" : ""}`}
            aria-current={onBlog ? "page" : undefined}
            onClick={() => trackNav("blog")}
          >
            Writing
          </Link>
          {indicator ? (
            <span
              className="hud-indicator"
              style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
              aria-hidden="true"
            />
          ) : null}
        </nav>

        <div className="hud-tools">
          <button
            type="button"
            className="hud-trophies"
            data-magnet
            onClick={openPanel}
            aria-label={`Achievements: ${count} of ${ACHIEVEMENTS.length} unlocked`}
          >
            <PixelIcon name="trophy" size={14} />
            <span key={count} className="hud-count">
              {count}/{ACHIEVEMENTS.length}
            </span>
          </button>
          <button
            type="button"
            className="hud-theme"
            onClick={onTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className={`hud-orb is-${theme}`} aria-hidden="true">
              <Icon name="sun" size={17} className="hud-sun" />
              <Icon name="moon" size={16} className="hud-moon" />
            </span>
          </button>
        </div>
      </div>

      <div className="hud-bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  );
};

export default SiteTopBar;
