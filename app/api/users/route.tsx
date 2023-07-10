import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Users (/api/users/)
export async function GET(request: Request) {
  const users = await prisma.users.findMany();
  return NextResponse.json(users);
}

// Create User (/api/users/)
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.users.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
