"use client";
import JoinProjectView from "@/views/joinProject";
import React, { Suspense } from "react";

const JoinProject = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JoinProjectView />
    </Suspense>
  );
};

export default JoinProject;
