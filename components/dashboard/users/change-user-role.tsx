"use server"

import { User } from "@/app/(app)/dashboard/page";
import { refresh_dash } from "../refresh_page";
  
export async function ChangeUserRole({ newRole, userInfo }: { userInfo: User , newRole: String }) {
  //console.log("data", userInfo, newRole);
  const req = await fetch(`https://shim-ventare.vercel.app/api/users/${userInfo.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      role: newRole,
    }),
  });
  const res = await req.json();
  return res;
}