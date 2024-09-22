import { TMethod } from "@/interfaces/Method";
import { useUpdateApi } from "@/services/project";
import { useQueryClient } from "react-query";

const useUpdateApiHooks = () => {
  const { mutate, isLoading } = useUpdateApi();
  const queryClient = useQueryClient();

  const handleUpdateApi = (body: {
    id: number;
    name: string;
    method: TMethod;
    folder_id: number;
  }) => {
    mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries(["projectTree"]);
      },
    });
  };

  return {
    isLoading,
    handleUpdateApi,
  };
};

export default useUpdateApiHooks;
