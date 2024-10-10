"use client";
import React, { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import useSignInHooks from "./hooks";
import LoadingOverlay from "@/components/loadingOverlay";

const SignInView = () => {
  const { method, data } = useSignInHooks();
  const onSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    method.signIn({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };

  const onGithubSignIn = async () => {};

  return (
    <div className="-mx-3 mt-32 w-[calc(100vw-10px)]">
      <LoadingOverlay isLoading={data.isLoading} />
      <Card className="glass w-full m-3 h-[500px] max-w-[400px] mx-auto px-8 py-20 flex justify-center flex-col gap-4">
        <h1 className="text-center text-xl font-bold">SIGN IN</h1>
        <form
          onSubmit={onSignIn}
          method="post"
          className="flex justify-center flex-col gap-4"
        >
          <Input placeholder="Email" type="email" name="email" required />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            required
          />
          <br />
          <a
            className="text-sm flex justify-between font-light"
            href="/forgot-password"
          >
            Forgot password?
          </a>
          <Button type="submit">Sign In</Button>
        </form>

        {/* <div className="flex justify-center items-center w-full">
          <Separator className="w-1/2 " />
          <p>OR</p>
          <Separator className="w-1/2" />
        </div>

        <form className="w-full" action={onGithubSignIn}>
          <Button
            variant="outline"
            type="submit"
            className="w-full bg-secondary"
          >
            Signin with GitHub
          </Button>
        </form> */}
      </Card>
    </div>
  );
};

export default SignInView;
