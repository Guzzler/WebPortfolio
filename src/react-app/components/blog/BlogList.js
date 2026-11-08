import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BlogShell from "./BlogShell";
import { getAllPosts } from "./posts";
import { formatDate } from "./format";
import { track } from "../../../analytics";

const BlogList = () => {
  const posts = getAllPosts();

  useEffect(() => {
    document.title = "Writing | Sharang Pai";
    track("Blog List View");
    window.scrollTo(0, 0);
  }, []);

  return (
    <BlogShell>
      <header className="blog-index-head">
        <h1 className="blog-index-title">Writing</h1>
        <p className="blog-index-lede">
          Essays on artificial intelligence, technology, and the choices that come with
          building it. Written slowly, published rarely.
        </p>
      </header>

      <ol className="blog-index" aria-label="All essays">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="blog-entry"
              onClick={() => track("Blog Post Click", { post: post.slug })}
            >
              <span className="blog-entry-meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>{post.readingTime}</span>
              </span>
              <span className="blog-entry-title">{post.title}</span>
              <span className="blog-entry-excerpt">{post.excerpt}</span>
              <span className="blog-entry-cta">Read essay</span>
            </Link>
          </li>
        ))}
      </ol>
    </BlogShell>
  );
};

export default BlogList;
