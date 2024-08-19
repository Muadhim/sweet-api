"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import Navigation from "./navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstChar } from "@/utils/getFirstChar";
import { getUserCookie } from "@/utils/userCookie";
import { deleteCookie } from "cookies-next";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const user = getUserCookie();

  return (
    <header className="w-full fixed top-2 z-50">
      <Card className="flex glass max-w-[1200px] w-full h-14 mx-auto justify-between items-center p-4">
        <h1
          className="text-xl font-bold cursor-pointer text-primary"
          onClick={() => router.push("/")}
        >
          Sweet API
        </h1>
        <Navigation />
        <div className="flex gap-2">
          {!!user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar>
                    <AvatarImage src={user.image || ""} alt="user-profile" />
                    <AvatarFallback>
                      {getFirstChar(user?.name || "")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="w-[250px] text-sm p-2 gap-2 flex flex-col">
                  <p className="text-end truncate">{user.name}</p>
                  <p className="text-end truncate">{user.email}</p>
                  <Button
                    variant="default"
                    className="mt-6 mx-auto"
                    onClick={() => {
                      deleteCookie("user");
                      router.push("/sign-in");
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" onClick={() => router.push("/sign-up")}>
                Sign Up
              </Button>
              {!pathname.includes("/sign-in") && (
                <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
              )}
            </>
          )}

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
