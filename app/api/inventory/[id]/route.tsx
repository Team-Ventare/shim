import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Inventory Item (/api/inventory/[id])
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const item = await prisma.inventory.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(item);
}

// Update Inventory Item (full) (/api/inventory/[id])
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.inventory.update({
    where: {
      id: id,
    },
    // remove data if not sent
    data: {
      name: json.name || null,
    },
  });
  return NextResponse.json(updated);
}

// Update Inventory Item (partial) (/api/inventory/[id])
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.inventory.update({
    where: {
      id: id,
    },
    // remove data if not sent
    data: {
      name: json.name || null,
    },
  });
  return NextResponse.json(updated);
}

// Delete Inventory Item (/api/inventory/[id])
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const deleted = await prisma.inventory.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleted);
}
