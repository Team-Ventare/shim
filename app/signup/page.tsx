"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserAuthFormSignUp } from "@/components/auth/user-auth-sign-up";

export default function AuthenticationPage() {
  return (
    <div className="h-screen w-screen">
      <div className="relative h-screen flex-col items-center justify-center lg:max-w-none lg:px-0">
        <Link
          href="/signin"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>

        <div className="lg:p-8 bg-purple-300 h-screen w-screen justify-center flex items-center">
          <div className="m-auto flex flex-col justify-center space-y-6 w-[350px] lg:w-[450px] pb-8">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthFormSignUp />
          </div>
        </div>
      </div>
    </div>
  );
}
