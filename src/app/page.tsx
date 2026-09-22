import InterbankRatesWidget from "@/components/InterbankRatesWidget";
import InterbankRatesSnapshot from "@/components/InterbankRatesSnapshot";
import DailyRateSummary from "@/components/DailyRateSummary";
import BankRatesSection from "@/components/BankRatesSection";

export default async function Home() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <DailyRateSummary />

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
          <InterbankRatesSnapshot />
        </div>
        <div className="mt-6">
          <span className="inline-block rounded-md border border-brand/40 bg-brand/5 px-3 py-1.5 text-sm font-semibold text-foreground">
            tabel conversie valutară
          </span>
          <p className="mt-2 text-xs text-muted">sursa: www.tradingview.com</p>
        </div>
        <div className="mt-6">
          <InterbankRatesWidget />
        </div>
      </section>

      <BankRatesSection />
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
