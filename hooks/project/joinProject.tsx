import { useToast } from "@/components/ui/use-toast";
import { useJoinProject } from "@/services/project/project";
import { useRouter } from "next/navigation";

const useJoinProjectHooks = () => {
  const router = useRouter();
  const { mutate, isLoading } = useJoinProject();
  const { toast } = useToast();

  const handleJoinProject = (body: { token: string }) => {
    mutate(body, {
      onSuccess: (data) => {
        toast({
          title: "Success to join project",
          variant: "success",
        });
        router.push(`/project/${data?.data}`);
      },
      onError: (err: any) => {
        console.log("error: ", err);
        toast({
          title: "Failed to join project",
          variant: "destructive",
          description: err?.message || "",
        });
      },
    });
  };
  return {
    isLoading,
    handleJoinProject,
  };
};

export default useJoinProjectHooks;
