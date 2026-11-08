import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import BlogShell from "./BlogShell";
import Comments from "./Comments";
import Icon from "../common/Icon";
import { getPostBySlug } from "./posts";
import { formatDate } from "./format";
import { track } from "../../../analytics";
import { useAchievements } from "../../game/achievements";

const renderBlock = (block, index) => {
  switch (block.type) {
    case "pullquote":
      return (
        <blockquote key={index} className="essay-pullquote">
          <p>{block.text}</p>
        </blockquote>
      );
    case "h2":
      return (
        <h2 key={index} className="essay-h2">
          {block.text}
        </h2>
      );
    case "p":
    default:
      return <p key={index}>{block.text}</p>;
  }
};

const BackLink = ({ slug }) => (
  <Link
    to="/blog"
    className="essay-back"
    onClick={() => track("Blog Back Click", { post: slug })}
  >
    <Icon name="arrowLeft" size={16} />
    All writing
  </Link>
);

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const { unlock } = useAchievements();
  const endRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = `${post.title} | Sharang Pai`;
      track("Blog Post View", { post: post.slug });
    } else {
      track("Blog Post Missing", { slug });
    }
  }, [slug, post]);

  // Reaching the end of an essay quietly earns "Bookworm" (no toast on the blog).
  useEffect(() => {
    const end = endRef.current;
    if (!end) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        unlock("reader", { silent: true });
        track("Blog Post Finished", { post: slug });
        observer.disconnect();
      }
    });
    observer.observe(end);
    return () => observer.disconnect();
  }, [slug, unlock]);

  if (!post) {
    return (
      <BlogShell>
        <section className="essay-missing">
          <h1 className="blog-index-title">That essay isn't here.</h1>
          <p className="blog-index-lede">
            It may have been unpublished, or the link may be mistyped. Every published essay
            is listed on the writing page.
          </p>
          <BackLink slug="missing" />
        </section>
      </BlogShell>
    );
  }

  return (
    <BlogShell>
      <article className="essay">
        <BackLink slug={post.slug} />

        <header className="essay-head">
          {post.tags ? (
            <ul className="essay-tags" aria-label="Topics">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}
          <h1 className="essay-title">{post.title}</h1>
          {post.excerpt ? <p className="essay-standfirst">{post.excerpt}</p> : null}
          <div className="essay-byline">
            <span className="essay-author">Sharang Pai</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className="essay-body">{post.content.map(renderBlock)}</div>

        <div ref={endRef} className="essay-end" aria-hidden="true" />

        <Comments slug={post.slug} title={post.title} />
      </article>
    </BlogShell>
  );
};

export default BlogPost;
