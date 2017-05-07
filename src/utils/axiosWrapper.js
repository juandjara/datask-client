import axios from 'axios'
import config from '../config'

const instance = axios.create({
  baseURL: config.api
})

instance.interceptors.request.use(config => {
  const token = localStorage.jwt;
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
})

export default instance;
