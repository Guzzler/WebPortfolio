import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BlogShell from "./BlogShell";
import useDarkMode from "../common/useDarkMode";
import { getAllPosts } from "./posts";
import { mixpanel } from "../../../App";

const formatDate = (iso) => {
  try {
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    return iso;
  }
};

const BlogList = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const posts = getAllPosts();

  useEffect(() => {
    mixpanel.track("Blog List View");
    window.scrollTo(0, 0);
  }, []);

  return (
    <BlogShell darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <section className="blog-list" aria-label="All posts">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="blog-row"
            onClick={() =>
              mixpanel.track("Blog Post Click", { post: post.slug })
            }
          >
            <div className="blog-row-meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="blog-meta-divider">·</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="blog-row-title">{post.title}</h2>
            <p className="blog-row-excerpt">{post.excerpt}</p>
          </Link>
        ))}
      </section>
    </BlogShell>
  );
};

export default BlogList;
