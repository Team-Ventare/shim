"use server";

import { getUserSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function checkoutItems(formValues: any) {
  const user = await getUserSession();
  formValues.userId = user.id;

  if (!user) {
    throw new Error("You must be signed in to add products to your cart");
  }

  //prisma function to create a new checkout history entry and use try catch to handle errors
  try {
    const reqP = await prisma.products.updateMany({
      where: {
        id: {
          in: formValues.products.id,
        },
      },
      data: {
        status: "CHECKED_OUT",
      },
    });

    const req = await prisma.checkoutHistory.create({
      data: {
        course: formValues.course,
        userId: user.id,
        products: {
          connect: formValues.products,
        },
      },
      include: {
        products: true,
      },
    });

    const reqCheckedOut = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        currentCheckout: {
          connect: formValues.products,
        },
      },
    });

    return reqP && req && reqCheckedOut;
  } catch (error) {
    console.log(error);
  }
}
