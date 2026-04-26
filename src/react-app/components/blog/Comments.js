import React from "react";
import { mixpanel } from "../../../App";

const Comments = ({ slug, title }) => {
  const subject = encodeURIComponent(`Re: ${title}`);

  return (
    <section className="blog-comments" id="comments">
      <span className="blog-eyebrow">Discussion</span>
      <h3 className="blog-comments-heading">
        Reply, push back, or share a thread.
      </h3>
      <p className="blog-comments-body">
        I’m not running an open comment box here because I’d rather keep the
        discussion personal and spam-free. If something here landed, or if you
        disagree, I would genuinely like to hear it.
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
};

export default Comments;