import type { Metadata } from "next";
import { scrapeAllOfficeSources, type ScrapedOffice } from "@/lib/officeScraper";
import { OFFICE_SOURCES } from "@/lib/officeSources";
import { REAL_OFFICES, type RealOffice } from "@/lib/realOffices";

export const metadata: Metadata = {
  title: "Surse case de schimb (staging)",
  robots: { index: false, follow: false },
};

// Same anchor used throughout src/lib/realOffices.ts (see the comment atop
// RealOfficeRateSpread) — kept in sync manually, same as every office's
// buyFactor/sellFactor already is.
const ANCHOR: Record<string, number> = { EUR: 5.3447, USD: 4.7519, GBP: 6.28, CHF: 5.73 };

function findLiveOffice(officeName: string): RealOffice | undefined {
  for (const offices of Object.values(REAL_OFFICES)) {
    const found = offices.find((o) => o.name === officeName);
    if (found) return found;
  }
  return undefined;
}

function buildSnippet(office: ScrapedOffice): string {
  const lines = office.rates.map((r) => {
    const anchor = ANCHOR[r.currency];
    const nameMap: Record<string, string> = {
      EUR: "Euro",
      USD: "Dolar american",
      GBP: "Liră sterlină",
      CHF: "Franc elvețian",
    };
    if (!anchor) return `  // ${r.currency}: fără ancoră cunoscută, verifică manual`;
    return `  { currency: "${r.currency}", name: "${nameMap[r.currency]}", buyFactor: ${r.buy} / ${anchor}, sellFactor: ${r.sell} / ${anchor} },`;
  });
  return `[\n${lines.join("\n")}\n]`;
}

export default async function SurseCaseSchimbStagingPage({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string }>;
}) {
  const { secret } = await searchParams;
  const expected = process.env.ADMIN_SECRET;

  if (!expected) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <p className="text-sm text-negative">
          ADMIN_SECRET nu este configurat pe server — setează-l în Vercel →
          Settings → Environment Variables ca să poți accesa această pagină.
        </p>
      </div>
    );
  }

  if (secret !== expected) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <p className="text-sm text-muted">
          Pagină protejată. Accesează cu <code>?secret=...</code> în URL.
        </p>
      </div>
    );
  }

  if (OFFICE_SOURCES.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <h1 className="text-xl font-bold text-foreground">Surse case de schimb</h1>
        <p className="mt-3 text-sm text-muted">
          Nicio sursă configurată încă în <code>src/lib/officeSources.ts</code>.
          Trimite URL-urile paginilor de casă de schimb pe care vrei să le
          urmărim automat.
        </p>
      </div>
    );
  }

  const results = await scrapeAllOfficeSources();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-foreground">
        Surse case de schimb — verificare manuală
      </h1>
      <p className="mt-2 text-sm text-muted">
        Fiecare sursă e extrasă automat la fiecare rulare de cron. Nimic de
        aici nu ajunge pe site fără să confirmi tu — compară coloana
        &quot;extras automat&quot; cu &quot;live pe site&quot; și cu panoul
        real al casei de schimb înainte să aplici.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {results.map((office) => {
          const live = findLiveOffice(office.officeName);
          return (
            <div
              key={office.officeName}
              className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background/60 px-4 py-3 sm:px-5">
                <div>
                  <p className="text-sm font-bold text-foreground">{office.officeName}</p>
                  <p className="text-xs text-muted">{office.url}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    office.ok
                      ? "bg-positive/15 text-positive"
                      : "bg-negative/15 text-negative"
                  }`}
                >
                  {office.ok ? "ok" : `eșuat${office.error ? `: ${office.error}` : ""}`}
                </span>
              </div>

              {office.rates.length > 0 && (
                <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted">
                      Extras automat {office.sourceTime ? `(ora ${office.sourceTime})` : ""}
                    </p>
                    <table className="mt-2 w-full text-sm">
                      <tbody>
                        {office.rates.map((r) => (
                          <tr key={r.currency} className="border-b border-border last:border-0">
                            <td className="py-1.5 font-semibold text-foreground">{r.currency}</td>
                            <td className="py-1.5 text-right font-mono">{r.buy.toFixed(4)}</td>
                            <td className="py-1.5 text-right font-mono">{r.sell.toFixed(4)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted">
                      Live pe site {live ? `(${live.capturedDate ?? "fără dată"})` : ""}
                    </p>
                    {live ? (
                      <table className="mt-2 w-full text-sm">
                        <tbody>
                          {live.rates.map((r) => (
                            <tr key={r.currency} className="border-b border-border last:border-0">
                              <td className="py-1.5 font-semibold text-foreground">{r.currency}</td>
                              <td className="py-1.5 text-right font-mono text-muted">
                                factor {r.buyFactor.toFixed(4)}
                              </td>
                              <td className="py-1.5 text-right font-mono text-muted">
                                factor {r.sellFactor.toFixed(4)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="mt-2 text-sm text-muted">
                        Nicio casă cu acest nume exact în REAL_OFFICES.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {office.rates.length > 0 && (
                <div className="border-t border-border px-4 py-3 sm:px-5">
                  <p className="text-xs font-semibold uppercase text-muted">
                    Cod gata de copiat (ancoră BNR fixă, verifică înainte să aplici)
                  </p>
                  <pre className="mt-2 overflow-x-auto rounded-lg bg-background p-3 text-xs">
                    {buildSnippet(office)}
                  </pre>
                </div>
              )}

              {office.textSnippet && (
                <details className="border-t border-border px-4 py-3 sm:px-5">
                  <summary className="cursor-pointer text-xs font-semibold uppercase text-muted">
                    Text brut extras din pagină (pentru depanare)
                  </summary>
                  <p className="mt-2 text-xs text-muted">{office.textSnippet}</p>
                </details>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
