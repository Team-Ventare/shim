"use server";
import { revalidateTag } from "next/cache";

export async function revalidateNews() {
  revalidateTag("news");
}
