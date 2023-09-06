"use server";

import { getUserSession } from "@/lib/auth";
import { Product } from "../../../app/(app)/products/columns";
import { revalidatePath } from "next/cache";
import { toast } from "@/components/ui/use-toast";

export async function addProductToCart({ product }: { product: Product }) {
  const user = await getUserSession();

  if (!user) {
    throw new Error("You must be signed in to add products to your cart");
  }

  if (!user.cartId) {
    throw new Error("You must have a cart to add products to your cart");
  }

  if (!product) {
    throw new Error("You must select a product to add to your cart");
  }

  if (product.status === "CHECKED_OUT") {
    throw new Error("You cannot add a product that is checked out");
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
