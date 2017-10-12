import React from 'react'

import Input from 'react-toolbox/lib/input/Input'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import Select from 'react-select';
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import 'react-select/dist/react-select.css';
import './FormFields.css'

export const renderInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...otherProps
}) => (
  <Input
    label={label}
    type={type}
    error={touched && error}
    {...input}
    {...otherProps}
  />
)
export const renderCheckbox = ({input, label, meta, ...otherProps}) => (
  <Checkbox 
    label={label}
    checked={!!input.value}
    onChange={input.onChange}
    {...otherProps}
  />
)
export const renderSelect = ({
  input,
  label,
  meta: {touched, error},
  icon,
  name,
  ...otherProps
}) => (
  <div style={{display: 'flex'}}>
    <label className="select-icon" htmlFor={name}>
      <Icon>{icon}</Icon>
    </label>
    <div style={{flex: 1}}>
      <label className="select-label">{label}</label>  
      <Select
        name={name} 
        value={input.value}
        onChange={input.onChange}
        {...otherProps}
      />
    </div>      
  </div>
)
export const renderAsyncSelect = ({
  input,
  label,
  meta: { touched, error, warning },
  icon,
  name,
  style,
  ...otherProps
}) => (
  <div style={{display: 'flex', ...style}}>
    <label className="select-icon" htmlFor={name}>
      <Icon style={{maxWidth: '1em'}}>{icon}</Icon>
    </label>
    <div style={{flex: 1}}>
      <label className="select-label">{label}</label>  
      <Select.Async
        name={name} 
        value={input.value}
        onChange={input.onChange}
        {...otherProps}
      />
    </div>      
  </div>
)
export const renderDatepicker = ({
  input,
  label,
  meta,
  icon,
  name,
  ...otherProps
}) => (
  <div className="date-picker-container">
    <label className="select-icon">
      <Icon>{icon}</Icon>
    </label>
    <DatePicker
      label={label}
      name={name}
      value={input.value}
      onChange={input.onChange}
      cancelLabel="Cancelar"
      {...otherProps}
    />
  </div>
)

export default {
  renderCheckbox, 
  renderInput, 
  renderSelect, 
  renderAsyncSelect,
  renderDatepicker
}
