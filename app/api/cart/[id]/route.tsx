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
  const json = await request.json();

  const updated = await prisma.cart.update({
    where: {
      id: id,
    },
    include: {
      products: true,
    },
    data: {
      products: {
        connect: [
          {
            id: json.pid,
          },
        ],
      },
    },
  });

  return NextResponse.json(updated);
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
