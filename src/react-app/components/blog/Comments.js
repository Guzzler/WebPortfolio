import React, { useEffect, useRef } from "react";
import commentsConfig, { isCommentsConfigured } from "./comments.config";
import { mixpanel } from "../../../App";

const SCRIPT_SRC = "https://cusdis.com/js/cusdis.es.js";

const ensureCusdisScript = () => {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
    if (window.CUSDIS && typeof window.CUSDIS.initial === "function") {
      window.CUSDIS.initial();
    }
    return;
  }
  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};

const Comments = ({ darkMode, slug, title }) => {
  const configured = isCommentsConfigured();
  const tracked = useRef(false);

  useEffect(() => {
    if (!configured) return;
    ensureCusdisScript();
    if (!tracked.current) {
      mixpanel.track("Blog Comments Loaded", { post: slug });
      tracked.current = true;
    }
  }, [configured, slug]);

  useEffect(() => {
    if (!configured) return;
    if (typeof window === "undefined") return;
    if (window.CUSDIS && typeof window.CUSDIS.setTheme === "function") {
      window.CUSDIS.setTheme(darkMode ? "dark" : "light");
    }
  }, [darkMode, configured]);

  if (!configured) {
    const subject = encodeURIComponent(`Re: ${title}`);
    return (
      <section className="blog-comments" id="comments">
        <span className="blog-eyebrow">Discussion</span>
        <h3 className="blog-comments-heading">
          Reply, push back, or share a thread.
        </h3>
        <p className="blog-comments-body">
          Open commenting is not wired up yet. If something here landed, or if
          you disagree, I would genuinely like to hear it.
        </p>
        <div className="blog-comments-actions">
          <a
            className="blog-action"
            href={`mailto:sharangpai123@gmail.com?subject=${subject}`}
            onClick={() =>
              mixpanel.track("Blog Reply Click", {
                channel: "email",
                post: slug,
              })
            }
          >
            <i className="fa fa-envelope" aria-hidden="true"></i>
            Reply by email
          </a>
          <a
            className="blog-action"
            href="https://www.linkedin.com/in/sharang-pai/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              mixpanel.track("Blog Reply Click", {
                channel: "linkedin",
                post: slug,
              })
            }
          >
            <i className="fa fa-linkedin" aria-hidden="true"></i>
            Message on LinkedIn
          </a>
          <a
            className="blog-action"
            href="https://www.github.com/Guzzler"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              mixpanel.track("Blog Reply Click", {
                channel: "github",
                post: slug,
              })
            }
          >
            <i className="fa fa-github" aria-hidden="true"></i>
            Find me on GitHub
          </a>
        </div>
      </section>
    );
  }

  const pageUrl =
    typeof window !== "undefined" ? window.location.href : `/blog/${slug}`;

  return (
    <section className="blog-comments" id="comments">
      <span className="blog-eyebrow">Discussion</span>
      <h3 className="blog-comments-heading">Comments</h3>
      <p className="blog-comments-body">
        Leave a name and a comment. No login, replies welcome.
      </p>
      <div
        id="cusdis_thread"
        className="cusdis-mount"
        data-host={commentsConfig.host}
        data-app-id={commentsConfig.appId}
        data-page-id={slug}
        data-page-url={pageUrl}
        data-page-title={title}
        data-theme={darkMode ? "dark" : "light"}
      />
    </section>
  );
};

export default Comments;
