"use server";

import { getUserSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function checkoutItems(formValues: any) {
  const user = await getUserSession();
  formValues.userId = user.id;

  if (!user) {
    throw new Error("You must be signed in to add products to your cart");
  }

  //prisma function to create a new checkout history entry and use try catch to handle errors
  try {
    const req = await prisma.checkoutHistory.create({
      data: {
        course: formValues.course,
        userId: user.id,
        products: {
          connect: formValues.products,
        },
      },
      include: {
        products: true,
      },
    });
    return true; 
  } catch (error) {
    return false;
  }
  /*//this shit be wack need to figure out why the products dont work.
  const req = await fetch("https://shim-ventare.vercel.app/api/checkouthistory", {
    method: "POST",
    body: JSON.stringify(formValues),
  });
  const res = await req.json();

  return res;*/
  }