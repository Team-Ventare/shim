"use server";

import { hash } from "bcrypt";

export async function createUser({ data }: { data: any }) {
  const { name, email, password } = data;
  const hashed = await hash(password, 12);

  try {
    const res = await fetch("https://shim-ventare.vercel.app/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: hashed,
        cart: {
          create: {},
        },
      }),
    });
    return res.status;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
