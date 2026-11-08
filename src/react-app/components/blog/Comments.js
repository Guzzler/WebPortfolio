import React from "react";
import Icon from "../common/Icon";
import portrait from "../../../assets/images/sharang.jpeg";
import { track } from "../../../analytics";
import { profile } from "../../content";

// Closing block for each essay: a short author note and ways to reply.
const Comments = ({ slug, title }) => {
  const subject = encodeURIComponent(`Re: ${title}`);
  const onReply = (channel) => track("Blog Reply Click", { channel, post: slug });

  return (
    <section className="essay-reply" id="comments" aria-labelledby="reply-heading">
      <div className="essay-author-card">
        <img src={portrait} alt="" width="56" height="56" />
        <p>
          <strong>Sharang Pai</strong> is an engineer at Luma AI who works on evaluation and
          agent infrastructure for multimodal models, and has built open tools for education,
          public health and conservation since 2015.
        </p>
      </div>

      <h2 id="reply-heading" className="essay-reply-title">
        Respond to this essay
      </h2>
      <p className="essay-reply-copy">
        There's no comment box here, by choice. If this landed, or if you disagree, I'd like
        to hear from you directly.
      </p>

      <div className="essay-reply-actions">
        <a
          className="essay-action is-primary"
          href={`mailto:${profile.email}?subject=${subject}`}
          onClick={() => onReply("email")}
        >
          <Icon name="mail" size={16} />
          Reply by email
        </a>
        <a
          className="essay-action"
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onReply("linkedin")}
        >
          <Icon name="linkedin" size={15} />
          Message on LinkedIn
        </a>
      </div>
    </section>
  );
};

export default Comments;
