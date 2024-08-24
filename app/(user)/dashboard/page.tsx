import { Breadcrumbs } from "@/components/breadcrumbs";
import { appName } from "@/constant";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Dashboard | ${appName}`,
  description:
    "Use the dashboard to manage your API keys, manage your APIs, and manage your team members.",
};

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <Breadcrumbs />
      <br />
      <div>Dashboard</div>
    </div>
  );
};

export default Dashboard;
