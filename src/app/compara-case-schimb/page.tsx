import type { Metadata } from "next";
import { getDailyRates } from "@/lib/bnr";
import { REAL_OFFICES } from "@/lib/realOffices";
import OfficeComparisonTable from "@/components/OfficeComparisonTable";

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
    </div>
  );
}
