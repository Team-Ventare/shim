"use server";

import { getUserSession } from "@/lib/auth";
import { Product } from "./columns";

export async function deleteFromCart({ product }: { product: Product }) {
  const user = await getUserSession();

  if (!user) {
    throw new Error("You must be signed in to delete products to your cart");
  }
  console.log(user.cartId);
  console.log(product.id);

  const req = await fetch(
    `https://shim-ventare.vercel.app/api/cart/${user.cartId}`,
    {
      method: "DELETE",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ pid: product.id }),
    }
  );
  const res = await req.json();

  if (!req.ok) {
    throw new Error("Failed to add product to cart");
  } else {
    console.log(res);
  }
}