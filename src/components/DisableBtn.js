import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'element-react'
const DisableBtn = ({ value, onClick , text, result }) => (
  <Button className="margin_right10" type={ value === result ? 'primary': 'danger' } size="mini" onClick={ onClick }>
  {
    value !== null ? (value === result ? text[0] : text[1]) : '空值'
  }
  </Button>
)

DisableBtn.propTypes = {
  value: PropTypes.number,
  result: PropTypes.number,
  onClick: PropTypes.func,
  text: PropTypes.array
}

export default DisableBtn
