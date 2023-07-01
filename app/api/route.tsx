import { NextResponse } from "next/server";
import { authOptions } from "./auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  return NextResponse.json({ authenticated: !!session });
}
