import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

api.interceptors.response.use((response) => {
  return response
}, async (error) => {
  return error.response;
});

export { api };
