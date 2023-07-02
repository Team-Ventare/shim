import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch User (/api/users/[id])
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(user);
}

// Update user (full) (/api/users/[id])
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.user.update({
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

// Update user (partial) (/api/users/[id])
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.user.update({
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

// Delete user (/api/users/[id])
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const deleted = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleted);
}
