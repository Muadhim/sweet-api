import useProjectStore from "@/store/project";
import React from "react";

const ApiView = () => {
  const projectApi = useProjectStore((store) => store.projectApi);
  return (
    <div className="flex flex-col w-full">
      <div>
        {projectApi.method} {projectApi.path}
      </div>
      <div>{projectApi.description}</div>
      <div>{projectApi.request}</div>
      <div>{projectApi.example_request}</div>
      <div>{projectApi.response}</div>
      <div>{projectApi.example_response}</div>
    </div>
  );
};

export default ApiView;
