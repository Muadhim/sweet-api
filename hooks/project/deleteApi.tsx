import { useDeleteApi } from "@/services/project";
import { useQueryClient } from "react-query";

const useDeleteApiHooks = () => {
  const { mutate, isLoading } = useDeleteApi();
  const queryClient = useQueryClient();

  const handleDeleteApi = ({
    id,
    projectId,
  }: {
    id: number;
    projectId: number;
  }) => {
    mutate(
      { id, projectId },
      {
        onSuccess: () => queryClient.invalidateQueries(["projectTree"]),
      }
    );
  };

  return {
    isLoading,
    handleDeleteApi,
  };
};

export default useDeleteApiHooks;
