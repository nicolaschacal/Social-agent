import { NextResponse } from "next/server";
import { providerStatus } from "@/lib/providers";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "social-agent",
    version: "0.1.0",
    providers: providerStatus,
  });
}
