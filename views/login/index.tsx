"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import useLoginHook from "./hooks";
const LoginView = () => {
	const { data, method } = useLoginHook();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		method.handleLogin({ email, password });
	};

	return (
		<div className="-mx-3 mt-12">
			<Card className="glass w-full m-3 h-[500px] max-w-[400px] mx-auto px-16 py-20 flex justify-center flex-col gap-4">
				<h1 className="text-center text-xl font-bold">LOGIN</h1>
				<form
					onSubmit={handleOnSubmit}
					className="flex justify-center flex-col gap-4"
				>
					<Input
						placeholder="Email"
						type="email"
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder="Password"
						type="password"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br />
					<div className="text-sm flex justify-between font-light">
						<Link href="/register">Register</Link>
						<Link href="/forgot">Forgot password?</Link>
					</div>
					<Button type="submit">Login</Button>
				</form>
			</Card>
		</div>
	);
};

export default LoginView;
