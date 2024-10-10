import IApiResponse from "@/interfaces/ApiResponse";
import apiService from "../apiService";
import { api } from "../axiosInstance";
import { apiVersion } from "@/constant";
import { useMutation } from "react-query";

const forgotPassword = async (body: {
  email: string;
  otp: string;
  new_password: string;
}) => {
  const { data, status, message } = await apiService.post<IApiResponse<null>>(
    api,
    `${apiVersion}/forgot-password`,
    body
  );
  if (status !== 200 && status !== 201) throw new Error(message);
  return data;
};

const useForgotPassword = () =>
  useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: (body: { email: string; otp: string; new_password: string }) =>
      forgotPassword(body),
  });

export { useForgotPassword };
