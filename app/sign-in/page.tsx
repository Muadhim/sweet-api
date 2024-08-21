import React from "react";
import SignInView from "@/views/signIn";
import { Metadata } from "next";
import { appName } from "@/constant";

export const metadata: Metadata = {
  title: `Sign In | ${appName}`,
  description: `Sign in to the ${appName} and enjoy its features.`,
};
const SignIn = () => {
  return <SignInView />;
};

export default SignIn;
