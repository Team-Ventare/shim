import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Supplier (/api/suppliers/[id])
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const item = await prisma.suppliers.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(item);
}

// Update Supplier (full) (/api/suppliers/[id])
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.suppliers.update({
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

// Update Supplier (partial) (/api/suppliers/[id])
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.suppliers.update({
    where: {
      id: id,
    },
    // remove data if not sent
    data: {
      createdAt: json.createdAt || null,
      updatedAt: json.updatedAt || null,
      name: json.name || null,
      email: json.email || null,
      title: json.title || null,
      vendor: json.vendor || null,
    },
  });
  return NextResponse.json(updated);
}

// Delete Supplier (/api/suppliers/[id])
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const deleted = await prisma.suppliers.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleted);
}
