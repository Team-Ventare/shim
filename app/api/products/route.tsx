import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Products (/api/products/)
export async function GET(request: Request) {
  const products = await prisma.products.findMany();
  return NextResponse.json(products);
}

// Add Product (/api/products/)
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.products.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
