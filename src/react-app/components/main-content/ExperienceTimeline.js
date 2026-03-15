import React from "react";
import PropTypes from "prop-types";
import "./timeline.css";

const timelineSections = [
  {
    title: "Work",
    summary:
      "Roles where complex systems had to become usable products, not just promising demos.",
    items: [
      {
        date: "Feb 2026 - Present",
        title: "Member of Technical Staff, Product Engineering, Luma AI",
        description:
          "Working on Luma's new agentic product for image and video generation design - spanning agent orchestration, tool use, and the full-stack interfaces that make those systems practical for studio workflows.",
        technologies: "Python, React.js, Typescript",
        arcs: ["Agentic product systems", "Creative tooling"],
      },
      {
        date: "June 2024 - Feb 2026",
        title: "Founding ML Engineer, Persona AE Inc (Now Luma AI)",
        description:
          "Built core AI platform primitives for a multimodal avatar product across wellness, sales, and medical intake - owning model integration, orchestration, memory, low-latency inference, and product-layer tooling end to end.",
        technologies: "Python, React.js, SwiftUI, Typescript, FastAPI, CosmosDB",
        arcs: ["Agentic product systems", "Human-centered AI"],
      },
      {
        date: "April 2022 - Aug 2022",
        title: "Software Engineer Consultant, StepChange",
        description:
          "Helped architect product systems that made lower-carbon choices easier to understand and act on for everyday users.",
        technologies: "Python, React.js, Jest, Java, Android, AWS, Typescript",
        arcs: ["Public-interest access", "Product systems"],
      },
      {
        date: "April 2021 - March 2022",
        title: "Founding Engineer / Head of UI/UX Engineering, RedBrickAI",
        description:
          "Led frontend and UI/UX engineering for a computer vision training data platform, shaping the interaction layer while also contributing to system design and technical direction.",
        technologies: "Python, React.js, Jest, AWS, GraphQL, Typescript",
        arcs: ["Creative interaction", "AI product systems"],
      },
      {
        date: "January 2019 - March 2021",
        title: "Software Development Engineer, Instamojo Technologies",
        description:
          "Built payments and commerce products for MSMEs, including work around sachet loans, micro-finance, and UPI flows - practical software for businesses that need leverage, not complexity.",
        technologies: "Python, Javascript, React.js, Jest, Django, GoLang",
        arcs: ["Access at scale", "Full-stack product delivery"],
      },
    ],
  },
  {
    title: "Internships and research",
    summary:
      "Earlier chapters where applied ML, frontend craft, and public-interest AI started converging.",
    items: [
      {
        date: "May 2023 - Aug 2023",
        title: "Senior Machine Learning Engineering Intern, UpDuo",
        description:
          "Built AI inferencing and fine-tuning pipelines while also helping rethink the frontend architecture of the company's core edtech product.",
        technologies: "Flutter, Rust, Python, LLMs",
        arcs: ["AI learning systems", "Product prototyping"],
      },
      {
        date: "During graduate study",
        title: "AISOC research collaboration",
        description:
          "Worked with the AISOC group under Dr. Fei Fang on large language models for environmental conservation - reinforcing my interest in AI with real public-interest outcomes.",
        technologies: "Python, LLMs, Environmental conservation",
        arcs: ["Public-interest AI", "Research"],
      },
      {
        date: "May 2018 - July 2018",
        title: "Summer Intern, Microsoft Corporation",
        description:
          "Built a workplace-safety video analysis prototype using object detection, tracking, and action classification across Custom Vision, OpenCV, YOLOv3, KineticsI3D, and Keras.",
        technologies: "Python, C, C++",
        arcs: ["Applied ML", "Computer vision"],
      },
      {
        date: "May 2017 - July 2017",
        title: "Software Development Intern, Conscia Corporation",
        description:
          "Built dynamic React and Redux interfaces for a data management and enrichment platform, including schema-driven components and early frontend systems work.",
        technologies: "Javascript, React.js, Jest",
        arcs: ["Frontend systems", "Design foundations"],
      },
    ],
  },
  {
    title: "Public-interest and open source",
    summary:
      "Proof that access, usefulness, and experimentation have been durable priorities for a long time.",
    items: [
      {
        date: "April 2015",
        title: "OpenShiksha initiative",
        description:
          "OpenShiksha is a non-profit online adaptive learning platform designed to improve learning outcomes for students in underserved communities in India. I handled a large portion of the frontend build and helped shape the project vision through school pilots.",
        technologies: "Javascript, React.js, Jest, Django",
        arcs: ["Public-interest access", "Open-source building"],
        url: "https://github.com/openshiksha/openshiksha",
        linkLabel: "View OpenShiksha",
      },
      {
        date: "May 2021",
        title: "VaccinePost",
        description:
          "VaccinePost is a vaccine notification system built during the pandemic to help people in India receive location-based alerts and book appointments faster when slots opened up.",
        technologies: "Javascript, React.js, AWS Lambdas",
        arcs: ["Rapid-response utility", "Public-interest access"],
        url: "https://github.com/Guzzler/Cowin-Notification-System",
        linkLabel: "View VaccinePost",
      },
    ],
  },
];

const TechTags = ({ technologies }) => {
  const techArray = technologies.split(", ").map((tech) => tech.trim());
  return (
    <div className="tech-tags-container">
      {techArray.map((tech) => (
        <span key={tech} className="tech-tag">
          {tech}
        </span>
      ))}
    </div>
  );
};

const ArcTags = ({ arcs }) => (
  <div className="timeline-arc-row" aria-label="Builder arcs">
    {arcs.map((arc) => (
      <span key={arc} className="timeline-arc-pill">
        {arc}
      </span>
    ))}
  </div>
);

const TimelineItem = ({ item }) => (
  <li className="timeline-item">
    <div className="timeline-info">
      <span>{item.date}</span>
    </div>
    <div className="timeline-marker"></div>
    <article className="timeline-content">
      <ArcTags arcs={item.arcs} />
      <h4 className="timeline-title">{item.title}</h4>
      <p>{item.description}</p>
      {item.url ? (
        <a href={item.url} target="_blank" rel="noreferrer noopener" className="timeline-link">
          {item.linkLabel}
        </a>
      ) : null}
      <TechTags technologies={item.technologies} />
    </article>
  </li>
);

const TimelineSection = ({ section }) => (
  <>
    <li className="timeline-item period">
      <div className="timeline-info"></div>
      <div className="timeline-marker"></div>
      <div className="timeline-content">
        <h3 className="timeline-title">{section.title}</h3>
        <p className="timeline-period-copy">{section.summary}</p>
      </div>
    </li>
    {section.items.map((item) => (
      <TimelineItem key={`${section.title}-${item.title}`} item={item} />
    ))}
  </>
);

const ExperienceTimeline = () => (
  <div className="experience-timeline-shell">
    <div className="experience-timeline-intro">
      <span className="experience-timeline-label">Builder arcs in practice</span>
      <p className="experience-timeline-copy">
        The recurring thread is not a single job title. It is a pattern of
        building ambitious systems, keeping one eye on real-world usefulness,
        and treating interaction quality as part of the engineering work.
      </p>
    </div>

    <div className="container-fluid">
      <div>
        <div>
          <ul className="timeline timeline-centered">
            {timelineSections.map((section) => (
              <TimelineSection key={section.title} section={section} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

TechTags.propTypes = {
  technologies: PropTypes.string.isRequired,
};

ArcTags.propTypes = {
  arcs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

TimelineItem.propTypes = {
  item: PropTypes.shape({
    arcs: PropTypes.arrayOf(PropTypes.string).isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    linkLabel: PropTypes.string,
    technologies: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

TimelineSection.propTypes = {
  section: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        arcs: PropTypes.arrayOf(PropTypes.string).isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        linkLabel: PropTypes.string,
        technologies: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
      })
    ).isRequired,
    summary: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExperienceTimeline;
