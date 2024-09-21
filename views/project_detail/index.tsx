"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import useGetProjectTreeHooks from "@/hooks/project/getProjectTree";
import useProjectStore from "@/store/project";
import React, { useEffect } from "react";

interface props {
  projectId: number;
}
const ProjectDetailView: React.FC<props> = ({ projectId }) => {
  const projectTree = useProjectStore((state) => state.projectTree);
  const { setPid } = useGetProjectTreeHooks();
  const breadcrumbs = [
    { item: "Project", link: `/project/${projectId}` },
    { item: projectTree.project_name },
  ];
  useEffect(() => {
    setPid(projectId);
  }, [projectId]);
  return (
    <div className="flex flex-col">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <br />
      ProjectDetailView
    </div>
  );
};

export default ProjectDetailView;
