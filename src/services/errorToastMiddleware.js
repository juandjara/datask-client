import toast from './toastWrapper'

const errorToastMiddleware = store => next => action => {
  const {error, payload} = action
  if(error && payload) {
    const message = payload.response && payload.response.data ? 
      payload.response.data.error : 
      payload.message
    toast('error', message)
  }
  return next(action)
}

export default errorToastMiddleware