import { useGetInviteLink } from "@/services/project";
import { useState } from "react";

const useGetInviteLinkHooks = () => {
  const [pId, setPid] = useState<number>(0);
  const { data: token, isLoading } = useGetInviteLink(pId);
  return {
    data: {
      token,
      isLoading,
    },
    setPid,
  };
};

export default useGetInviteLinkHooks;
