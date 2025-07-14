import axios from 'axios';
// import { getAuthToken } from './auth-cookie';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // for sending cookies to the server
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  // const token = getAuthToken() ; // read token from cookie

  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  return config;
});


const request = async <T = unknown>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: unknown,
  config?: { [key: string]: unknown }
): Promise<T> => {
  const response = await axiosInstance({
    method,
    url,
    data,
    ...config
  });

  return response.data;
};
export {axiosInstance, request};