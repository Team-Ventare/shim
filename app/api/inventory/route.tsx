import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Inventory (/api/inventory/)
export async function GET(request: Request) {
  const inventory = await prisma.inventory.findMany();
  return NextResponse.json(inventory);
}

// Add Inventory Item (/api/inventory/)
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.inventory.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
