"use server";

import { getUserSession } from "@/lib/auth";
import { Product } from "./columns";

export async function addProductToCart({ product }: { product: Product }) {
  const user = await getUserSession();

  if (!user) {
    throw new Error("You must be signed in to add products to your cart");
  }

  console.log(user);
  console.log(product);

  const response = await fetch(
    `https://shim-ventare.vercel.app/api/cart/${user.cartId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: [
          {
            id: product.id,
            name: product.name,
            amount: product.amount,
            location: product.location,
            type: product.type,
            status: product.status,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  } else {
    return response.json();
  }
}
