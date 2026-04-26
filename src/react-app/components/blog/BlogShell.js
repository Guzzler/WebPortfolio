import React from "react";
import SiteTopBar from "../common/SiteTopBar";
import "./Blog.css";

const BlogShell = ({ children, darkMode, toggleDarkMode }) => {
  return (
    <div className={`blog-shell${darkMode ? " is-dark" : ""}`}>
      <SiteTopBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="blog-main">{children}</main>
    </div>
  );
};

export default BlogShell;
