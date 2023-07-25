import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Cart (/api/cart/[id])
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const cart = await prisma.cart.findUnique({
    where: {
      id: id,
    },
    include: {
      products: true,
    },
  });
  return NextResponse.json(cart);
}

// Update Cart (full) (/api/cart/[id])
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await request.json();

  const cart = await prisma.cart.update({
    where: {
      id: id,
    },
    data: {
      products: {
        connect: [...body.product],
      },
    },
  });
  return NextResponse.json(cart);
}

// Delete Cart (/api/cart/[id])
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const deleted = await prisma.cart.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleted);
}
