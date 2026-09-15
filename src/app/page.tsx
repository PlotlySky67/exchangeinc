import { getDailyRates } from "@/lib/bnr";
import RateTable from "@/components/RateTable";
import InterbankRatesWidget from "@/components/InterbankRatesWidget";
import QuickConverter from "@/components/QuickConverter";

export default async function Home() {
  const snapshot = await getDailyRates();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <QuickConverter initialSnapshot={snapshot} />

      <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        CURS VALUTAR BNR
      </h1>

      <div className="mt-6">
        <RateTable rates={snapshot.rates} />
      </div>

      <section className="mt-12 border-t border-border pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Curs valutar interbancar
        </h2>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand">
          în timp real pentru {formatRomanianDate(new Date())}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Cotațiile valutare afișate mai jos sunt preluate din tranzacțiile de
          pe piața interbancară și sunt afișate în timp real.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Cursul valutar interbancar variază permanent pe toată perioada
          zilei de tranzacționare, în funcție de cerere și ofertă.
        </p>
        <div className="mt-6">
          <InterbankRatesWidget />
        </div>
      </section>
    </div>
  );
}

function formatRomanianDate(date: Date): string {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
