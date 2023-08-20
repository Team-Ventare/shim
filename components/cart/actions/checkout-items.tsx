"use server";

import { getUserSession } from "@/lib/auth";


export async function checkoutItems(formValues: any) {
  const user = await getUserSession();
  formValues.userId = user.id;

  if (!user) {
    throw new Error("You must be signed in to add products to your cart");
  }
  
  const req = await fetch("https://shim-ventare.vercel.app/api/checkouthistory", {
    method: "POST",
    body: JSON.stringify(formValues),
  });
  const res = await req.json();

  return res;
  }