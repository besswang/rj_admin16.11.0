import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'element-react'
const SelectPicker = ({ value, stringValue, onChange, options, optionsArr, placeholder, clearable }) => (
  <Select
    onChange={ e => onChange(e) }
    value={ value ? value : stringValue }
    clearable={ clearable ? false : true }
    placeholder={ placeholder ? placeholder : '搜索类型' }
    style={ {width:'100%'} }
  >
    {
      options &&
      options.map(el =>{
          if (el.value || el.value === 0) {
            return (<Select.Option key={ el.value } label={ el.label } value={ el.value } />)
          }else{
            return(<Select.Option key={ el.id } label={ el.channelName } value={ el.channelName } />)
          }
        }
      )
    }
    {
      optionsArr &&
      optionsArr.map(el => {
        return (<Select.Option key={ el } label={ el } value={ el } />)
      })
    }
  </Select>
)

SelectPicker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ),
  optionsArr: PropTypes.array,
  value: PropTypes.number,
  stringValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  clearable: PropTypes.number
}

export default SelectPicker
