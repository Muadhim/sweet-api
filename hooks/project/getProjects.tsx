import { useGetProjects } from "@/services/project";
import useProjectStore from "@/store/project";
import { useEffect } from "react";

const useGetProjectsHooks = () => {
  const { data, isLoading } = useGetProjects();
  const setProjects = useProjectStore((state) => state.setProjects);

  useEffect(() => {
    if (data && data.data) setProjects(data.data);
    else setProjects([]);
  }, [data]);

  return {
    isLoading,
  };
};

export default useGetProjectsHooks;
