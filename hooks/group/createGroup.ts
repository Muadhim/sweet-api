import { useToast } from "@/components/ui/use-toast";
import { useCreateGroup } from "@/services/group";
import { useQueryClient } from "react-query";

const useCreateGroupHooks = () => {
  const { mutate, isLoading } = useCreateGroup();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createGroup = (body: { name: string }) => {
    mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries(["groups"]);
        toast({
          title: "Create Group Success",
          description: `Group "${body.name}" has been created successfully`,
          variant: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Create Group Failed",
          description: error?.message,
          variant: "destructive",
        });
      },
    });
  };

  return {
    data: { isLoading },
    method: {
      createGroup,
    },
  };
};

export default useCreateGroupHooks;
