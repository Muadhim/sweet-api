import { useToast } from "@/components/ui/use-toast";
import { useForgotPassword } from "@/services/forgotPassword";
import { useRouter } from "next/navigation";

const useForgotPasswordHooks = () => {
  const { mutate, isLoading } = useForgotPassword();
  const { toast } = useToast();
  const router = useRouter();

  const handleForgotPassword = (body: {
    email: string;
    otp: string;
    new_password: string;
  }) => {
    mutate(body, {
      onSuccess: () => {
        toast({
          title: "Success to send otp",
          variant: "success",
        });
        router.push("/sign-in");
      },
      onError: (err: any) => {
        toast({
          title: "Failed to send otp",
          variant: "destructive",
          description: err?.message || "",
        });
      },
    });
  };

  return {
    isLoading,
    handleForgotPassword,
  };
};

export default useForgotPasswordHooks;
