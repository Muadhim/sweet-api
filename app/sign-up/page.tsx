import { appName } from "@/constant";
import SignUpView from "@/views/signUp";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Sign Up | ${appName}`,
  description: "Create an account and explore free features",
};
const SignUp = () => {
  return <SignUpView />;
};

export default SignUp;
