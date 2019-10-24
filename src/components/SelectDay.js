import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'element-react'
const SelectDay = ({ value, onChange, options, placeholder }) => (
  <Select
    onChange={ e => onChange(e) }
    value={ value }
    placeholder={ placeholder ? placeholder : '选择天数' }
    style={ {width:'100%'} }
  >
    {
      options &&
      options.map(el =>{
          return (<Select.Option key={ el.id } label={ el.label } value={ el.id } />)
        }
      )
    }
  </Select>
)

SelectDay.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ),
  placeholder: PropTypes.string
}

export default SelectDay
