import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Supplier Request (/api/suppliers/)
export async function GET(request: Request) {
  const suppliers = await prisma.suppliers.findMany();
  return NextResponse.json(suppliers);
}

// Add Supplier Request (/api/suppliers/)
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.suppliers.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}

// Update Supplier (/api/suppliers/[id])
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
    data: {
      createdAt: json.createdAt || null,
      updatedAt: json.updatedAt || null,
      name: json.name || null,
      title: json.title || null,
      vendor: json.vendor || null,
      email: json.email || null,
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