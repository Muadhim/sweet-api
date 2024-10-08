import { useMutation } from "react-query";
import apiService from "../apiService";
import { api } from "../axiosInstance";
import IApiResponse from "@/interfaces/ApiResponse";
import { IAuth } from "@/interfaces/Auth";
import { apiVersion } from "@/constant";

const signIn = async (params: { email: string; password: string }) => {
  const { data, status, message } = await apiService.post<IApiResponse<IAuth>>(
    api,
    `${apiVersion}/login`,
    params
  );
  if (status !== 200 && status !== 201) throw new Error(message);
  return data;
};

const useSignIn = () =>
  useMutation({
    mutationKey: ["signIn"],
    mutationFn: (params: { email: string; password: string }) => signIn(params),
  });

export { useSignIn };
