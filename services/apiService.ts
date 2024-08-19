import IApiResponse from "@/interfaces/ApiResponse";
import { AxiosInstance } from "axios";

const apiService = {
  async get<T>(
    instance: AxiosInstance,
    url: string,
    params?: any
  ): Promise<IApiResponse<T>> {
    try {
      const response = await instance.get<T>(url, { params });
      return {
        data: response.data,
        status: response.status,
        message: response.statusText,
      };
    } catch (error: any) {
      return {
        data: null,
        status: error.response ? error.response.status : 500,
        message:
          error.response.data.message ||
          error.message ||
          "Internal Server Error",
      };
    }
  },

  async post<T>(
    instance: AxiosInstance,
    url: string,
    data: any
  ): Promise<IApiResponse<T>> {
    try {
      const response = await instance.post<T>(url, data);
      return {
        data: response.data,
        status: response.status,
        message: response.statusText,
      };
    } catch (error: any) {
      return {
        data: null,
        status: error.response ? error.response.status : 500,
        message:
          error.response.data.message ||
          error.message ||
          "Internal Server Error",
      };
    }
  },

  async patch<T>(
    instance: AxiosInstance,
    url: string,
    data: any
  ): Promise<IApiResponse<T>> {
    try {
      const response = await instance.patch<T>(url, data);
      return {
        data: response.data,
        status: response.status,
        message: response.statusText,
      };
    } catch (error: any) {
      return {
        data: null,
        status: error.response ? error.response.status : 500,
        message:
          error.response.data.message ||
          error.message ||
          "Internal Server Error",
      };
    }
  },

  async put<T>(
    instance: AxiosInstance,
    url: string,
    data: any
  ): Promise<IApiResponse<T>> {
    try {
      const response = await instance.put<T>(url, data);
      return {
        data: response.data,
        status: response.status,
        message: response.statusText,
      };
    } catch (error: any) {
      return {
        data: null,
        status: error.response ? error.response.status : 500,
        message:
          error.response.data.message ||
          error.message ||
          "Internal Server Error",
      };
    }
  },

  async delete<T>(
    instance: AxiosInstance,
    url: string,
    data?: any
  ): Promise<IApiResponse<T>> {
    try {
      const response = await instance.delete<T>(url, { data });
      return {
        data: response.data,
        status: response.status,
        message: response.statusText,
      };
    } catch (error: any) {
      return {
        data: null,
        status: error.response ? error.response.status : 500,
        message:
          error.response.data.message ||
          error.message ||
          "Internal Server Error",
      };
    }
  },
};

export default apiService;
