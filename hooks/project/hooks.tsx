import { ueeGetProjects } from "@/services/project";
import useProjectStore from "@/store/project";
import { useEffect } from "react";

const useProjectHooks = () => {
  const { data: dataProjects, isLoading: isLoadingProjects } = ueeGetProjects();
  const setProjects = useProjectStore((state) => state.addProjects);

  useEffect(() => {
    if (dataProjects && dataProjects.data) setProjects(dataProjects.data);
    else setProjects([]);
  }, [dataProjects]);

  return {
    data: {
      isLoadingProjects,
    },
    method: {},
  };
};

export default useProjectHooks;
