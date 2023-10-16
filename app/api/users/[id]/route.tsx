import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch User (/api/users/[id])
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const users = await prisma.users.findUnique({
    where: {
      id: id,
    },
    include: {
      cart: {
        include: {
          products: true,
        },
      },
      checkoutHistory: true,
      purchaseRequests: true,
    },
  });
  return NextResponse.json(users);
}

// Update users (full) (/api/users/[id])
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.users.update({
    where: {
      id: id,
    },
    // remove data if not sent
    data: {
      name: json.name || null,
      email: json.email || null,
    },
  });
  return NextResponse.json(updated);
}

// Update users (partial) (/api/users/[id])
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.users.update({
    where: {
      id: id,
    },
    // remove data if not sent
    data: {
      password: json.password || null,
    },
  });
  return NextResponse.json(updated);
}

// Delete users (/api/users/[id])
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const deleted = await prisma.users.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleted);
}
