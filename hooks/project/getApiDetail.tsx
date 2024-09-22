import { IProjectApi } from "@/interfaces/ProjectApi";
import { useGetApiDetail } from "@/services/project/projectDetail";
import useProjectStore from "@/store/project";
import { useEffect, useState } from "react";

const useGetApiDetailHooks = () => {
  const [id, setId] = useState<number>(0);
  const [projectId, setProjectId] = useState<number>(0);
  const { data, isLoading } = useGetApiDetail({ id, projectId });
  const setProjectApi = useProjectStore((state) => state.setProjectApi);

  useEffect(() => {
    if (data && data.data) setProjectApi(data.data);
    else setProjectApi({} as IProjectApi);
  }, [data]);

  return {
    isLoading,
    setProjectId,
    setId,
  };
};

export default useGetApiDetailHooks;
