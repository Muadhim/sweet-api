import { appName } from "@/constant";
import ForgotPasswordView from "@/views/forgot-password";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Forgot Password | ${appName}`,
  description: `Forgot Password?`,
};

const ForgotPassword = () => {
  return <ForgotPasswordView />;
};

export default ForgotPassword;
