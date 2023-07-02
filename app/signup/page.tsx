"use client";

import { BiLockAlt, BiLockOpenAlt, BiUser } from "react-icons/bi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Header } from "../components/Header";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { RxCross2 } from "react-icons/rx";
import { prisma } from "@/lib/prisma";
import Router from "next/router";

export default async function SignUp() {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const body = { name, email };
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (e: any) {
      console.error(e);
    }
  };

  // Listening for Auth State Changes - Nicholas 06/27/2023
  /*
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("User signed in: ", uid);
      }
    });
    return () => unsubscribe();
  }, []);
  */

  return (
    <div className="min-h-screen min-w-screen max-w-screen bg-white dark:bg-slate-900">
      <Header />

      <div className="mx-auto min-w-screen px-6 py-4 md:px-12 md:py-8 lg:px-24 xl:px-32 2xl:px-40">
        {/* Sign Up Header */}
        {showError ? (
          <>
            <div className="bg-red-50 dark:bg-gray-800 border border-red-400 p-4 rounded-lg mb-4">
              <div className="flex justify-between">
                <p className="text-red-800 dark:text-red-400 text-md">
                  <span className="font-medium">Oops! </span> {errorMessage}
                </p>
                <div className="flex-shrink-0">
                  <RxCross2
                    onClick={() => setShowError(false)}
                    className="text-lg bg-red-50 dark:bg-gray-800 text-red-800 dark:text-red-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </>
        ) : undefined}

        {/* Sign Up Form */}
        <form onSubmit={handleSignUp}>
          {/* Name Field */}
          <div className="grid gap-6 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <BiUser className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>
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
            {password.length == 0 ? (
              <>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BiLockOpenAlt className="w-5 h-5 text-gray-500 dark:text-gray-400" />
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
              </>
            ) : (
              <>
                {password.length >= 6 ? (
                  <>
                    <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <BiLockAlt className="w-5 h-5 text-green-500 dark:text-green-400" />
                      </div>
                      <input
                        type="password"
                        className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-green-500"
                        placeholder="•••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done! </span>
                      Your password meets our requirements.
                    </p>
                  </>
                ) : (
                  <>
                    <label className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <BiLockOpenAlt className="w-5 h-5 text-red-500 dark:text-red-400" />
                      </div>
                      <input
                        type="password"
                        className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full pl-10 p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                        placeholder="•••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">Oh, snapp! </span>
                      Your password must be atleast six characters.
                    </p>
                  </>
                )}
              </>
            )}
          </div>
          {/* Password Confirm Field */}
          <div className="mb-6">
            {passwordConfirm.length == 0 ? (
              <>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BiLockOpenAlt className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••"
                    required
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                {password === passwordConfirm ? (
                  <>
                    <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <BiLockAlt className="w-5 h-5 text-green-500 dark:text-green-400" />
                      </div>
                      <input
                        type="password"
                        className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-green-500"
                        placeholder="•••••••••"
                        required
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                    </div>
                    <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done! </span>
                      Both passwords match our requirements.
                    </p>
                  </>
                ) : (
                  <>
                    <label className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <BiLockOpenAlt className="w-5 h-5 text-red-500 dark:text-red-400" />
                      </div>
                      <input
                        type="password"
                        className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full pl-10 p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                        placeholder="•••••••••"
                        required
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                    </div>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">Oh, snapp! </span>
                      Both passwords must match.
                    </p>
                  </>
                )}
              </>
            )}
          </div>
          {/* Sign Up Button */}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
