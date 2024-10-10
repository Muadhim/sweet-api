import { useToast } from "@/components/ui/use-toast";
import { useSignUp } from "@/services/signUp";
import { useRouter } from "next/navigation";

const useSignUpHooks = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isLoading } = useSignUp();

  const signUp = ({
    user,
    email,
    password,
  }: {
    user: string;
    email: string;
    password: string;
  }) => {
    mutate(
      { name: user, email, password },
      {
        onSuccess: (data) => {
          toast({
            title: "Sign Up Success",
            variant: "success",
          });
          router.push("/sign-in"); // todo: make verification page
        },
        onError: (error: any) => {
          toast({
            title: "Sign Up Failed",
            description: error?.message,
            variant: "destructive",
          });
        },
      }
    );
  };
  return {
    data: { isLoading },
    method: { signUp },
  };
};

export default useSignUpHooks;
