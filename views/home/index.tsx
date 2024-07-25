import { redirect } from "next/navigation";
import React from "react";

const HomeView = () => {
	const handleRegisterClick = async () => {
		"use server";
		redirect("/register");
	};

	return (
		<div className="flex flex-col text-center justify-center mt-32 gap-y-4">
			<h1 className="text-2xl font-bold text-primary">Welcome to Sweet API!</h1>
			<div className="w-[600px] mx-auto text-center">
				<h2 className="text-secondary-foreground">
					Create and manage your API documentation effortlessly. Best of all,
					Sweet API is completely free to use. Start today and enjoy all our
					features at no cost!
				</h2>
				<div className="flex gap-1 justify-center mt-2">
					<p className="text-secondary-foreground">
						What are you waiting for?{" "}
					</p>
					<form action={handleRegisterClick}>
						<button type="submit" className="text-primary font-bold">
							Register Now!
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default HomeView;
