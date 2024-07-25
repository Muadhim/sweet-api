import { useMutation } from "react-query";
import apiService from "../apiService";
import { api } from "../axiosInstance";

const login = async (body: { email: string; password: string }) => {
	const { data, status, message } = await apiService.post(api, "/login", body);
	if (status !== 200) throw new Error(message);
	return data;
};

const useLogin = () => {
	return useMutation({
		mutationKey: ["login"],
		mutationFn: (body: { email: string; password: string }) => login(body),
	});
};

export { useLogin };
