import { IProjectTreeResponse } from "@/interfaces/ProjectTree";
import { useGetProjectTree } from "@/services/project";
import useProjectStore from "@/store/project";
import { useEffect, useState } from "react";

const useGetProjectTreeHooks = () => {
  const setProjectTree = useProjectStore((state) => state.setProjectTree);
  const [pid, setPid] = useState<number | null>(null);
  const { data, isLoading } = useGetProjectTree(pid);

  useEffect(() => {
    if (data && data.data) setProjectTree(data.data);
    else setProjectTree({} as IProjectTreeResponse);
  }, [data]);

  return {
    isLoading,
    setPid,
  };
};

export default useGetProjectTreeHooks;
