"use server";
import { revalidatePath } from "next/cache";

//ansyc function to refresh the purchase request page
export async function refresh_PRODUCT() { 
    revalidatePath("/products");
  }