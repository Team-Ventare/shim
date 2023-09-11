import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Purchase Request (/api/purchaserequests/)
export async function GET(request: Request) {
  const purchases = await prisma.purchaseRequests.findMany({
    include: {
      users: true,
    },
  });
  return NextResponse.json(purchases);
}

// New Purchase Request (/api/purchaserequests/)
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.purchaseRequests.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
