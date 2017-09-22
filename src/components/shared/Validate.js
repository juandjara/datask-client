import React from 'react';
import PropTypes from 'prop-types';

function getValidationErrors(
  rules = [], model = {}, touched = {}, ignoreTouched = false
) {
  const rulesWithError = rules.filter(rule => {
    const [key, validator] = rule
    let ruleHasError = !validator(model)
    if(!ignoreTouched) {
      ruleHasError = ruleHasError && touched[key]
    }
    return ruleHasError
  })
  return rulesWithError.reduce((errors, rule) => {
    const key = rule[0]
    const errorMessage = rule[2]
    errors[key] = errorMessage
    return errors
  }, {})
}
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
    const rawValidation = getValidationErrors(rules, props.model, props.touched, true)
    const isValid = Object.keys(rawValidation).length === 0
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