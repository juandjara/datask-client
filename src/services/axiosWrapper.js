import axios from 'axios'
import config from 'index.config'
import { JWT_KEY } from './authService'

const instance = axios.create({
  baseURL: config.api
})

// axios interceptor that injects the jwt token if there is one
instance.interceptors.request.use(config => {
  const token = localStorage.getItem(JWT_KEY);
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
})

export default instance;
