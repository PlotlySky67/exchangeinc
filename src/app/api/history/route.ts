import { NextResponse } from "next/server";
import { getHistory } from "@/lib/bnr";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get("currency") ?? "EUR";
  const days = Number(searchParams.get("days") ?? 90);
  const result = await getHistory(currency, days);
  return NextResponse.json(result);
}
