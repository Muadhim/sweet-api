import { useToast } from "@/components/ui/use-toast";
import { useSignIn } from "@/services/signIn";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
const useSignInHooks = () => {
  const router = useRouter();
  const { toast } = useToast();
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
          const token = jwtDecode(data?.data?.access_token || "");
          setCookie("user", data?.data, { maxAge: token?.exp || 0 * 1000 });
          toast({
            variant: "success",
            title: "Sign In Success",
          });
          router.push("/dashboard");
        },
        onError: (error: any) => {
          toast({
            variant: "destructive",
            title: "Sign In Failed",
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
