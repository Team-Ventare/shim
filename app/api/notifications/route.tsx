import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Notifications (/api/notifications/)
export async function GET(request: Request) {
  const newsposts = await prisma.notifications.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
  return NextResponse.json(newsposts);
}

// Add Notification (/api/notifications/)
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.notifications.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
