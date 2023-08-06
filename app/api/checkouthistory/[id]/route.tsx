import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch CheckoutHistory (/api/checkouthistory/[id])
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const entry = await prisma.checkoutHistory.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(entry);
}

// Update CheckoutHistory Entry (full) (/api/checkouthistory/[id])
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.checkoutHistory.update({
    where: {
      id: id,
    },
    data: {
      course: json.course || null,
    },
  });
  return NextResponse.json(updated);
}

// Update CheckoutHistory Entry (partial) (/api/checkouthistory/[id])
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.checkoutHistory.update({
    where: {
      id: id,
    },
    data: {
      course: json.course || null,
    },
  });
  return NextResponse.json(updated);
}

// Delete Purchase Request (/api/checkouthistory/[id])
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const deleted = await prisma.checkoutHistory.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleted);
}