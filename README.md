# CursActual

CursActual is a Romanian currency exchange rate site — daily reference rates,
a currency converter, and historical rate charts, built on the official
public XML feeds published by the National Bank of Romania (BNR).

It offers the same kind of functionality as sites like valutare.ro (daily
rates, converter, exchange-office comparison, historical charts), with
original branding and design, real data sourced directly from BNR, and a
clearly-labeled demo dataset for the exchange-office comparison table (no
live feed for that is wired up yet).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Recharts for the historical rate chart
- fast-xml-parser to parse BNR's XML feeds

## Data sources

- Daily rates: `https://www.bnr.ro/nbrfxrates.xml`
- Historical rates: `https://www.bnr.ro/files/xml/years/nbrfxrates{year}.xml`

Both are public feeds documented at bnr.ro. If they're unreachable (e.g. no
outbound network access), the app falls back to bundled sample data and
labels it as such in the UI.

## Automatic daily refresh

BNR republishes rates once a day, usually between 13:00 and 13:15 Europe/Bucharest
time. Two mechanisms keep the site in sync with no manual steps:

1. **Time-based fallback (works on any host).** Fetches to the BNR feeds are
   cached for 5 minutes (rates) / 1 hour (history) via Next.js's fetch cache
   (`src/lib/bnr.ts`). The first request after that window expires
   automatically refetches BNR in the background. No cron needed — worst case
   the site is a few minutes stale.
2. **Instant refresh via `/api/revalidate` (optional, for precise timing).**
   This route calls `revalidateTag`/`revalidatePath` to invalidate the cache
   immediately. `vercel.json` schedules it twice a day, at 10:15 and 11:15 UTC
   — one of those always lands at ~13:15 Bucharest time regardless of
   DST (EEST in summer, EET in winter), so it self-adjusts across the
   March/October clock changes without editing the schedule.

To enable step 2 on Vercel: set a `CRON_SECRET` environment variable in the
project settings (any random string). Vercel automatically sends it as
`Authorization: Bearer <CRON_SECRET>` when it triggers the cron, and the route
checks it before revalidating. On another host, hit the same URL from your
own scheduler instead, e.g.:

```bash
curl "https://your-domain.com/api/revalidate?secret=$CRON_SECRET"
```

Without `CRON_SECRET` set, `/api/revalidate` responds `500` and the site
still updates fine via mechanism 1, just within a 5-minute window instead of
instantly.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

- `src/lib/bnr.ts` — fetch/parse BNR feeds, with fallback data
- `src/lib/demoOffices.ts` — sample exchange-office comparison data
- `src/app/api/rates`, `src/app/api/history` — JSON endpoints used by client components
- `src/app/*` — home, `/convertor`, `/istoric`, `/despre`
