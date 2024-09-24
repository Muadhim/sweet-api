"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import useGetProjectTreeHooks from "@/hooks/project/getProjectTree";
import useProjectStore from "@/store/project";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApiView from "./apiView";
import ApiEditor from "./apiEditor";

interface props {
  projectId: number;
}

const ProjectDetailView: React.FC<props> = ({ projectId }) => {
  const projectTree = useProjectStore((state) => state.projectTree);
  const projectApi = useProjectStore((state) => state.projectApi);
  const setProjectId = useProjectStore((state) => state.setProjectId);
  const { setPid } = useGetProjectTreeHooks();
  const breadcrumbs = [
    { item: "Project", link: `/project/${projectId}` },
    { item: projectTree.project_name },
  ];
  useEffect(() => {
    setPid(projectId);
    setProjectId(projectId);
  }, [projectId]);

  return (
    <div className="flex flex-col">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <br />
      {!projectApi.id && <div>api</div>}

      {projectApi.id && (
        <Tabs
          defaultValue={projectApi.path ? "api" : "edit"}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="api" className="w-[100px]">
              Api
            </TabsTrigger>
            <TabsTrigger value="edit" className="w-[100px]">
              Edit
            </TabsTrigger>
          </TabsList>
          <TabsContent value="api">
            <ApiView />
          </TabsContent>
          <TabsContent value="edit">
            <ApiEditor />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ProjectDetailView;
