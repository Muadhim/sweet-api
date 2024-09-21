import { useUpdateFolder } from "@/services/project";
import { useQueryClient } from "react-query";

const useUpdateFolderHooks = () => {
  const { mutate, isLoading } = useUpdateFolder();
  const queryClient = useQueryClient();
  const handleUpdateFolder = (body: {
    id: number;
    name: string | null;
    parent_id: number | null;
  }) => {
    mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries("projectTree");
      },
    });
  };

  return {
    isLoading,
    handleUpdateFolder,
  };
};

export default useUpdateFolderHooks;
