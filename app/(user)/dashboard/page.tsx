import { Breadcrumbs } from "@/components/breadcrumbs";
import React from "react";

const breadcrumbs = [
	{ item: "test a", link: "" },
	{ item: "test b", link: "" },
	{ item: "test c", link: "" },
	{ item: "test d", link: "" },
];

const Dashboard = () => {
	return (
		<>
			<div>Dashboard</div>
			<Breadcrumbs breadcrumbs={breadcrumbs} />
		</>
	);
};

export default Dashboard;
