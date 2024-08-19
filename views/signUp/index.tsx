"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import React from "react";
import useSignUpHooks from "./hooks";

const SignUpView = () => {
  const { method } = useSignUpHooks();
  const { toast } = useToast();
  const onSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    if (formData.get("password") !== formData.get("comfirmPassword"))
      return toast({ title: "Passwords do not match", variant: "destructive" });

    method.signUp({
      user: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };

  return (
    <div className="-mx-3 mt-32">
      <Card className="glass w-full m-3 h-[500px] max-w-[400px] mx-auto px-8 py-20 flex justify-center flex-col gap-4">
        <h1 className="text-center text-xl font-bold">SIGN UP</h1>
        <form
          onSubmit={onSignUp}
          method="post"
          className="flex justify-center flex-col gap-4"
        >
          <Input placeholder="Username" type="text" name="username" required />
          <Input placeholder="Email" type="email" name="email" required />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            required
          />

          <Input
            placeholder="Comfirm Password"
            type="password"
            name="comfirmPassword"
            required
          />
          <br />
          <Button type="submit">Sign Up</Button>
        </form>
      </Card>
    </div>
  );
};

export default SignUpView;
