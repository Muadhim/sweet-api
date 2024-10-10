import { useToast } from "@/components/ui/use-toast";
import { useValidateOtp } from "@/services/otp";

const useValidateOtpHooks = () => {
  const { mutate, isLoading } = useValidateOtp();
  const { toast } = useToast();

  const handleValidateOtp = (
    body: { email: string; otp: string },
    options?: { onSuccess?: () => void; onError?: () => void }
  ) => {
    mutate(body, {
      onSuccess: () => {
        options?.onSuccess?.();
        toast({
          title: "Success to validate otp",
          variant: "success",
        });
      },
      onError: (err: any) => {
        options?.onError?.();
        toast({
          title: "Failed to validate otp",
          variant: "destructive",
          description: err?.message || "",
        });
      },
    });
  };
  return {
    isLoading,
    handleValidateOtp,
  };
};

export default useValidateOtpHooks;
