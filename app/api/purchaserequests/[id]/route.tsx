import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Purchase Request (/api/purchaseRequests/[id])
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const item = await prisma.purchaseRequests.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(item);
}

// Update Purchase Request (full) (/api/purchaseRequests/[id])
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.purchaseRequests.update({
    where: {
      id: id,
    },
    // remove data if not sent
    data: {
      title: json.title || null,
    },
  });
  return NextResponse.json(updated);
}

// Update Purchase Request (partial) (/api/purchaseRequests/[id])
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.purchaseRequests.update({
    where: {
      id: id,
    },
    // remove data if not sent
    data: {
      title: json.title || null,
    },
  });
  return NextResponse.json(updated);
}

// Delete Purchase Request (/api/purchaseRequests/[id])
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const deleted = await prisma.purchaseRequests.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleted);
}
