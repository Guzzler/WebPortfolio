//* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./BaseContent.css";
import ExperienceTimeline from "./ExperienceTimeline";
import { isSmallDevice } from "../../../common/utils/index";
import sharangPortrait from "../../../assets/images/sharang.jpeg";
import GameGallery from "./GameGallery";
import SiteTopBar from "../common/SiteTopBar";
import useDarkMode from "../common/useDarkMode";
import { mixpanel } from "../../../App";

const profileSignals = [
  "Agentic systems",
  "Social-impact AI",
  "Open-source builder",
  "Games and board games",
];

const controlRoomHighlights = [
  {
    label: "Currently building",
    title: "Agentic creative tooling at Luma AI",
    detail:
      "I work end to end on product engineering for image and video design workflows, from orchestration and tool use to shipped UI.",
  },
  {
    label: "Care about",
    title: "AI with public-interest gravity",
    detail:
      "OpenShiksha, VaccinePost, and AISOC all reflect the same pull: technology should widen access, not just polish demos.",
  },
  {
    label: "Play with",
    title: "Games, sports, and systems feel",
    detail:
      "Games are where I get to play with feel, feedback, and small interactive ideas for fun; sports and board games keep the competitive side alive.",
  },
];

const proofPoints = [
  {
    eyebrow: "Now",
    value: "Luma AI",
    note: "Building agentic creative tooling for image and video workflows.",
  },
  {
    eyebrow: "Training",
    value: "Carnegie Mellon University",
    note: "MS in Artificial Intelligence and Innovation, 2024.",
  },
  {
    eyebrow: "Public interest",
    value: "OpenShiksha",
    note: "Education-access work shaped by real school pilots.",
  },
  {
    eyebrow: "Rapid response",
    value: "VaccinePost",
    note: "A practical tool built during the pandemic for vaccine notifications.",
  },
];

const builderModes = [
  {
    eyebrow: "Mode 01",
    title: "Build AI products",
    summary:
      "I like shipping systems where models, tool use, interfaces, and product judgment all have to hold together.",
    examples: [
      "At Luma AI I work on agentic creative tooling for image and video workflows.",
      "At Persona I helped build avatar systems across memory, orchestration, low-latency inference, and application tooling.",
      "Work at StepChange and RedBrickAI kept me close to real user problems in climate and computer vision products.",
    ],
    stack: ["Python", "Typescript", "React/Redux", "FastAPI", "SwiftUI"],
  },
  {
    eyebrow: "Mode 02",
    title: "Build for access",
    summary:
      "The projects that stick with me are usually the ones trying to widen access, improve decisions, or matter beyond a polished demo.",
    examples: [
      "OpenShiksha was built as an open-source education platform for underserved students and real school pilots.",
      "VaccinePost came out of the pandemic as a practical notification system for vaccine availability in India.",
      "AISOC research under Dr. Fei Fang focused that same instinct on environmental conservation work with LLMs.",
    ],
    stack: ["Django", "AWS Lambdas", "LLMs", "Low-resource design"],
  },
  {
    eyebrow: "Mode 03",
    title: "Build for play",
    summary:
      "Games are where I rehearse pacing, interaction feel, and readable systems without the pressure of a roadmap.",
    examples: [
      "Unity projects like Zen Garden and Divided Destiny are small labs for mechanics, tone, and feedback loops.",
      "Sports and board games keep me thinking about balance, competition, and how people read systems quickly.",
      "That playful practice feeds back into product taste: onboarding, delight, and interaction rhythm matter.",
    ],
    stack: ["Unity", "LibGDX", "Interaction design", "Rapid prototyping"],
  },
];

const toolkitClusters = [
  {
    label: "Core stack",
    items: ["Python", "Typescript", "React/Redux", "SQL", "NodeJS"],
  },
  {
    label: "ML and product surfaces",
    items: ["LLMs", "Keras", "OpenCV", "Flask", "Django", "SwiftUI"],
  },
  {
    label: "Creative prototyping",
    items: ["Unity", "Flutter", "Socket.io", "LibGDX", "Board-game thinking"],
  },
];

const BaseContent = () => {
  const [loaded, setLoaded] = useState(false);
  const [darkMode, toggleDarkMode] = useDarkMode();
  const smallDevice = isSmallDevice();

  useEffect(() => {
    const img = new Image();
    img.src = sharangPortrait;
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true);
  }, []);

  const trackSocialClick = (platform) => {
    mixpanel.track("Social Link Click", { platform });
  };

  const trackIntroAction = (target) => {
    mixpanel.track("Intro Action Click", { target });
  };

  if (!loaded) {
    return (
      <div className={`loading-overlay ${darkMode ? "dark-mode" : ""}`}>
        <div className="loading-container">
          <div className="joystick"></div>
          <div className="loading-text">Loading profile</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`home-shell${darkMode ? " dark-mode" : ""}`}>
      <SiteTopBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Row className="width-100 height-min-100">
      <Col
        span={4}
        md={8}
        xl={6}
        sm={24}
        xs={24}
        xxl={4}
        className="left-column inter-font"
      >
        <div className="profile-rail">
          <div className="loading-screen">
            <div className="portrait-wrapper">
              <div className="portrait-ring"></div>
              <div
                className="portrait"
                style={{
                  backgroundImage: `url(${sharangPortrait})`,
                }}
              />
            </div>
          </div>

          <div className="cv-text-details">
            <div className="profile-status-pill">Member of Technical Staff at Luma AI</div>
            <div className="cv-name">Sharang Pai</div>
            <div className="cv-tagline">AI engineer, product builder, game maker after hours</div>
            <p className="profile-summary">
              I like ambitious AI systems, grounded product execution, and technology
              that can matter outside the usual demo loop.
            </p>

            <div className="signal-matrix" aria-label="Key identity signals">
              {profileSignals.map((signal) => (
                <span key={signal} className="signal-chip">
                  {signal}
                </span>
              ))}
            </div>

            <div className="profile-data-card">
              <div className="profile-data-row">
                <span className="profile-data-label">Training</span>
                <span className="profile-data-value">CMU MS AI and Innovation</span>
              </div>
              <div className="profile-data-row">
                <span className="profile-data-label">Motivation</span>
                <span className="profile-data-value">
                  Socially relevant technology for underserved communities
                </span>
              </div>
              <div className="profile-data-row">
                <span className="profile-data-label">Playground</span>
                <span className="profile-data-value">
                  Unity projects, sports, and board-game nights
                </span>
              </div>
            </div>

            <div className="cv-caption">Say hello</div>
            <a
              className="mailtolink"
              href="mailto:sharangpai123@gmail.com"
              onClick={() => mixpanel.track("Email Click")}
            >
              sharangpai123@gmail.com
            </a>

            <div className="connect-button-container">
              <ul className="connect-buttons">
                <li className="connect-button">
                  <a
                    className="connect-link"
                    href="https://www.github.com/Guzzler"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackSocialClick("GitHub")}
                    aria-label="GitHub"
                  >
                    <i className="fa fa-github" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="connect-button">
                  <a
                    className="connect-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/sharang-pai/"
                    onClick={() => trackSocialClick("LinkedIn")}
                    aria-label="LinkedIn"
                  >
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="connect-button">
                  <a
                    className="connect-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://sharangpai.me"
                    onClick={() => trackSocialClick("Website")}
                    aria-label="Website"
                  >
                    <i className="fa fa-globe" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Col>

      <Col
        md={16}
        xl={18}
        xxl={20}
        sm={24}
        xs={24}
        className="resume-main-content inter-font"
        style={
          smallDevice
            ? { minHeight: "calc(100vh - 60px)" }
            : { height: "calc(100vh - 60px)" }
        }
      >
        <div className="resume-content-shell">
          <header className="control-room-hero" id="top">
            <div className="control-room-grid">
              <div className="control-room-story">
                <span className="control-room-eyebrow">
                  AI engineer / product builder / open-source minded / socially motivated
                </span>
                <h1 className="control-room-title">
                  I build AI products that feel ambitious, socially impactful, and deeply human-centered.
                </h1>
                <p className="control-room-copy">
                  Today I am on product engineering at{" "}
                  <a
                    href="https://lumalabs.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      mixpanel.track("External Link", { destination: "Luma AI Hero" })
                    }
                  >
                    Luma AI
                  </a>{" "}
                  after founding-ML work at{" "}
                  <a
                    href="https://persona-ai.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      mixpanel.track("External Link", { destination: "Persona AI Hero" })
                    }
                  >
                    Persona
                  </a>
                  . I am most energized by agentic systems, socially relevant
                  technology, low-resource design, and interfaces that make hard
                  problems feel approachable.
                </p>

                <div className="control-room-chip-row" aria-label="Focus areas">
                  {[
                    "Agentic product systems",
                    "AI for real-world access",
                    "Open-source public-interest work",
                    "Games as a design lab",
                  ].map((item) => (
                    <span key={item} className="control-room-chip">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="intro-actions">
                  <a
                    className="intro-action"
                    href="#experience"
                    onClick={() => trackIntroAction("experience")}
                  >
                    View experience
                  </a>
                  <a
                    className="intro-action"
                    href="#games"
                    onClick={() => trackIntroAction("games")}
                  >
                    Explore games
                  </a>
                  <a
                    className="intro-action"
                    href="mailto:sharangpai123@gmail.com"
                    onClick={() => trackIntroAction("email")}
                  >
                    Start a conversation
                  </a>
                </div>
              </div>

              <div className="control-room-panel-grid">
                {controlRoomHighlights.map((highlight) => (
                  <article key={highlight.title} className="control-room-panel">
                    <span className="control-room-panel-label">{highlight.label}</span>
                    <h2>{highlight.title}</h2>
                    <p>{highlight.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="proof-grid" aria-label="Portfolio proof points">
              {proofPoints.map((point) => (
                <article key={point.value} className="proof-card">
                  <span className="proof-eyebrow">{point.eyebrow}</span>
                  <div className="proof-value">{point.value}</div>
                  <p>{point.note}</p>
                </article>
              ))}
            </div>
          </header>

          <Row className="resume-sections-row">
            <Col md={16} sm={24} xs={24} className="resume-first-col">
              <section id="about">
                <h2 className="resume-caption">About</h2>
                <p className="section-lede">
                  Serious engineering, social relevance, and a little creative
                  stubbornness are the through-lines.
                </p>
                <div className="about-content">
                  <p>
                    I am a computer scientist who likes building ambitious systems
                    without losing sight of the people using them. This portfolio is a
                    map of the work, experiments, and motivations that keep those
                    instincts aligned.
                  </p>
                  <p>
                    I completed my Master&apos;s degree in Artificial Intelligence and
                    Innovation at Carnegie Mellon University (2022 - 2024). Before
                    joining Luma AI, I was a founding ML engineer at{" "}
                    <a
                      href="https://persona-ai.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        mixpanel.track("External Link", { destination: "Persona AI" })
                      }
                    >
                      Persona AI
                    </a>
                    , which was acquired by{" "}
                    <a
                      href="https://lumalabs.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        mixpanel.track("External Link", { destination: "Luma AI" })
                      }
                    >
                      Luma AI
                    </a>
                    . I also worked with the{" "}
                    <a
                      href="https://feifang.info/ai-for-social-good/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        mixpanel.track("External Link", { destination: "AISOC" })
                      }
                    >
                      AISOC
                    </a>{" "}
                    group under Dr. Fei Fang on large language models for
                    environmental conservation, and I have spent years building
                    public-interest projects like{" "}
                    <a
                      href="https://github.com/openshiksha/openshiksha/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        mixpanel.track("External Link", { destination: "OpenShiksha" })
                      }
                    >
                      OpenShiksha
                    </a>{" "}
                    and VaccinePost. Long term, I want to build socially relevant
                    technology that meaningfully expands access and opportunity.
                  </p>
                </div>
              </section>

              <section id="experience">
                <h2 className="resume-caption">Experience</h2>
                <p className="section-lede">
                  So far it has been a mix of product engineering, founding-team
                  work, research, and open-source projects across AI, climate,
                  fintech, and education.
                </p>
                <ExperienceTimeline />
              </section>

              {smallDevice ? <GameGallery /> : null}
            </Col>

            <Col md={8} sm={24} xs={24} className="resume-second-col">
              <section id="education">
                <h2 className="resume-caption">Education</h2>
                <p className="section-lede">
                  Formal AI training layered on systems, entrepreneurship, and HCI.
                </p>

                <div className="education-card">
                  <div className="degree">MS. Artificial Intelligence and Innovation</div>
                  <div className="school">Carnegie Mellon University</div>
                  <div className="year-badge">2022 - 2024</div>
                  <div className="coursework">
                    <span className="coursework-label">Selected coursework: </span>
                    Machine Learning; Artificial Intelligence and Future Markets;
                    Software for Startups; Intro to Deep Learning; Advanced Natural
                    Language Processing; Large Language Models; On Device Machine
                    Learning.
                  </div>
                </div>

                <div className="education-card">
                  <div className="degree">BTech. Computers and Communication Engineering</div>
                  <div className="school">Manipal Institute of Technology (9.64/10 GPA)</div>
                  <div className="year-badge">2015 - 2019</div>
                  <div className="coursework">
                    <span className="coursework-label">Selected coursework: </span>
                    Operating Systems; Artificial Intelligence; Pattern Recognition;
                    Computer Architecture; Embedded System Design; Neural Networks and
                    Fuzzy Logic; Natural Computing; Human Computer Interaction;
                    Computer Vision.
                  </div>
                </div>

                <div className="education-card">
                  <div className="degree">High School</div>
                  <div className="school">Delhi Public School, Pune</div>
                  <div className="year-badge">2003 - 2015</div>
                  <div className="description">
                    Graduated as the head of the student council body governing over
                    2500 students. Received multiple scholars honours, captained the
                    basketball team for a brief period, qualified for the Indian
                    National Informatics Olympiad (2012/2013), and participated in
                    Google Code-in (2013).
                  </div>
                </div>
              </section>

              <section id="builder-modes">
                <h2 className="resume-caption">Builder Modes</h2>
                <p className="section-lede">
                  The through-line is not just what I know. It is the kinds of
                  systems I keep choosing to build.
                </p>

                <div className="builder-mode-grid">
                  {builderModes.map((mode) => (
                    <article key={mode.title} className="builder-mode-card">
                      <div className="builder-mode-header">
                        <span className="builder-mode-eyebrow">{mode.eyebrow}</span>
                        <h3>{mode.title}</h3>
                      </div>
                      <p className="builder-mode-summary">{mode.summary}</p>
                      <ul className="builder-mode-list">
                        {mode.examples.map((example) => (
                          <li key={example}>{example}</li>
                        ))}
                      </ul>
                      <div className="builder-mode-stack">
                        {mode.stack.map((item) => (
                          <span key={item} className="builder-mode-chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>

                <div className="builder-toolkit">
                  <div className="builder-toolkit-header">
                    <span className="builder-toolkit-eyebrow">Support system</span>
                    <p>
                      Technical range still matters, but I care most about which
                      tools move each mode forward without turning the page into a
                      generic skills dump.
                    </p>
                  </div>

                  <div className="builder-toolkit-grid">
                    {toolkitClusters.map((cluster) => (
                      <div key={cluster.label} className="builder-toolkit-cluster">
                        <span className="builder-toolkit-label">{cluster.label}</span>
                        <div className="builder-toolkit-tags">
                          {cluster.items.map((item) => (
                            <span key={item} className="skill-tag">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="builder-bridge">
                  <div>
                    <span className="builder-bridge-eyebrow">Why games live here</span>
                    <p>
                      The Games section is not a side quest. It is where pacing,
                      tension, onboarding, and interaction feel stay sharp.
                    </p>
                  </div>
                  <a
                    className="builder-bridge-link"
                    href="#games"
                    onClick={() => trackIntroAction("builder-modes-games")}
                  >
                    See the play lab
                  </a>
                </div>
              </section>
            </Col>
          </Row>

          {!smallDevice ? <GameGallery /> : null}
        </div>
      </Col>
      </Row>
    </div>
  );
};

BaseContent.propTypes = {
  base: PropTypes.object.isRequired,
};

const mapStateToProps = ({ base }) => {
  return {
    base,
  };
};

export default connect(mapStateToProps, {})(BaseContent);
