import { useLogin } from "@/services/auth/login";

const useLoginHook = () => {
	const { mutate: login, isLoading } = useLogin();

	const handleLogin = (data: { email: string; password: string }) => {
		login(data, {
			onSuccess: () => {},
			onError: () => {},
		});
	};

	return {
		data: { isLoading },
		method: { handleLogin },
	};
};
export default useLoginHook;
