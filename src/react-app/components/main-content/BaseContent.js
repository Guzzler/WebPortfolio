import React from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CircleType from "circletype";
import piImage from "../../../assets/images/pi-image.jpg";
import './BaseContent.css';

const BaseContent = () => {
  React.useEffect(() => {
    const circleType = new CircleType(
      document.getElementById("test-ele")
    );
    circleType.radius(130);
  });
  return (
    <Row className="width-100 height-100 background-white">
      <Col span={4} className="center left-column background-blue">
        <div className="pi-logo-entire">
          <span id="test-ele" className="f18 source-code-font text-white">
            Sharang{" "}
          </span>
          <img src={piImage} alt="pi" className='pi-logo-image' />
        </div>
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
