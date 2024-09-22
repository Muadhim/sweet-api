import { TMethod } from "@/interfaces/Method";
import { useCreateApi } from "@/services/project";
import { useQueryClient } from "react-query";

const useCreateApiHooks = () => {
  const { mutate, isLoading } = useCreateApi();
  const queryClient = useQueryClient();
  const handleCreateApi = (body: {
    name: string;
    folder_id: number;
    method: TMethod;
  }) => {
    mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries(["projectTree"]);
      },
    });
  };

  return {
    isLoading,
    handleCreateApi,
  };
};

export default useCreateApiHooks;
