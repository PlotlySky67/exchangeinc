import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// Called by a scheduled job (e.g. Vercel Cron, see vercel.json) right after
// BNR publishes the day's rates, so the site refreshes immediately instead
// of waiting for the fetch cache to expire on its own.
//
// Authorization: either the header Vercel sends automatically when
// CRON_SECRET is set (see https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs),
// or a `?secret=` query param for triggering from elsewhere (GitHub Actions,
// cron-job.org, curl, ...). Both compare against the same CRON_SECRET env var.
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

  // { expire: 0 } forces immediate expiration (vs. the default stale-while-
  // revalidate profile) so the very next request already gets fresh data —
  // appropriate here since this route itself is only ever called by a
  // trusted cron/webhook, not by end users.
  revalidateTag("bnr-rates", { expire: 0 });
  revalidateTag("bnr-history", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/convertor");
  revalidatePath("/istoric");

  return NextResponse.json({ revalidated: true, now: new Date().toISOString() });
}
