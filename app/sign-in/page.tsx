import React from "react";
import SignInView from "@/views/signIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Sweet API",
  description: "Sign in to the Sweet API and enjoy its features.",
};
const SignIn = () => {
  return <SignInView />;
};

export default SignIn;
