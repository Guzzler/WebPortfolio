/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CircleType from "circletype";
import piImage from "../../../assets/images/pi-image.jpg";
import "./BaseContent.css";
import ExperienceTimeline from "./ExperienceTimeline";

const BaseContent = () => {
  React.useEffect(() => {
    const circleType = new CircleType(document.getElementById("test-ele"));
    circleType.radius(130);
  });
  return (
    <Row className="width-100 height-100 background-white">
      <Col
        span={4}
        md={4}
        sm={24}
        xs={24}
        className="left-column background-blue roboto-font f18 text-white"
      >
        <div className="pi-logo-entire center">
          <span id="test-ele" className="f18 source-code-font text-cool-grey">
            Sharang{" "}
          </span>
          <img src={piImage} alt="pi" className="pi-logo-image" />
        </div>
        <div className="text-left cv-text-details">
          <div className="caption f14 text-green cv-caption">Name</div>
          <div>Sharang Pai</div>
          <div className="caption f14 text-green cv-caption">Focus</div>
          <div>Computer Science Engineer / Web Developer</div>
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

        <div className="cv-copyright"> @ 2021 - By Sharang Pai</div>
      </Col>
      <Col md={20} sm={24} xs={24} className="resume-main-content roboto-font">
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
                I've spent the last few years working on various projects
                including an open source educational initiative for underserved
                students called OpenShiksha. My ultimate purpose is to become a socially relevant
                technological entrepreneur, and use innovative technology to
                bridge the socio-economic gap for the underserved.
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
                  team for a brief period. Qualified for the Indian National Informatics Olympiad (2012/2013)
                  and also participated in Google Code-in (2013).
                </div>
              </div>
            </div>
            <div className="caption f24 text-green resume-caption">
              Technical{" "}
            </div>
            <div className='f16 text-black'>
            <div className='padding--ends'>
              <span className="strong">Programming Languages:</span><span className='italics'> Python,
              C++, Java, SQL, HTML, CSS, Javascript, XML, Typescript, Golang </span>
            </div>
            <div className='padding--ends'>
              <span className="strong">Tools:</span> <span className='italics'> React/Redux, Flask, Django,
              OpenCV, NodeJS, Android, Socket.io, Keras, LibGdx, Godot </span>
            </div>

            <div className='padding--ends'>
              <span className="strong">Interests:</span> <span className='italics'>UI/UX Development, Human Computer Interaction, Low Resource System Design, Neural Networks, Artificial Intelligence </span>
            </div>
            </div>
            <div className="caption f24 text-green resume-caption">
              IN MY OFF TIME{" "}
            </div>
            <div className='padding--ends f16 text-black'>
            <span className="strong">Things I like:</span> League of Legends;Gaming on my PC;Building new games;Playing Football/Basketball;Watching Anime;
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
