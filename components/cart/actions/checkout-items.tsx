"use server";

import { Product } from "@/app/(app)/products/columns";
import { getUserSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function checkoutItems(formValues: any) {
  const user = await getUserSession();
  formValues.userId = user.id;

  if (!user) {
    throw new Error("You must be signed in to checkout products.");
  }

  try {
    formValues.products.forEach(async (product: Product) => {
      if (product.type === "CONSMABLE_SUPPLIES") {
        const req = await prisma.products.update({
          where: {
            id: product.id,
          },
          data: {
            status: "CHECKED_OUT",
            amount: {
              decrement: 1,
            },
          },
        });
      } else {
        const req = await prisma.products.update({
          where: {
            id: product.id,
          },
          data: {
            status: "CHECKED_OUT",
          },
        });
      }
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

    const reqTwo = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        currentCheckout: {
          connect: formValues.products,
        },
      },
    });

    return true;
  } catch (error) {
    console.log(error);
  }
}
