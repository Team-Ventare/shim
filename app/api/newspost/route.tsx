import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch News Posts (/api/newspost/)
export async function GET(request: Request) {
  const newsposts = await prisma.news.findMany();
  return NextResponse.json(newsposts);
}

// Add News Post (/api/newspost/)
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.news.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
