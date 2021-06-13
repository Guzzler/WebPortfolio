import React from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class BaseContent extends React.Component {
  render() {
    return (
      <Row className='padding--sides width-100 height-100 background-white'>
        <Col span={24} className='center' >
          This is my website
        </Col>
      </Row>
    )
  }
}

BaseContent.propTypes = {
  base: PropTypes.object.isRequired,
}

const mapStateToProps = ({ base }) => {
  return {
    base
  }
}

export default connect(
  mapStateToProps, {
})(BaseContent)
