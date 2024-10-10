"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSendOtpHooks, useValidateOtpHooks } from "@/hooks/otp";
import { useToast } from "@/components/ui/use-toast";
import { useForgotPasswordHooks } from "@/hooks/forgotPassword";

const ForgotPasswordView = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [count, setCount] = useState<number>(60);
  const { handleSendOtp, isLoading: isLoadingSendOtp } = useSendOtpHooks();
  const { handleValidateOtp, isLoading: isLoadingValidateOtp } =
    useValidateOtpHooks();
  const { handleForgotPassword, isLoading: isLoadingForgotPassword } =
    useForgotPasswordHooks();
  const { toast } = useToast();

  const onSendEmail = () => {
    if (email === "") return;
    handleSendOtp(
      { email },
      { onSuccess: () => setStep(2), onError: () => setEmail("") }
    );
  };
  const onVerifyCode = () => {
    if (code === "") return;
    if (email === "") return setStep(1);
    handleValidateOtp(
      { email, otp: code },
      { onSuccess: () => setStep(3), onError: () => setCode("") }
    );
  };
  const onResetPassword = () => {
    if (password !== confirmPassword)
      return toast({ title: "Passwords do not match", variant: "destructive" });
    if (email === "") return setStep(1);
    if (code === "") return setStep(2);
    handleForgotPassword({ email, otp: code, new_password: password });
  };
  const onResendOtp = () => {
    setCount(60);
    if (email === "") return setStep(1);
    handleSendOtp({ email });
  };

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="-mx-3 mt-32 w-[calc(100vw-10px)]">
      <Card className="glass w-full m-3 h-[300px] max-w-[400px] mx-auto px-8 py-20 flex justify-center flex-col gap-4">
        <h1 className="text-center text-xl font-bold mb-8">Forgot Password</h1>
        {step === 1 && (
          <div className="flex justify-center flex-col gap-4">
            <Input
              placeholder="Email"
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={onSendEmail}>Send Email</Button>
          </div>
        )}

        {step === 2 && (
          <div className="flex justify-center flex-col gap-4 items-center">
            <InputOTP maxLength={6} onChange={setCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <span>Resend OTP in {count} seconds</span>
              {count === 0 && (
                <Button
                  className="w-full mt-5"
                  variant="ghost"
                  onClick={onResendOtp}
                >
                  Resend OTP
                </Button>
              )}
              <Button className="w-full mt-5" onClick={onVerifyCode}>
                Verify OTP
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex justify-center flex-col gap-4">
            <Input
              placeholder="New Password"
              type="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              name="comfirmPassword"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={onResetPassword}>Change Password</Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPasswordView;
