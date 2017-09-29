const required = value => (value ? undefined : 'Este campo es obligatorio')
const matchKey = matchKey => (value, model) => (
  value === model[matchKey] ? undefined : 'Las contraseñas deben coincidir'
)
const minLength = min => value => (
  value && value.length < min ? `Debe tener ${min} caracteres como minimo` : undefined
)
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const email = value => (
  value && emailRegex.test(value) ? undefined : 'Email invalido'
)

export default {required, minLength, matchKey, email}
