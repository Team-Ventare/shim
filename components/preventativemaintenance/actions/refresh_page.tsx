"use server";
import { revalidatePath } from "next/cache";

//ansyc function to refresh the maintenance page
export async function refresh_PM() { 
    revalidatePath("/maintenance");
  }