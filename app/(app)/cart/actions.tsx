"use server";

import { getUserSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Product } from "../products/columns";
import prisma from "@/lib/prisma";

//ansyc function to refresh the cart page
export async function refreshCart() { 
  revalidatePath("/cart");
}

export async function deleteItemFromCart({ product }: { product: Product }) {
  const user = await getUserSession();

  if (!user) {
    throw new Error("You must be signed in to add products to your cart");
  }

  const req = await fetch(
    `https://shim-ventare.vercel.app/api/cart/${user.cartId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pid: product.id }),
    }
  );
  const res = await req.json();

  //revalidatePath("/cart");
  return res;
}

export async function checkoutItems({ ids }: { ids: string[] }) {
  const user = await getUserSession();

  if (!user) {
    throw new Error("You must be signed in to add products to your cart");
  }

  const created = await prisma.checkoutHistory.create({
    data: {
      course:'test',
      userId: user.id,
      products: {
        connect: ids.map((id) => ({ id })),
      },
    },
    include: {
      products: true,
    },
  });
  //revalidatePath("/cart");
  //return(JSON.stringify(created));
}
