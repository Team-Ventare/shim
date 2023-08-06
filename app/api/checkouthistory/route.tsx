import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch ChekcoutHistory (/api/checkouthistory/)
export async function GET(request: Request) {
  const history = await prisma.checkoutHistory.findMany();
  return NextResponse.json(history);
}

// Add CheckoutHistory entry (/api/checkouthistory/)
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.checkoutHistory.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
