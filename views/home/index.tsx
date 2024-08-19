import { Button } from "@/components/ui/button";
import { getUserCookie } from "@/utils/userCookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const HomeView = () => {
  const user = getUserCookie();
  const router = useRouter();
  return (
    <div className="flex flex-col text-center justify-center mt-32 gap-y-4">
      <h1 className="text-2xl font-bold text-primary">Welcome to Sweet API!</h1>
      {user ? (
        <div className="flex gap-10 flex-col mx-auto">
          <h2 className="text-secondary-foreground"> Enjoy your app</h2>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Go To Dashboard
          </Button>
        </div>
      ) : (
        <div className="w-[600px] mx-auto text-center">
          <h2 className="text-secondary-foreground">
            Create and manage your API documentation effortlessly. Best of all,
            Sweet API is completely free to use. Start today and enjoy all our
            features at no cost!
          </h2>
          <div className="flex gap-1 justify-center mt-2">
            <p className="text-secondary-foreground">
              What are you waiting for?{" "}
            </p>
            <Link href="/sign-up" className="text-primary font-bold">
              Register Now!
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
