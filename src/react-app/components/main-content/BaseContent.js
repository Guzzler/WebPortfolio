/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CircleType from "circletype";
import piImage from "../../../assets/images/pi-image.jpg";
import "./BaseContent.css";

const BaseContent = () => {
  React.useEffect(() => {
    const circleType = new CircleType(document.getElementById("test-ele"));
    circleType.radius(130);
  });
  return (
    <Row className="width-100 height-100 background-white overflow-hidden">
      <Col
        span={4}
        className="left-column background-blue roboto-font f18 text-white"
      >
        <div className="pi-logo-entire center">
          <span id="test-ele" className="f18 source-code-font text-white">
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
            <a className='text-white mailtolink' href="mailto:sharangpai123@gmail.com">sharangpai123@gmail.com</a>
          </div>
          <div className="caption f14 text-green cv-caption">Connect</div>
          <div>
            <div class="connect-button-container">
              <ul className="connect-buttons">
                <li className="connect-button">
                  <a
                    className="connect-link"
                    href="https://www.github.com/Guzzler"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fa fa-github" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="connect-button">
                  <a
                    className="connect-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/sharang-pai/"
                  >
                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="connect-button">
                  <a
                    className="connect-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://sharangpai.me"
                  >
                    <i class="fa fa-globe" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='cv-copyright'> @ 2021 - By Sharang Pai</div>
      </Col>
      <Col span={10} className="resume-first-col">
        test
      </Col>
      <Col span={10} className="resume-second-col">
        Test
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
