import axios from 'axios';

const BackendLiveUrl = import.meta.env.VITE_BACKEND_BASE_URL



// Create an Axios instance with default configurations
const instance = axios.create({
  baseURL: `${BackendLiveUrl}/api`,
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Interceptor to attach token from localStorage to headers
// instance.interceptors.request.use(
//   (config) => {
//     // Retrieve the token from localStorage
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Set the Authorization header with the token if it exists
//       config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default instance;
