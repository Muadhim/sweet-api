import { Breadcrumbs } from "@/components/breadcrumbs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | Sweet API",
  description:
    "Use the dashboard to manage your API keys, manage your APIs, and manage your team members.",
};

const Dashboard = () => {
  return (
    <>
      <Breadcrumbs />
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
