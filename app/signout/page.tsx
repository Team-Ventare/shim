"use client";

import { auth } from "../lib/firebase";
import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  // Handle Sign Out Function - Nicholas 06/28/2023
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Call the sign-out function and navigate to "/signin" after component mounts
    handleSignOut().then(() => {
      router.push("/signin");
    });
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("User signed in: ", uid);
      } else {
        console.log("User signed out");
      }
    });

    return () => unsubscribe();
  }, []);

  return <></>;
}
