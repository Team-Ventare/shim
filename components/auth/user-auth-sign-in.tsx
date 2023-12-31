"use client";

import * as React from "react";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormData {
  email: string | undefined;
  password: string | undefined;
}

export function UserAuthFormSignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const { email, password } = formData;
    try {
      const res = await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: "/",
      });

      if (res?.ok) router.push("/");
    } catch (error: any) {
      console.error(error);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.email}
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  email: event.target.value,
                }));
              }}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              value={formData.password}
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }));
              }}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
