import axios, { AxiosInstance, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
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

export default axiosInstance;