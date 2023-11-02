import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Reports (/api/reports/[id])
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const item = await prisma.reports.findUnique({
    where: {
      id: id,
    },
    include: {
      users: true,
    },
  });
  return NextResponse.json(item);
}

// Update Report (full) (/api/reports/[id])
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.reports.update({
    where: {
      id: id,
    },
    data: {
      technician: json.technician || null,
      priority: json.priority || null,
      status: json.status || "PENDING",
      comments: json.comments || null,
    },
  });
  return NextResponse.json(updated);
}

// Update Reports (partial) (/api/reports/[id])
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.reports.update({
    where: {
      id: id,
    },
    // remove data if not sent
    data: {
      status: json.status || "PENDING",
    },
  });
  return NextResponse.json(updated);
} 

// Delete Report (/api/reports/[id])
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const deleted = await prisma.reports.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleted);
}
