import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BlogShell from "./BlogShell";
import Comments from "./Comments";
import useDarkMode from "../common/useDarkMode";
import { getPostBySlug } from "./posts";
import { mixpanel } from "../../../App";

const formatDate = (iso) => {
  try {
    const [year, month, day] = iso.split("T")[0].split("-").map(Number);

    if (!year || !month || !day) return iso;

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(year, month - 1, day));
  } catch (e) {
    return iso;
  }
};
const renderBlock = (block, index) => {
  switch (block.type) {
    case "pullquote":
      return (
        <blockquote key={index} className="blog-pullquote">
          {block.text}
        </blockquote>
      );
    case "h2":
      return (
        <h2 key={index} className="blog-h2">
          {block.text}
        </h2>
      );
    case "p":
    default:
      return (
        <p key={index} className="blog-paragraph">
          {block.text}
        </p>
      );
  }
};

const NotFoundBody = () => (
  <section className="blog-hero">
    <span className="blog-eyebrow">Missing</span>
    <h1 className="blog-hero-title">That essay does not exist yet.</h1>
    <p className="blog-hero-lede">
      It might be unpublished, or the URL may have shifted. Head back to the
      writing shelf and pick another one.
    </p>
    <Link
      to="/blog"
      className="blog-action"
      onClick={() => mixpanel.track("Blog Back Click", { post: "missing" })}
    >
      <i className="fa fa-arrow-left" aria-hidden="true"></i>
      Back to all posts
    </Link>
  </section>
);

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const [darkMode, toggleDarkMode] = useDarkMode();

  useEffect(() => {
    if (post) {
      mixpanel.track("Blog Post View", { post: post.slug });
    } else {
      mixpanel.track("Blog Post Missing", { slug });
    }
    window.scrollTo(0, 0);
  }, [slug, post]);

  if (!post) {
    return (
      <BlogShell darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <NotFoundBody />
      </BlogShell>
    );
  }

  return (
    <BlogShell darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <article className="blog-article">
        <Link
          to="/blog"
          className="blog-back-link"
          onClick={() => mixpanel.track("Blog Back Click", { post: post.slug })}
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
          Back to writing
        </Link>

        <header className="blog-article-header">
          <h1 className="blog-article-title">{post.title}</h1>
          <div className="blog-article-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="blog-meta-divider">·</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className="blog-article-body">
          {post.content.map((block, index) => renderBlock(block, index))}
        </div>

        <hr className="blog-divider" />

        <Comments
          darkMode={darkMode}
          slug={post.slug}
          title={post.title}
        />
      </article>
    </BlogShell>
  );
};

export default BlogPost;
