import React from 'react';
import PropTypes from 'prop-types';

const getValidationErrors = (rules = [], model = {}, touched = {}) =>
  rules.reduce((errors, [key, rule, errorMsg]) => {
    const ruleHasError = !rule(model) && touched[key]
    return ruleHasError ? Object.assign(errors, {[key]: errorMsg}) : errors
  }, {})
const validateRules = (rules) => {
  if(!rules.every(rule => rule.length === 3)) {
    throw new Error('Expected every rule to be an array of 3 elements')
  }
  rules.forEach((rule, index) => {
    if(typeof rule[0] !== 'string') {
      throw new Error(`
        Expected first element of rule ${index} to be of type string
        but found ${typeof rule[0]}
      `)
    }
    if(typeof rule[1] !== 'function') {
      throw new Error(`
        Expected first element of rule ${index} to be of type function
        but found ${typeof rule[0]}
      `)
    }
    if(typeof rule[2] !== 'string') {
      throw new Error(`
        Expected first element of rule ${index} to be of type string
        but found ${typeof rule[0]}
      `)
    }
  })
}

const Validate = (rules) => WrappedComponent => {
  validateRules(rules)
  const Wrapper = props => {
    const validationErrors = getValidationErrors(rules, props.model, props.touched)
    const isValid = Object.keys(validationErrors).length === 0
    return (
      <WrappedComponent 
        {...props} 
        validationErrors={validationErrors} 
        isValid={isValid} />
    )
  }
  const name = WrappedComponent.displayName || WrappedComponent.name
  Wrapper.displayName = `Validate(${name})`
  Wrapper.propTypes = {
    model: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired
  }

  return Wrapper
}

export const isRequired = key => ([
  key,
  model => !!model[key],
  'Este campo es obligatorio'
])
export const passwordMatch = (key, repeatKey) => ([
  key,
  model => model[key] === model[repeatKey],
  'Las contraseñas deben coincidir'
])

export default Validate