import axios, { AxiosInstance } from "axios";

import { config } from "@/utils/constants";

interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

const ApiConfig: ApiClientConfig = {
  baseURL: config.urls.API_URL,
  timeout: 3000,
  headers: {
    Accept: "application/json",
  },
};

const ApiClient: AxiosInstance = axios.create(ApiConfig);

/* Add a request interceptor */
ApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiClient;
