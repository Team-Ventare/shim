"use server";

import prisma from "@/lib/prisma";

export async function prismaReturn(userId: string, selectedRows: any) {
  const request = await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      currentCheckout: {
        disconnect: selectedRows.map((row: any) => ({ row: row.original })),
      },
    },
  });

  const requestTwo = await prisma.products.updateMany({
    where: {
      id: {
        in: selectedRows.map((row: any) => row.original.id),
      },
    },
    data: {
      status: "AVAILABLE",
    },
  });

  return request && requestTwo;
}
