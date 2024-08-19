"use client";

import { isTokenExpired } from "@/utils/checkToken";
import { getUserCookie } from "@/utils/userCookie";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const user = getUserCookie();
  const token = user?.access_token;

  useEffect(() => {
    // Redirect to '/sign-in' if the token is invalid or expired, and the user is not on the root page
    if (
      pathname !== "/" &&
      pathname !== "/sign-up" &&
      (!token || isTokenExpired(token))
    ) {
      router.push("/sign-in");
    } else if (
      token &&
      !isTokenExpired(token) &&
      (pathname === "/sign-in" || pathname === "/sign-up")
    ) {
      router.push("/dashboard");
    }
  }, [token, pathname, router]);

  return <div>{children}</div>;
};

export default Auth;
