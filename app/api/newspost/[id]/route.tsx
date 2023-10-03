import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Post (/api/news/[id])
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const item = await prisma.news.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(item);
}

// Update Post (full) (/api/news/[id])
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.news.update({
    where: {
      id: id,
    },
    data: json,
  });
  return NextResponse.json(updated);
}

// Delete Post (/api/news/[id])
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const deleted = await prisma.news.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleted);
}
