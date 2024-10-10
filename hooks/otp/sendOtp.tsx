import { useToast } from "@/components/ui/use-toast";
import { useSendOtp } from "@/services/otp";

const useSendOtpHooks = () => {
  const { mutate, isLoading } = useSendOtp();
  const { toast } = useToast();
  const handleSendOtp = (
    body: { email: string },
    options?: { onSuccess?: () => void; onError?: () => void }
  ) => {
    mutate(body, {
      onSuccess: () => {
        options?.onSuccess?.();
        toast({
          title: "Success to send otp",
          variant: "success",
        });
      },
      onError: (err: any) => {
        options?.onError?.();
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
    handleSendOtp,
  };
};

export default useSendOtpHooks;
