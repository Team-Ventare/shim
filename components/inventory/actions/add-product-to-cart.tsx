"use server";

import { getUserSession } from "@/lib/auth";
import { Product } from "../../../app/(app)/products/columns";
import { revalidatePath } from "next/cache";

export async function addProductToCart({ product }: { product: Product }) {
  const user = await getUserSession();

  if (!user) {
    throw new Error("You must be signed in to add products to your cart");
  }

  const req = await fetch(
    `https://shim-ventare.vercel.app/api/cart/${user.cartId}`,
    {
      method: "PUT",
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
