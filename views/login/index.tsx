import React, { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "@/auth";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { SignInResponse } from "next-auth/react";
import { redirect } from "next/navigation";

const LoginView = () => {
	const onSignIn = async () => {
		"use server";
		signIn("Credentials", {
			redirect: false,
			redirectTo: '/dashboard'
		}).then((res: SignInResponse | undefined) => {
			console.log("resuslta:", res);
			if (!res) {
				alert("No response!");
				return;
			}
			if (!res.ok) alert("Something went wrong!");
			else if (res.error) {
				console.log(res.error);
				alert(
					res.error === "CallbackRouteError"
						? "Could not login! Please check your credentials."
						: `Internal Server Error: ${res.error}`
				);
			} else {
				// redirect(callbackUrl);
				// else router.push("/");
			}
		});
	};

	const onGithubSignIn = async () => {
		"use server";
		await signIn("github", {redirectTo: "/dashboard"}).then((res) => {
			console.log("res", res);
		});
	};

	return (
		<div className="-mx-3 mt-32">
			<Card className="glass w-full m-3 h-[500px] max-w-[400px] mx-auto px-8 py-20 flex justify-center flex-col gap-4">
				<h1 className="text-center text-xl font-bold">SIGN IN</h1>
				<form action={onSignIn} className="flex justify-center flex-col gap-4">
					<Input placeholder="Email" type="email" name="email" required />
					<Input
						placeholder="Password"
						type="password"
						name="password"
						required
					/>
					<br />
					<a
						className="text-sm flex justify-between font-light"
						href="/forgot-password"
					>
						Forgot password?
					</a>
					<Button type="submit">Sign In</Button>
				</form>

				<div className="flex justify-center items-center w-full">
					<Separator className="w-1/2 " />
					<p>OR</p>
					<Separator className="w-1/2" />
				</div>

				<form className="w-full" action={onGithubSignIn}>
					<Button
						variant="outline"
						type="submit"
						className="w-full bg-secondary"
					>
						Signin with GitHub
					</Button>
				</form>
			</Card>
		</div>
	);
};

export default LoginView;
