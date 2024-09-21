import ProjectDetailView from "@/views/project_detail";
import React from "react";

const ProejctDetail = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col">
      <ProjectDetailView projectId={Number(params.id)} />
    </div>
  );
};

export default ProejctDetail;
