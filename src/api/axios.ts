import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { Platform } from 'react-native';
import { initialiseStorage } from '../utils/localStorage';

const isAndroid = Platform.OS === 'android';
const BASE_URL = isAndroid 
  ? 'http://10.0.2.2:8000/api'  // Android emulator -> host machine
  : 'http://localhost:8000/api'; // iOS simulator

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = (await initialiseStorage())?.getString('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error)
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      const storageInstance = await initialiseStorage();
      originalRequest._retry = true;
      const refreshToken = storageInstance?.getString('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(`${BASE_URL}/users/refresh_token/`, {
            refresh: refreshToken,
          });
          const {access} = response.data;
          storageInstance?.set('accessToken', access);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          storageInstance?.remove('accessToken');
          storageInstance?.remove('refreshToken');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
