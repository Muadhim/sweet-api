"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useJoinProjectHooks from "@/hooks/project/joinProject";
import { getUserCookie } from "@/utils/userCookie";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const JoinProjectView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = getUserCookie();
  const token = user?.access_token || "";
  const { isLoading, handleJoinProject } = useJoinProjectHooks();
  const joinToken = searchParams.get("token") || "";
  const onJoinProject = async () => {
    await handleJoinProject({
      token: getCookie("pToken") || joinToken || "",
    });
    deleteCookie("pToken");
  };
  const onLogin = () => {
    setCookie("pToken", joinToken);
    router.push("/sign-in");
  };
  const onBackToHome = () => {
    router.push("/dashboard");
    deleteCookie("pToken");
  };
  return (
    <div className="w-full h-screen">
      <div className="w-full max-w-[1400px] mx-auto mx-auto flex justify-center items-center flex-col">
        <h1 className="font-bold my-10">
          Join the project and start collaborating together
        </h1>
        <p className="text-primary">Token</p>
        <Textarea
          className="w-[500px] text-wrap border mt-2 mb-10 resize-none h-fit !opacity-100"
          disabled
        >
          {getCookie("pToken") || joinToken}
        </Textarea>
        {token !== "" ? (
          <Button onClick={onJoinProject} className="w-fit">
            Join Project
          </Button>
        ) : (
          <Button onClick={onLogin} className="w-fit">
            Login
          </Button>
        )}
        <Button onClick={onBackToHome} variant="secondary" className="my-8">
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default JoinProjectView;
