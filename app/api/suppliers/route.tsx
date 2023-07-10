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
