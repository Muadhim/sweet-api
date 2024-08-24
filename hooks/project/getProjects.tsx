import { useGetProjects } from "@/services/project";
import useProjectStore from "@/store/project";
import { useEffect } from "react";

const useGetProjectsHooks = () => {
  const { data: dataProjects, isLoading: isLoadingProjects } = useGetProjects();
  const setProjects = useProjectStore((state) => state.setProjects);

  useEffect(() => {
    if (dataProjects && dataProjects.data) setProjects(dataProjects.data);
    else setProjects([]);
  }, [dataProjects]);

  return {
    data: {
      isLoadingProjects,
    },
  };
};

export default useGetProjectsHooks;
