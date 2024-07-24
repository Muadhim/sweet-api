import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const Login = () => {
	return (
		<div className="-mx-3x">
			<Card className="glass w-full m-3 h-[500px] max-w-[400px] mt-32 mx-auto px-16 py-20 flex justify-center flex-col gap-4">
				<h1 className="text-center text-xl font-bold">LOGIN</h1>
				<Input placeholder="Email" />
				<Input placeholder="Password" type="password" />
				<br />
				<div className="text-sm flex justify-between font-light">
					<Link href="/register">Register</Link>
					<Link href="/forgot">Forgot password?</Link>
				</div>
				<Button>Login</Button>
			</Card>
		</div>
	);
};

export default Login;
