import React from "react";

const Project = ({ params }: { params: { id: string } }) => {
  return <div>Project {params.id}</div>;
};

export default Project;
