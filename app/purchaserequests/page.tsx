"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Nav } from "../nav/navbar";
import React from "react";
import { useTheme } from "next-themes";

export default function PurchaseRequests() {
  const { theme, setTheme } = useTheme();
  const [user] = useAuthState(auth);

  return (
    <div className={theme == "dark" ? "dark" : undefined}>
      <div className="min-h-screen min-w-screen max-w-screen bg-white dark:bg-slate-900">
        <Nav />
        <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full text-center">
          <h1>HELLO WORLD</h1>
          <p>Add Some Content</p>
        </div>
      </div>
    </div>
  );
}
