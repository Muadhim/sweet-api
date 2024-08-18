import { toast } from "@/components/ui/use-toast";
import { useSignIn } from "@/services/signIn";
import { useAuthStore } from "@/store/auth/authStore";
import useUserStore from "@/store/user/userStore";
import { useRouter } from "next/navigation";
const useSignInHooks = () => {
  const router = useRouter();
  const { mutate } = useSignIn();

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("success");
          document.cookie = `access_token=${data?.data?.access_token}; path=/;`;
          useAuthStore.getState().setToken(data?.data?.access_token || "");
          useUserStore.getState().setUser(data?.data);
          toast({
            title: "SignIn Success",
          });
          router.push("/dashboard");
          // redirect("/dashboard");
        },
        onError: (error: any) => {
          toast({
            title: "SignIn Failed",
            description: error?.message,
          });
        },
      }
    );
  };
  return {
    data: {},
    method: { signIn },
  };
};

export default useSignInHooks;
