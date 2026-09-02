import { getDailyRates } from "@/lib/bnr";
import RateTable from "@/components/RateTable";
import DataSourceNotice from "@/components/DataSourceNotice";

export default async function Home() {
  const snapshot = await getDailyRates();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        {snapshot.date}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        CURS VALUTAR BNR
      </h1>

      <div className="mt-6">
        <DataSourceNotice source={snapshot.source} className="mb-4" />
        <RateTable rates={snapshot.rates} />
      </div>
    </div>
  );
}
