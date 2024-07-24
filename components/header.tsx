"use client";

import React from "react";
import { Card } from "./ui/card";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Navigation from "./navigation";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
	const { setTheme } = useTheme();
	const router = useRouter();

	return (
		<header className="w-full fixed top-2 z-50">
			<Card className="flex glass max-w-[1200px] w-full h-14 mx-auto justify-between items-center p-4">
				<h1
					className="text-xl font-bold cursor-pointer"
					onClick={() => router.push("/")}
				>
					Sweet API
				</h1>
				<Navigation />
				<div className="flex gap-2">
					<Button onClick={() => router.push("/login")}>Login</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon">
								<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
								<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
								<span className="sr-only">Toggle theme</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setTheme("light")}>
								Light
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>
								Dark
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("system")}>
								System
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</Card>
		</header>
	);
};

export default Header;
