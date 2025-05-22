// src/api/index.js
import axios from 'axios';
import config from '../config';

const apiClient = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: Add request/response interceptors for debugging
apiClient.interceptors.request.use(
  request => {
    console.log('API Request:', request.method, request.url);
    return request;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default apiClient;