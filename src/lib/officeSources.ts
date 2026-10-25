// Configurable list of exchange-office pages to fetch automatically.
// Each entry's URL is a specific office's page on its source site (e.g.
// valutare.ro) — not a general listing page — so the scraper fetches one
// office's board at a time, the same way the owner's manual screenshots
// have always targeted one office.
//
// IMPORTANT: this list starts empty on purpose. Nobody here has verified
// the real HTML structure of these pages from inside this environment
// (no outbound internet access), so every selector in officeScraper.ts is
// a best-effort guess based on screenshots, not a tested parser. Add a
// source only once its URL is confirmed, then check the staging page
// (/admin/surse-case-schimb) to see whether the parser actually extracted
// it correctly before trusting it.
export interface OfficeSource {
  // Must match a REAL_OFFICES entry's `name` in src/lib/realOffices.ts,
  // so the staging page can show a side-by-side diff against what's live.
  officeName: string;
  url: string;
}

export const OFFICE_SOURCES: OfficeSource[] = [];
