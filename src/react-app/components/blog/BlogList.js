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
      <section className="blog-hero">
        <span className="blog-eyebrow">Writing</span>
        <h1 className="blog-hero-title">
          Long-form notes on AI, products, and the systems they sit inside.
        </h1>
        <p className="blog-hero-lede">
          A slow-paced shelf of essays. The work is mostly engineering and
          product, but the questions almost always end up larger than that:
          where talent goes, how systems concentrate, what stays
          human-centered when capability stops being the bottleneck.
        </p>
      </section>

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
            {post.tags && post.tags.length > 0 ? (
              <div className="blog-row-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-row-tag">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </Link>
        ))}
      </section>
    </BlogShell>
  );
};

export default BlogList;
