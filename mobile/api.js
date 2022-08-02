import axios from 'axios';
import { getUser } from './shared/Utils';

const API = axios.create({
  baseURL: "http://192.168.100.34:5000",
});

API.interceptors.request.use(async(config) => {
  const user = await getUser();
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  } 

  return config;
});

API.interceptors.response.use(async(config) => {
  const user = await getUser();
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  } 

  return config;
});

export default API;
