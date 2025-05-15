import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { API, API_URL } from "./api";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: tự động lấy accessToken từ SecureStore
axiosClient.interceptors.request.use(
  async config => {
    const token = await SecureStore.getItemAsync('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor: xử lý lỗi 401
axiosClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (!refreshToken) return Promise.reject(error);

      try {
        // nếu không phải axiosClient thì không gọi refreshToken
        const res = await axiosClient.put(API.refreshToken, {}, {
          headers: { 'x-refresh-token': `Bearer ${refreshToken}` }
        });

        const newAccessToken = res.data?.data?.accessToken;
        const newRefreshToken = res.data?.data?.refreshToken;

        if (newAccessToken && newRefreshToken) {
          await SecureStore.setItemAsync('accessToken', newAccessToken);
          await SecureStore.setItemAsync('refreshToken', newRefreshToken);

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        // Có thể gọi logout() tại đây nếu muốn
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
