import { del, put } from "@vercel/blob";
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

//delete image from blob
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get('url') as string;
  await del(urlToDelete,  {token: "vercel_blob_rw_SnxeQAoIENCJBvzU_bBvUj0hYx7Rr2nhJTMLZghMbjRZyEs"});
 
  return new Response();
}              