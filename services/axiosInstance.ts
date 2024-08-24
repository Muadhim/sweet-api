import { getUserCookie } from "@/utils/userCookie";
import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_ORIGIN,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    Object.assign(config.headers, {
      Authorization: `Bearer ${getUserCookie()?.access_token}`,
    });

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);
