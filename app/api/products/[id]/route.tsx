import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Product (/api/products/[id])
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const item = await prisma.products.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(item);
}

// Update Product (full) (/api/products/[id])
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.products.update({
    where: {
      id: id,
    },
    data: json,
  });
  return NextResponse.json(updated);
}

// Delete Product (/api/products/[id])
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const deleted = await prisma.products.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleted);
}
