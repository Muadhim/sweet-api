import SignUpView from "@/views/signUp";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up | Sweet API",
  description: "Create an account and explore free features",
};
const SignUp = () => {
  return <SignUpView />;
};

export default SignUp;
