/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./BaseContent.css";
import ExperienceTimeline from "./ExperienceTimeline";
import { isSmallDevice } from "../../../common/utils/index";

const BaseContent = () => {
  const smallDevice = isSmallDevice();
  return (
    <Row className="width-100 height-min-100 background-white">
      <Col
        span={4}
        md={8}
        xl={6}
        sm={24}
        xs={24}
        xxl={4}
        className="left-column background-blue roboto-font f18 text-white"
      >
        <div className="loading-screen">
          <div
            className="portrait"
            style={{
              backgroundImage: `url('https://sharangpai.me/static/media/portrait.4f21b58b.png')`,
            }}
          />
        </div>
        <div className="text-left cv-text-details">
          <div className="caption f14 text-green cv-caption">Name</div>
          <div>Sharang Pai</div>
          <div className="caption f14 text-green cv-caption">Focus</div>
          <div>Computer Science / Artificial Intelligence </div>
          <div className="caption f14 text-green cv-caption">Say Hello</div>
          <div>
            <a
              className="text-white mailtolink"
              href="mailto:sharangpai123@gmail.com"
            >
              sharangpai123@gmail.com
            </a>
          </div>
          <div className="caption f14 text-green cv-caption">Connect</div>
          <div>
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
        </div>
      </Col>
      <Col
        md={16}
        xl={18}
        xxl={20}
        sm={24}
        xs={24}
        className="resume-main-content roboto-font"
        style={smallDevice ? { minHeight: "100vh" } : { height: "100vh" }}
      >
        <Row>
          <Col md={16} sm={24} xs={24} className="resume-first-col">
            <div className="caption f24 text-green resume-caption">About </div>
            <div className="f14 text-black">
              <div className="padding-half--ends">
                I'm a computer scientist interested in the intersection of
                information technology and data science for socially relevant
                applications. This webpage is an attempt to structure some of my
                ideas and projects. Feel free to get in touch if you're
                interested in my work or share common interests!
              </div>
              <div className="padding-half--ends">
                {" "}
                I am currently a graduate student at Carnegie Mellon University
                pursuing a masters in artificial intelligence and innovation.
                I've spent the last few years working on various projects
                including an open source educational initiative for underserved
                students called OpenShiksha. My ultimate purpose is to become a
                socially relevant technological entrepreneur, and use innovative
                technology to bridge the socio-economic gap for the underserved.
              </div>
            </div>
            <div className="caption f24 text-green resume-caption">
              EXPERIENCE{" "}
            </div>

            <ExperienceTimeline />
          </Col>
          <Col md={8} sm={24} xs={24} className="resume-second-col">
            <div className="caption f24 text-green resume-caption">
              EDUCATION{" "}
            </div>
            <div className="f14 text-black">
              <div className="padding--ends">
                {" "}
                <strong>MS. Artificial Intelligence and Innovation </strong> /
                Carnegie Mellon University
                <div className="text-light-grey">2022 - Current</div>
                <div>
                  <strong>Selected Coursework:</strong>{" "}
                  <span className="italics">
                    Machine Learning; Artificial Intelligence and Future
                    Markets; Foundations of Computational Data Science; Software
                    for Startups; Intro to Deep Learning; Advanced Natural
                    Language Processing.{" "}
                  </span>
                </div>
              </div>
              <div className="padding--ends">
                {" "}
                <strong>
                  BTech. Computers and Communication Engineering{" "}
                </strong>{" "}
                / Manipal Institute of Technology (9.64/10 GPA)
                <div className="text-light-grey">2015 - 2019</div>
                <div>
                  <strong>Selected Coursework:</strong>{" "}
                  <span className="italics">
                    Operating Systems; Artificial Intelligence; Pattern
                    Recognition; Computer Architecture; Embedded System Design;
                    Neural Networks and Fuzzy Logic; Natural Computing; Human
                    Computer Interaction; Computer Vision.{" "}
                  </span>
                </div>
              </div>
              <div className="padding--ends">
                {" "}
                <strong>High School </strong> / Delhi Public School, Pune
                <div className="text-light-grey">2003 - 2015</div>
                <div>
                  Graduated as the head of the student council body governing
                  over 2500 students. Received multiple scholars honours (given
                  for academic excellence) and was part of both the basketball
                  and football varsity teams, having captained the basketball
                  team for a brief period. Qualified for the Indian National
                  Informatics Olympiad (2012/2013) and also participated in
                  Google Code-in (2013).
                </div>
              </div>
            </div>
            <div className="caption f24 text-green resume-caption">
              Technical{" "}
            </div>
            <div className="f16 text-black">
              <div className="padding--ends">
                <span className="strong">Programming Languages:</span>
                <span className="italics">
                  {" "}
                  Python, C++, Java, SQL, HTML, CSS, Javascript, XML,
                  Typescript, Golang{" "}
                </span>
              </div>
              <div className="padding--ends">
                <span className="strong">Tools:</span>{" "}
                <span className="italics">
                  {" "}
                  React/Redux, Flutter, Flask, Django, OpenCV, NodeJS, Android,
                  Socket.io, Keras, LibGdx, Unity{" "}
                </span>
              </div>

              <div className="padding--ends">
                <span className="strong">Interests:</span>{" "}
                <span className="italics">
                  UI/UX development, Human Computer Interaction, Low Resource
                  System Design, Deep Learning, Artificial Intelligence, Social
                  Entrepreneurship{" "}
                </span>
              </div>
            </div>
            <div className="caption f24 text-green resume-caption">
              IN MY DOWN TIME{" "}
            </div>
            <div className="padding--ends f16 text-black">
              <span className="strong">Hobbies:</span> Building new
              games;Playing Football/Basketball;League of Legends;Gaming on my
              PC;Watching Sports;Watching Anime;
            </div>
          </Col>
        </Row>
        <div className="overflow-auto padding-sides padding--ends"></div>
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
