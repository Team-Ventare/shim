"use server";

import { getUserSession } from "@/lib/auth";
import prisma from "@/lib/prisma";


export async function checkoutItems({ ids }: { ids: string[] }) {
    const user = await getUserSession();
  
    if (!user) {
      throw new Error("You must be signed in to add products to your cart");
    }
  
    const created = await prisma.checkoutHistory.create({
      data: {
        course:'test',
        userId: user.id,
        products: {
          connect: ids.map((id) => ({ id })),
        },
      },
      include: {
        products: true,
      },
    });
    //revalidatePath("/cart");
    //return(JSON.stringify(created));
  }