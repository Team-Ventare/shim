"use server";

import { getUserSession } from "@/lib/auth";

export async function addProductToCart(name: string, id: string) {
  const user = await getUserSession();

  if (!user) {
    throw new Error("You must be signed in to add products to your cart");
  }

  console.log(user);
  /*
  try {
    const user = await getUserSession();

    if (!user) {
      throw new Error("You must be signed in to add products to your cart");
    }

    const response = await fetch(
      `https://shim-ventare.vercel.app/api/cart/${user.cartId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: id }),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to add product to cart: ${errorMessage}`);
    }

    console.log("Product added to cart successfully.");
  } catch (error) {
    console.error(error);
  }
  */
}
