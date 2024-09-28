"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProjectHooks } from "@/hooks/project";
import useDeleteProjectHooks from "@/hooks/project/deleteProject";
import useProjectStore from "@/store/project";
import { getUserCookie } from "@/utils/userCookie";
import { EllipsisVertical, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useMemo } from "react";
import AddMemeberDialog from "./addMemeberDialog";

interface Props {
  projectId: number;
}
const ProjectView: FC<Props> = ({ projectId }) => {
  const { isLoading, setPid } = useGetProjectHooks();
  const { deleteProject } = useDeleteProjectHooks();
  const project = useProjectStore((state) => state.project);
  const user = getUserCookie();
  const router = useRouter();

  const isAuthor = useMemo(() => {
    return project.author_id === user?.id;
  }, [user, project]);

  const onClickDelete = () => {
    deleteProject(projectId);
    router.push("/dashboard");
  };
  const onClickProject = () => {
    router.push(`/project/${projectId}/detail`);
  };

  useEffect(() => {
    setPid(projectId);
  });

  return (
    <>
      {isLoading ? (
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
            {isAuthor ? (
              <Badge variant="success">Author</Badge>
            ) : (
              <Badge variant="warning">Member</Badge>
            )}
          </div>
          <br />
          <div className="flex gap-4">
            <Card className="w-60 h-40 bg-primary-foreground flex flex-col gap-2 p-3">
              <div className="flex flex-row justify-between mb-3">
                <p className="text-start font-bold">Project</p>
                {isAuthor && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={onClickDelete}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <div
                className="cursor-pointer flex w-full h-full justify-center items-center"
                onClick={onClickProject}
              >
                <p className="text-base line-clamp-3">{project.name}</p>
              </div>
            </Card>
            <Card className="w-60 h-40 bg-primary-foreground flex flex-col gap-2 p-3">
              <div className="flex flex-row justify-between items-center mb-3">
                <p className="text-start font-bold">Members</p>
                {isAuthor && <AddMemeberDialog />}
              </div>
              <div
                className="cursor-pointer flex w-full h-full justify-center items-center"
                onClick={onClickProject}
              >
                <p className="text-4xl font-bold line-clamp-3">
                  {project.members?.length || 0}
                </p>
              </div>
            </Card>
            {/* <Card className="cursor-pointer  w-60 h-40 bg-primary-foreground flex flex-col gap-2 p-3">
              <p className="text-start font-bold">Group</p>
              <div className="flex w-full h-full justify-center items-center">
                <p className="text-base line-clamp-3">group name</p>
              </div>
            </Card> */}
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
