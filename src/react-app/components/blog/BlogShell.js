import React from "react";
import SiteTopBar from "../common/SiteTopBar";
import "./Blog.css";

const BlogShell = ({ children }) => (
  <div className="blog-shell">
    <SiteTopBar variant="reading" />
    <main className="blog-main">{children}</main>
  </div>
);

export default BlogShell;
