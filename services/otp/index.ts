import { apiVersion } from "@/constant";
import apiService from "../apiService";
import { api } from "../axiosInstance";
import IApiResponse from "@/interfaces/ApiResponse";
import { useMutation } from "react-query";

const sendOtp = async (body: { email: string }) => {
  const { data, status, message } = await apiService.post<IApiResponse<null>>(
    api,
    `${apiVersion}/send-otp`,
    body
  );
  if (status !== 200 && status !== 201) throw new Error(message);
  return data;
};

const validateOtp = async (body: { email: string; otp: string }) => {
  const { data, status, message } = await apiService.post<IApiResponse<null>>(
    api,
    `${apiVersion}/validate-otp`,
    body
  );
  if (status !== 200 && status !== 201) throw new Error(message);
  return data;
};

const useSendOtp = () =>
  useMutation({
    mutationKey: ["sendOtp"],
    mutationFn: (body: { email: string }) => sendOtp(body),
  });

const useValidateOtp = () =>
  useMutation({
    mutationKey: ["validateOtp"],
    mutationFn: (body: { email: string; otp: string }) => validateOtp(body),
  });

export { useSendOtp, useValidateOtp };
