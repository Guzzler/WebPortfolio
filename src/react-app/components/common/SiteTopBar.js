import React from "react";
import { Link, useLocation } from "react-router-dom";
import { mixpanel } from "../../../App";
import "./SiteTopBar.css";

const isHome = (pathname) => pathname === "/" || pathname === "";
const isBlog = (pathname) =>
  pathname === "/blog" || pathname.startsWith("/blog/");

const SiteTopBar = ({ darkMode, toggleDarkMode }) => {
  const { pathname } = useLocation();

  const trackNav = (target) =>
    mixpanel.track("Site Nav Click", { target });

  return (
    <header className={`site-topbar${darkMode ? " is-dark" : ""}`}>
      <div className="site-topbar-inner">
        <nav className="site-topbar-nav" aria-label="Primary">
          <Link
            to="/"
            className={`site-topbar-link${isHome(pathname) ? " is-active" : ""}`}
            onClick={() => trackNav("home")}
          >
            Home
          </Link>
          <Link
            to="/blog"
            className={`site-topbar-link${isBlog(pathname) ? " is-active" : ""}`}
            onClick={() => trackNav("blog")}
          >
            Writing
          </Link>
          <button
            type="button"
            className="site-topbar-theme"
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <i
              className={`fa ${darkMode ? "fa-sun" : "fa-moon"}`}
              aria-hidden="true"
            ></i>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default SiteTopBar;
