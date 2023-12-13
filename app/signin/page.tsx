"use client";

import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserAuthFormSignIn } from "@/components/auth/user-auth-sign-in";

export default function AuthenticationPage() {
  return (
    <div className="h-screen w-screen">
      <div className="relative h-screen flex-col items-center justify-center lg:max-w-none lg:px-0">
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Create Account
        </Link>
        <div className="lg:p-8 h-screen w-screen justify-center flex items-center">
          <div className="m-auto flex flex-col justify-center space-y-6 w-[350px] lg:w-[450px] pb-8">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to continue.
              </p>
            </div>
            <UserAuthFormSignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
