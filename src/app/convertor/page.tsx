import type { Metadata } from "next";
import { getDailyRates } from "@/lib/bnr";
import ConverterWidget from "@/components/ConverterWidget";
import RateTable from "@/components/RateTable";
import DataSourceNotice from "@/components/DataSourceNotice";

export const metadata: Metadata = {
  title: "Convertor valutar",
  description:
    "Convertește instant între RON, EUR, USD, GBP și alte valute, pe baza cursului oficial BNR.",
  alternates: { canonical: "/convertor" },
};

export default async function ConvertorPage() {
  const snapshot = await getDailyRates();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        Convertor valutar
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Convertește între valute în timp real
      </h1>
      <p className="mt-3 text-base text-muted">
        Calculul se face pe baza cursului de referință publicat de BNR pentru{" "}
        {snapshot.date}.
      </p>

      <div className="mt-6">
        <DataSourceNotice source={snapshot.source} className="mb-3" />
        <ConverterWidget initialSnapshot={snapshot} />
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Cursul BNR de astăzi
        </h2>
        <RateTable rates={snapshot.rates} />
      </div>
    </div>
  );
}
