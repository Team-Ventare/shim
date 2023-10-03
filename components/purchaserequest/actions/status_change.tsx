"use server";

import { PurchaseRequest } from "@/app/(app)/requests/columns";
import { redirect } from "next/navigation";

//update the status of that request to whatever the user selects
export async function UpdateStatusAccept({ id }: { id: string }) {
    const res = await fetch(
      `https://shim-ventare.vercel.app/api/purchaserequests/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "APPROVED",
        }),
      }
    );
    if (res.ok) {
      redirect("/requests");
    }
    console.log(JSON.stringify({
        status: "APPROVED",
      }));
}
export async function UpdateStatusReject({ id }: { id: string }) {
    const res = await fetch(
        `https://shim-ventare.vercel.app/api/purchaserequests/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "REJECTED",
          }),
        }
      );
      if (res.ok) {
        redirect("/requests");
      }
}