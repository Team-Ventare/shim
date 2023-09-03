"use server";
import { revalidatePath } from "next/cache";

//ansyc function to refresh the cart page
export async function refreshCart() { 
    revalidatePath("/cart");
  }