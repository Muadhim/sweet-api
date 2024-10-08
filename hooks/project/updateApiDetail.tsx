import { TMethod } from "@/interfaces/Method";
import { useUpdateApiDetail } from "@/services/project/projectDetail";
import { useQueryClient } from "react-query";

const useUpdateApiDetailHooks = () => {
  const { mutate, isLoading } = useUpdateApiDetail();
  const queryClient = useQueryClient();

  const handleUpdateApiDetail = (body: {
    id: number;
    name: string;
    path: string;
    method: TMethod;
    folder_id: number;
    request: string;
    response: string;
    description: string;
    example_request: string;
    example_response: string;
    project_id: number;
  }) => {
    mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries(["getApiDetail"]);
      },
    });
  };

  return {
    isLoading,
    handleUpdateApiDetail,
  };
};

export default useUpdateApiDetailHooks;
