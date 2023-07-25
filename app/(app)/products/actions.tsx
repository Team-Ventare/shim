"use server";

import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/auth";
import { Product } from "./columns";

export async function addProductToCart({ product }: { product: Product }) {
  const user = await getUserSession();

  if (!user) {
    throw new Error("You must be signed in to add products to your cart");
  }
  console.log(user.cartId);
  console.log(product.id);

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

  if (!req.ok) {
    throw new Error("Failed to add product to cart");
  } else {
    console.log(res);
  }

  /*
  const cart = await prisma.cart.update({
    where: {
      id: user.cartId,
    },
    include: {
      products: true,
    },
    data: {
      products: {
        connect: [
          {
            id: product.id,
          },
        ],
      },
    },
  });
  */
}
