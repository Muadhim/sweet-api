import { IProject } from "@/interfaces/Project";
import { useGetProject } from "@/services/project";
import useProjectStore from "@/store/project";
import { useEffect, useState } from "react";

const useGetProjectHooks = () => {
  const setProject = useProjectStore((state) => state.setProject);
  const [pId, setPid] = useState<number>(0);
  const { data, isLoading } = useGetProject(pId);

  useEffect(() => {
    if (data && data.data) setProject(data.data);
    else setProject({} as IProject);
  }, [data]);

  return {
    data: {
      isLoading,
    },
    method: { setPid },
  };
};

export default useGetProjectHooks;
