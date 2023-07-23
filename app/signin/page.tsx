"use client";

import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { UserAuthFormSignIn } from "@/components/auth/user-auth-sign-in";

export default function AuthenticationPage() {
  const [error, setError] = useState(false);

  return (
    <div className="h-screen w-screen">
      <div className="md:hidden">
        <Image
          src="/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {error && (
          <div className="bg-red-50 dark:bg-gray-800 border border-red-400 p-4 rounded-lg mb-4">
            <div className="flex justify-between">
              <p className="text-red-800 dark:text-red-400 text-md">
                <span className="font-medium">Oops! </span>
                Invalid email or password. Please try again.
              </p>
              <div className="flex-shrink-0">
                <RxCross2
                  onClick={() => setError(false)}
                  className="text-lg bg-red-50 dark:bg-gray-800 text-red-800 dark:text-red-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Create Account
        </Link>
        <div className="relative hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            S.H.I.M Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This application has saved me and my team countless hours
                of work and helped me deliver immense productivity.&rdquo;
              </p>
              <footer className="text-sm">Nicholas Moreland</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to continue.
              </p>
            </div>
            <UserAuthFormSignIn setError={() => setError(true)} />
          </div>
        </div>
      </div>
    </div>
  );
}
