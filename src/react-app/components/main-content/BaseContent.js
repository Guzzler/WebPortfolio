//* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./BaseContent.css";
import ExperienceTimeline from "./ExperienceTimeline";
import { isSmallDevice } from "../../../common/utils/index";
import portrait from "../../../assets/images/portrait.png";
import sharangPortrait from "../../../assets/images/sharang.jpeg";
import GameGallery from "./GameGallery";

const BaseContent = () => {
  const [loaded, setLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const smallDevice = isSmallDevice();

  useEffect(() => {
    const img = new Image();
    img.src = portrait;
    img.onload = () => setLoaded(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!loaded) {
    return (
      <div className="loading-overlay">
        <div className="loading-container">
          <div className="joystick"></div>
          <div className="loading-text">Loading profile</div>
        </div>
      </div>
    );
  }

  const programmingLanguages = ["Python", "C++", "Java", "SQL", "HTML", "CSS", "Javascript", "XML", "Typescript", "Golang"];
  const tools = ["React/Redux", "Flutter", "Flask", "Django", "OpenCV", "NodeJS", "Android", "Socket.io", "Keras", "LibGdx", "Unity", "Ipython", "SwiftUI"];
  const interests = ["Deep Learning", "Artificial Intelligence", "Social Entrepreneurship", "Human Computer Interaction", "Low Resource System Design", "Mental Health Technology"];

  const hobbies = [
    { icon: "fa-gamepad", text: "Building Games" },
    { icon: "fa-futbol", text: "Football/Basketball" },
    { icon: "fa-trophy", text: "League of Legends" },
    { icon: "fa-desktop", text: "PC Gaming" },
    { icon: "fa-tv", text: "Watching Sports" },
    { icon: "fa-chess", text: "Playing Board Games" }
  ];

  return (
    <Row className={`width-100 height-min-100 ${darkMode ? 'dark-mode' : ''}`}>
      <Col
        span={4}
        md={8}
        xl={6}
        sm={24}
        xs={24}
        xxl={4}
        className="left-column inter-font f16 text-white"
      >
        <button
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          <i className={`fa ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>

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
          <div className="cv-name">Sharang Pai</div>
          <div className="cv-tagline">Building AI for the future</div>

          <div className="cv-caption">Focus</div>
          <div className="cv-focus">Computer Science / Artificial Intelligence</div>

          <div className="cv-caption">Say Hello</div>
          <div>
            <a
              className="text-white mailtolink"
              href="mailto:sharangpai123@gmail.com"
            >
              sharangpai123@gmail.com
            </a>
          </div>

          <div className="connect-button-container">
            <ul className="connect-buttons">
              <li className="connect-button">
                <a
                  className="connect-link"
                  href="https://www.github.com/Guzzler"
                  target="_blank"
                  rel="noopener noreferrer"
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
                >
                  <i className="fa fa-globe" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
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
        style={smallDevice ? { minHeight: "100vh" } : { height: "100vh" }}
      >
        <Row>
          <Col md={16} sm={24} xs={24} className="resume-first-col">
            <div className="resume-caption">About</div>
            <div className="about-content">
              <p>
                I'm a computer scientist interested in the intersection of
                information technology and data science for socially relevant
                applications. This webpage is an attempt to structure some of my
                ideas and projects. Feel free to get in touch if you're
                interested in my work or share common interests!
              </p>
              <p>
                I recently graduated with a Master's degree in Artificial
                Intelligence and Innovation from Carnegie Mellon University
                (2022 - 2024). I am currently working as a founding engineer at
                Persona AI in San Francisco, CA. Some of our early work can be
                found{" "}
                <a
                  href="https://persona-ai.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                . Previously, I worked as a research assistant at the{" "}
                <a
                  href="https://feifang.info/ai-for-social-good/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AISOC
                </a>{" "}
                group under Dr. Fei Fang, focusing on using large language
                models for environmental conservation efforts. I've spent the
                last few years working on various projects, including an
                open-source educational initiative for underserved students
                called{" "}
                <a
                  href="https://github.com/openshiksha/openshiksha/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenShiksha
                </a>
                . My ultimate purpose is to become a socially relevant
                technological entrepreneur and use innovative technology to
                bridge the socio-economic gap for the underserved.
              </p>
            </div>

            <div className="resume-caption">Experience</div>
            <ExperienceTimeline />
            {smallDevice ? <GameGallery /> : null}
          </Col>

          <Col md={8} sm={24} xs={24} className="resume-second-col">
            <div className="resume-caption">Education</div>

            <div className="education-card">
              <div className="degree">MS. Artificial Intelligence and Innovation</div>
              <div className="school">Carnegie Mellon University</div>
              <div className="year-badge">2022 - 2024</div>
              <div className="coursework">
                <span className="coursework-label">Selected Coursework: </span>
                Machine Learning; Artificial Intelligence and Future Markets; Software for Startups; Intro to Deep Learning; Advanced Natural Language Processing; Large Language Models; On Device Machine Learning.
              </div>
            </div>

            <div className="education-card">
              <div className="degree">BTech. Computers and Communication Engineering</div>
              <div className="school">Manipal Institute of Technology (9.64/10 GPA)</div>
              <div className="year-badge">2015 - 2019</div>
              <div className="coursework">
                <span className="coursework-label">Selected Coursework: </span>
                Operating Systems; Artificial Intelligence; Pattern Recognition; Computer Architecture; Embedded System Design; Neural Networks and Fuzzy Logic; Natural Computing; Human Computer Interaction; Computer Vision.
              </div>
            </div>

            <div className="education-card">
              <div className="degree">High School</div>
              <div className="school">Delhi Public School, Pune</div>
              <div className="year-badge">2003 - 2015</div>
              <div className="description">
                Graduated as the head of the student council body governing over 2500 students. Received multiple scholars honours (given for academic excellence) and was part of both the basketball and football varsity teams, having captained the basketball team for a brief period. Qualified for the Indian National Informatics Olympiad (2012/2013) and also participated in Google Code-in (2013).
              </div>
            </div>

            <div className="resume-caption">Technical</div>

            <div className="skills-section">
              <div className="skills-category">
                <span className="skills-category-label">Programming Languages</span>
                <div className="skill-tags">
                  {programmingLanguages.map((lang, index) => (
                    <span key={index} className="skill-tag">{lang}</span>
                  ))}
                </div>
              </div>

              <div className="skills-category">
                <span className="skills-category-label">Tools & Frameworks</span>
                <div className="skill-tags">
                  {tools.map((tool, index) => (
                    <span key={index} className="skill-tag">{tool}</span>
                  ))}
                </div>
              </div>

              <div className="skills-category">
                <span className="skills-category-label">Interests</span>
                <div className="skill-tags">
                  {interests.map((interest, index) => (
                    <span key={index} className="skill-tag">{interest}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="resume-caption">In My Down Time</div>
            <div className="hobbies-grid">
              {hobbies.map((hobby, index) => (
                <div key={index} className="hobby-item">
                  <i className={`fa ${hobby.icon} hobby-icon`}></i>
                  <span>{hobby.text}</span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        {!smallDevice ? (
          <Row>
            <GameGallery />
          </Row>
        ) : null}
      </Col>
    </Row>
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
