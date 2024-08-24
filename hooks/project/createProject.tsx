import { useToast } from "@/components/ui/use-toast";
import { useCreateProject } from "@/services/project";
import { useQueryClient } from "react-query";

const useCreateProjectHooks = () => {
  const { mutate, isLoading } = useCreateProject();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createProject = (body: { name: string; member_ids?: number[] }) => {
    mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
        toast({
          title: "Create Project Success",
          description: `Project "${body.name}" has been created successfully`,
          variant: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Create Project Failed",
          description: error?.message,
          variant: "destructive",
        });
      },
    });
  };

  return {
    data: { isLoading },
    method: {
      createProject,
    },
  };
};
export default useCreateProjectHooks;
