import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json(
      { error: "No filename provided" },
      { status: 400 }
    );
  }

  const blob = await put(filename, await request.blob(), {
    access: "public",
  });

  return NextResponse.json(blob);
}
