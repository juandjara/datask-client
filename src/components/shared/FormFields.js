import React from 'react'

import Input from 'react-toolbox/lib/input/Input'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import Select from 'react-select';
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import 'react-select/dist/react-select.css';

const renderInput = ({
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
const renderCheckbox = ({input, label, meta, ...otherProps}) => (
  <Checkbox 
    label={label}
    checked={!!input.value}
    onChange={input.onChange}
    {...otherProps}
  />
)
const renderSelect = ({
  input,
  label,
  meta: {touched, error},
  icon,
  name,
  ...otherProps
}) => (
  <div style={{display: 'flex'}}>
    <label className="select-label" htmlFor={name}>
      <Icon>{icon}</Icon>
    </label>
    <Select
      name={name} 
      value={input.value}
      onChange={input.onChange}
      {...otherProps}
    />
  </div>
)
const renderAsyncSelect = ({
  input,
  label,
  meta: { touched, error, warning },
  icon,
  name,
  ...otherProps
}) => (
  <div style={{display: 'flex'}}>
    <label className="select-label" htmlFor={name}>
      <Icon style={{maxWidth: '1em'}}>{icon}</Icon>
    </label>
    <Select.Async
      name={name} 
      value={input.value}
      onChange={input.onChange}
      {...otherProps}
    />
  </div>
)

export default {renderCheckbox, renderInput, renderSelect, renderAsyncSelect}
