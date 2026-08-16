import type { Metadata } from "next";
import HistoryExplorer from "@/components/HistoryExplorer";
import { DEFAULT_CURRENCY } from "@/lib/currencies";

export const metadata: Metadata = {
  title: "Istoric curs valutar",
  description:
    "Evoluția în timp a cursului valutar BNR pentru EUR, USD, GBP și alte valute, cu grafic interactiv.",
  alternates: { canonical: "/istoric" },
};

export default async function IstoricPage({
  searchParams,
}: PageProps<"/istoric">) {
  const params = await searchParams;
  const raw = params?.valuta;
  const valuta = (Array.isArray(raw) ? raw[0] : raw) ?? DEFAULT_CURRENCY;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        Istoric curs valutar
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Evoluția cursului în timp
      </h1>
      <p className="mt-3 text-base text-muted">
        Alege o valută și un interval pentru a vedea evoluția cursului de
        referință BNR față de leu.
      </p>

      <div className="mt-6">
        <HistoryExplorer initialCurrency={valuta.toUpperCase()} />
      </div>
    </div>
  );
}
