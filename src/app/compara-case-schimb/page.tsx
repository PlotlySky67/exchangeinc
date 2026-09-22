import type { Metadata } from "next";
import Link from "next/link";
import { getDailyRates } from "@/lib/bnr";
import { REAL_OFFICES } from "@/lib/realOffices";
import OfficeComparisonTable from "@/components/OfficeComparisonTable";

function formatRomanianDate(dateStr: string): string {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

export const metadata: Metadata = {
  title: "Compară case de schimb",
  description:
    "Compară cursurile de cumpărare și vânzare EUR, USD, GBP și CHF oferite de case de schimb valutar reale.",
  alternates: { canonical: "/compara-case-schimb" },
};

const CURRENCIES = [
  { code: "EUR", name: "Euro" },
  { code: "USD", name: "Dolar american" },
  { code: "GBP", name: "Liră sterlină" },
  { code: "CHF", name: "Franc elvețian" },
];

export default async function CompareOfficesPage() {
  const snapshot = await getDailyRates();
  const allOffices = Object.values(REAL_OFFICES).flat();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        Compară case de schimb
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Compară cursurile caselor de schimb valutar
      </h1>
      <p className="mt-3 text-base text-muted">
        Cursurile de cumpărare și vânzare oferite de casele de schimb reale
        din baza noastră de date, pentru fiecare valută.
      </p>
      <p className="mt-2 text-xs font-medium text-muted">
        Curs BNR de referință actualizat: {formatRomanianDate(snapshot.date)}
      </p>

      <div className="mt-8 flex flex-col gap-10">
        {CURRENCIES.map((currency) => (
          <OfficeComparisonTable
            key={currency.code}
            currency={currency.code}
            currencyName={currency.name}
            offices={allOffices}
            bnrRates={snapshot.rates}
          />
        ))}
      </div>

      <p className="mt-6 text-xs text-muted">
        Cursurile pot varia; confirmă la sediu sau pe site-ul oficial al
        casei de schimb înainte de a efectua o tranzacție. Vezi și{" "}
        <Link href="/termeni-si-conditii" className="text-brand hover:underline">
          termenii și condițiile
        </Link>
        .
      </p>

      <div className="mt-6 rounded-xl border border-brand/30 bg-brand/5 p-5">
        <p className="text-sm font-semibold text-foreground">
          Nu știi la ce să te uiți când alegi o casă de schimb?
        </p>
        <p className="mt-1 text-sm text-muted">
          Am scris un ghid scurt cu repere practice, ca să nu pierzi bani pe
          comisioane ascunse sau curs dezavantajos.
        </p>
        <Link
          href="/cum-aleg-o-casa-de-schimb-buna"
          className="mt-4 inline-block rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Citește ghidul →
        </Link>
      </div>
    </div>
  );
}
