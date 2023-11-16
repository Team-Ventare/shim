"use server";

import { getUserSession } from "@/lib/auth";

//ansyc function to delete a purchase request
export async function deletePR({ id }: { id: string }) {
  //get user 
  const user = await getUserSession();
  //if user is not an admin, return error
  if(user.role !== "Admin") {
    return { error: "You must be an admin to delete a purchase request" };
  }
  const req = await fetch(
      `https://shim-ventare.vercel.app/api/purchaserequests/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
  );
  const res = await req.json();
  return res;
}