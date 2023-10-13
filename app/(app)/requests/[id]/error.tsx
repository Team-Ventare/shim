"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8 h-screen">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Request not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldnt find the request you were looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href="/requests">Go Back</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
