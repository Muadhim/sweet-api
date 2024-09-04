import { Breadcrumbs } from "@/components/breadcrumbs";
import ProjectView from "@/views/project";
import React from "react";

const Project = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col">
      <Breadcrumbs breadcrumbs={[{ item: "Project" }]} />
      <br />
      <ProjectView projectId={Number(params.id)} />
    </div>
  );
};

export default Project;
