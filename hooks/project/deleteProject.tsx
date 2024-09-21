import { useToast } from "@/components/ui/use-toast";
import { useDeleteProject } from "@/services/project";
import { useQueryClient } from "react-query";

const useDeleteProjectHooks = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate, isLoading } = useDeleteProject();

  const deleteProject = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
        toast({
          title: "Delete Project Successfully",
          variant: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Delete Project Failed",
          description: error?.message,
          variant: "destructive",
        });
      },
    });
  };
  return {
    isLoading,
    deleteProject,
  };
};

export default useDeleteProjectHooks;
