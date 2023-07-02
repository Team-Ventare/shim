import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Inventory (/api/inventory/)
export async function GET(request: Request) {
  const inventory = await prisma.inventory.findMany();
  return NextResponse.json(inventory);
}
