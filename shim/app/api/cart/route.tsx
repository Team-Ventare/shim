import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Products (/api/cart/)
export async function GET(request: Request) {
  const cart = await prisma.cart.findMany();
  return NextResponse.json(cart);
}

// Add Product (/api/cart/)
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.cart.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
