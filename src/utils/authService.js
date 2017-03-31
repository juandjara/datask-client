export default {
  userIsLogged() {
    return localStorage.getItem('jwt')
  }
}
