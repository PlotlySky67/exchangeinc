import Link from "next/link";
import { getDailyRates } from "@/lib/bnr";
import { demoOfficeQuotes } from "@/lib/demoOffices";
import { currencyMeta } from "@/lib/currencies";
import RateTable from "@/components/RateTable";
import ConverterWidget from "@/components/ConverterWidget";
import DataSourceNotice from "@/components/DataSourceNotice";
import OfficeCompareTable from "@/components/OfficeCompareTable";

const HIGHLIGHTS = ["EUR", "USD", "GBP", "CHF"];

export default async function Home() {
  const snapshot = await getDailyRates();
  const eur = snapshot.rates.find((r) => r.currency === "EUR");
  const officeQuotes = eur ? demoOfficeQuotes(eur) : [];

  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-gradient-to-b from-brand/5 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Curs valutar · {snapshot.date}
          </p>
          <h1 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cursul zilei, actualizat după cursul oficial BNR
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted">
            Verifică rapid cursul valutar de referință, convertește sume
            între monede și urmărește evoluția în timp — toate pe baza
            fluxului public al Băncii Naționale a României.
          </p>

          <div className="mt-6 max-w-2xl">
            <DataSourceNotice source={snapshot.source} className="mb-3" />
            <ConverterWidget initialSnapshot={snapshot} />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-4">
          {HIGHLIGHTS.map((code) => {
            const entry = snapshot.rates.find((r) => r.currency === code);
            const meta = currencyMeta(code);
            if (!entry) return null;
            return (
              <Link
                key={code}
                href={`/istoric?valuta=${code}`}
                className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-brand/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-muted">
                    {meta.flag} {code}
                  </span>
                  <span className="text-xs text-muted">→ istoric</span>
                </div>
                <p className="mt-2 font-mono text-2xl font-bold text-foreground">
                  {(entry.rate / entry.multiplier).toFixed(4)}
                  <span className="ml-1 text-sm font-normal text-muted">RON</span>
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold text-foreground">
            Curs valutar BNR — toate valutele
          </h2>
          <Link href="/convertor" className="text-sm font-medium text-brand hover:underline">
            Deschide convertorul →
          </Link>
        </div>
        <RateTable rates={snapshot.rates} />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Compară case de schimb — EUR
            </h2>
            <p className="mt-1 text-sm text-muted">
              Exemplu de comparație a cursurilor de cumpărare/vânzare oferite de
              case de schimb. Secțiune demonstrativă, gata de conectat la un
              flux real de date.
            </p>
          </div>
          <Link
            href="/schimb-valutar-judetean"
            className="shrink-0 text-sm font-medium text-brand hover:underline"
          >
            Vezi pe fiecare județ →
          </Link>
        </div>
        {officeQuotes.length > 0 && (
          <OfficeCompareTable quotes={officeQuotes} currency="EUR" />
        )}
      </section>

      <section className="border-t border-border bg-brand/5">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Vrei istoricul complet al unei valute?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Vezi evoluția cursului pe ultimele luni, cu grafic interactiv.
            </p>
          </div>
          <Link
            href="/istoric"
            className="shrink-0 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Vezi istoricul cursului
          </Link>
        </div>
      </section>
    </div>
  );
}
