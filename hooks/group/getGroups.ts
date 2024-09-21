import { useGetGroups } from "@/services/group";
import useGroupStore from "@/store/group/indext";
import { useEffect } from "react";

const useGetGroupsHooks = () => {
  const { data, isLoading } = useGetGroups();
  const setGroups = useGroupStore((state) => state.setGroups);

  useEffect(() => {
    if (data && data.data) setGroups(data.data);
    else setGroups([]);
  }, [data]);

  return {
    isLoading,
  };
};
export default useGetGroupsHooks;
