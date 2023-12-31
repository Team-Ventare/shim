"use client";

import * as React from "react";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { createUser } from "./create-user";
import { ca } from "date-fns/locale";

interface FormData {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  password_confirmation: string | undefined;
}

export function UserAuthFormSignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormData>({
    name: undefined,
    email: undefined,
    password: undefined,
    password_confirmation: undefined,
  });
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const { name, email, password, password_confirmation } = formData;
    if (!name || !email || !password || !password_confirmation) {
      setError("Please fill in all fields");
    }

    if (password !== password_confirmation) {
      setError("Passwords do not match");
    }
    try {
      const status = await createUser({ data: formData });
      console.log(status);
    } catch (error: any) {
      setError(error.message);
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
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.name}
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  name: event.target.value,
                }));
              }}
            />
          </div>
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
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password-confirmation"
              placeholder="Password Confirmation"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              value={formData.password_confirmation}
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  password_confirmation: event.target.value,
                }));
              }}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
}
