"use server";

import { getUserSession } from "@/lib/auth";

//ansyc function to delete a purchase request
export async function deletePR({ id }: { id: string }) {
    const session = await getUserSession();
    const req = await fetch(
        `https://shim-ventare.vercel.app/api/purchaserequest/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
    );
    const res = await req.json();
    return res;
}