import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ kopa: 123, mijc: "asdasd" });
}
