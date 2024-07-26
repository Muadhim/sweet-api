"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { SignInResponse } from "next-auth/react";
import { Route } from "next";
const LoginView = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		const callbackUrl = searchParams.get("callbackUrl");
		e.preventDefault();
		signIn("credentials", {
			redirect: false,
			username,
			password,
		}).then((res: SignInResponse | undefined) => {
			if (!res) {
				alert("No response!");
				return;
			}

			if (!res.ok) alert("Something went wrong!");
			else if (res.error) {
				console.log(res.error);

				if (res.error == "CallbackRouteError")
					alert("Could not login! Please check your credentials.");
				else alert(`Internal Server Error: ${res.error}`);
			} else {
				if (callbackUrl) router.push(callbackUrl as Route);
				else router.push("/");
			}
		});
	};

	return (
		<div className="-mx-3 mt-32">
			<Card className="glass w-full m-3 h-[500px] max-w-[400px] mx-auto px-8 py-20 flex justify-center flex-col gap-4">
				<h1 className="text-center text-xl font-bold">SIGN IN</h1>
				<form
					onSubmit={handleSubmit}
					className="flex justify-center flex-col gap-4"
				>
					<Input
						placeholder="Email"
						type="email"
						name="email"
						required
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						placeholder="Password"
						type="password"
						name="password"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br />
					<div className="text-sm flex justify-between font-light">
						<a href="/forgot">Forgot password?</a>
					</div>
					<Button type="submit">Sign In</Button>
				</form>
			</Card>
		</div>
	);
};

export default LoginView;
