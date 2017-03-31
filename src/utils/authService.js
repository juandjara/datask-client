export default {
  userIsLogged(store) {
    return localStorage.getItem('jwt')
  }
}
