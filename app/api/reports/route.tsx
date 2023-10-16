import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Reports (/api/reports/)
export async function GET(request: Request) {
  const reports = await prisma.reports.findMany({
    include: {
      users: true,
    },
  });
  return NextResponse.json(reports);
}

// New Report (/api/reports/)
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.reports.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}