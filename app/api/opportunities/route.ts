import { NextResponse } from "next/server";
import { demoOpportunities } from "@/lib/demo-data";

export function GET() {
  return NextResponse.json({
    mode: "demo",
    generatedAt: new Date().toISOString(),
    opportunities: [...demoOpportunities].sort((a, b) => b.score - a.score),
  });
}
