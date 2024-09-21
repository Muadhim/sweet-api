import { useDeleteFolder } from "@/services/project";
import { useQueryClient } from "react-query";

const useDeleteFolderHooks = () => {
  const { mutate, isLoading } = useDeleteFolder();
  const queryClient = useQueryClient();
  const handleDeleteFolder = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["projectTree"]);
      },
    });
  };
  return {
    isLoading,
    handleDeleteFolder,
  };
};
export default useDeleteFolderHooks;
