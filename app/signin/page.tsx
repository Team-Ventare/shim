"use client";

import { BiLockAlt } from "react-icons/bi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Header } from "../components/Header";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState(false);

  // Handle Sign In Function - Nicholas 06/28/2023
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      console.log(user);

      router.push("/");
    } catch (error: any | FirebaseError) {
      setSignInError(true);
      console.log(error);
    }
  };

  // Listening for Auth State Changes - Nicholas 06/28/2023
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("User signed in: ", uid);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={theme == "dark" ? "dark" : undefined}>
      <div className="min-h-screen min-w-screen max-w-screen bg-white dark:bg-slate-900">
        <Header />

        <div className="mx-auto min-w-screen px-6 py-4 md:px-12 md:py-8 lg:px-24 xl:px-32 2xl:px-40">
          {/* Sign In Header */}
          {signInError ? (
            <>
              <div className="bg-red-50 dark:bg-gray-800 border border-red-400 p-4 rounded-lg mb-4">
                <div className="flex justify-between">
                  <p className="text-red-800 dark:text-red-400 text-md">
                    <span className="font-medium">Oops! </span>
                    Invalid email or password. Please try again.
                  </p>
                  <div className="flex-shrink-0">
                    <RxCross2
                      onClick={() => setSignInError(false)}
                      className="text-lg bg-red-50 dark:bg-gray-800 text-red-800 dark:text-red-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : undefined}

          {/* Sign Up Form */}
          <form onSubmit={handleSignIn}>
            {/* Email Field */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* Password Field */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <BiLockAlt className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
