"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProjectHooks } from "@/hooks/project";
import useProjectStore from "@/store/project";
import { getUserCookie } from "@/utils/userCookie";
import React, { FC, useEffect } from "react";

interface Props {
  projectId: number;
}
const ProjectView: FC<Props> = ({ projectId }) => {
  const { data, method } = useGetProjectHooks();
  const project = useProjectStore((state) => state.project);
  const user = getUserCookie();
  useEffect(() => {
    method.setPid(projectId);
  });
  return (
    <>
      {data.isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <div className="flex gap-4">
            <Skeleton className="h-32 w-32" />
            <Skeleton className="h-32 w-32" />
            <Skeleton className="h-32 w-32" />
          </div>
        </div>
      ) : project.id ? (
        <>
          <div className="flex gap-4 items-center">
            <p>{user?.name}</p>
            {user?.id === project.author_id ? (
              <Badge variant="success">Author</Badge>
            ) : (
              <Badge variant="warning">Member</Badge>
            )}
          </div>
          <br />
          <div className="flex gap-4">
            <Card className="cursor-pointer w-fit-content min-w-32 max-w-44 h-32 bg-primary-foreground flex flex-col gap-2 p-3">
              <p className="text-center font-bold">Project</p>
              <p className="text-center text-base  line-clamp-3">
                {project.name}
              </p>
            </Card>
            <Card className="cursor-pointer w-32 h-32 bg-primary-foreground flex flex-col gap-2 p-3">
              <p className="text-center font-bold">Members</p>
              <p className="text-center text-4xl flex justify-center items-center h-full">
                {project?.members?.length || 0}
              </p>
            </Card>
            <Card className="cursor-pointer w-fit-content min-w-32 max-w-44 h-32 bg-primary-foreground flex flex-col gap-2 p-3">
              <p className="text-center font-bold">Group</p>
              <p className="text-center text-base  line-clamp-3">grop name</p>
            </Card>
          </div>
        </>
      ) : (
        <>
          <p>Project not found</p>
        </>
      )}
    </>
  );
};

export default ProjectView;
