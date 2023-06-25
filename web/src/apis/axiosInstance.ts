import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { AccessToken } from '../utils/helpers/AcessToken';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = AccessToken.getAccessToken();

    config.headers = config.headers || {} as AxiosRequestHeaders;
    config.headers['Authorization'] = `${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      AccessToken.clearAccessInformation();
      window.location.href = "/perfil";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;