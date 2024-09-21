import { useCreateFolder } from "@/services/project";
import { useQueryClient } from "react-query";

const useCreateFolderHooks = () => {
  const { mutate, isLoading } = useCreateFolder();
  const queryClient = useQueryClient();
  const handleCreateFolder = (body: {
    name: string;
    project_id: number;
    parent_id: number | null;
  }) => {
    mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries(["projectTree"]);
      },
    });
  };

  return {
    isLoading,
    handleCreateFolder,
  };
};
export default useCreateFolderHooks;
