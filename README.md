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
