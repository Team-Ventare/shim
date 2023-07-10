import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Purchase Request (/api/purchaserequests/)
export async function GET(request: Request) {
  const inventory = await prisma.purchaseRequest.findMany();
  return NextResponse.json(inventory);
}

// Add Purchase Request (/api/purchaserequests/)
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.purchaseRequest.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
