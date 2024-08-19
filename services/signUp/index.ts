import IApiResponse from "@/interfaces/ApiResponse";
import apiService from "../apiService";
import { api } from "../axiosInstance";
import { apiVersion } from "@/constant";
import { useMutation } from "react-query";

const signUp = async (params: {
  name: string;
  password: string;
  email: string;
}) => {
  const { data, status, message } = await apiService.post<IApiResponse<any>>(
    api,
    `${apiVersion}/users`,
    params
  );
  if (status !== 200 && status !== 201) throw new Error(message);
  return data;
};

const useSignUp = () =>
  useMutation({
    mutationKey: ["signUp"],
    mutationFn: (params: { name: string; password: string; email: string }) =>
      signUp(params),
  });

export { useSignUp };
