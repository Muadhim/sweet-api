import { useMutation } from "react-query";
import apiService from "../apiService";
import { api } from "../axiosInstance";
import ApiResponse from "@/interfaces/ApiResponse";
import { Auth } from "@/interfaces/auth";
import { apiVersion } from "@/constant";

const signIn = async (params: { email: string; password: string }) => {
  const { data, status, message } = await apiService.post<ApiResponse<Auth>>(
    api,
    `${apiVersion}/login`,
    params
  );
  console.log("data: ", data);
  if (status !== 200 && status !== 201) throw new Error(message);
  return data;
};

const useSignIn = () =>
  useMutation({
    mutationKey: ["signIn"],
    mutationFn: (params: { email: string; password: string }) => signIn(params),
  });

export { useSignIn };
