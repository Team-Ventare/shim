"use server";

import { getUserSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Product } from "../products/columns";

export async function deleteFromCart({ product }: { product: Product }) {
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

  revalidatePath("/cart");
  return res;
}
