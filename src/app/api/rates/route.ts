import { NextResponse } from "next/server";
import { getDailyRates } from "@/lib/bnr";

export async function GET() {
  const snapshot = await getDailyRates();
  return NextResponse.json(snapshot);
}
