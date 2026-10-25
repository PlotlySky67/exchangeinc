import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { scrapeAllOfficeSources } from "@/lib/officeScraper";

// Called by Vercel Cron (see vercel.json) to keep the office-rate scrape
// cache warm, the same pattern as /api/revalidate for BNR. This route
// never writes to realOffices.ts itself — it only refreshes what the
// staging page (/admin/surse-case-schimb) shows for manual review. Going
// live still requires a human to compare the scrape against the real
// board and approve it, the same as every manual update so far.
export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured on the server" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get("authorization");
  const querySecret = searchParams.get("secret");
  const authorized =
    authHeader === `Bearer ${expected}` || querySecret === expected;

  if (!authorized) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("office-scrape", { expire: 0 });
  const results = await scrapeAllOfficeSources();

  return NextResponse.json({
    fetchedCount: results.length,
    okCount: results.filter((r) => r.ok).length,
    now: new Date().toISOString(),
  });
}
