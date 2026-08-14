import type { Metadata } from "next";
import { getDailyRates } from "@/lib/bnr";
import { JUDETE, DEFAULT_JUDET, judetByName } from "@/lib/judete";
import { judetOfficeQuotes } from "@/lib/demoOffices";
import JudetSelector from "@/components/JudetSelector";
import JudetOfficeTable from "@/components/JudetOfficeTable";
import DataSourceNotice from "@/components/DataSourceNotice";

export const metadata: Metadata = {
  title: "Schimb valutar județean",
  description:
    "Compară cursurile de cumpărare și vânzare EUR/USD oferite de case de schimb, pe fiecare județ din România.",
};

export default async function SchimbValutarJudeteanPage({
  searchParams,
}: PageProps<"/schimb-valutar-judetean">) {
  const params = await searchParams;
  const raw = params?.judet;
  const slug = (Array.isArray(raw) ? raw[0] : raw) ?? DEFAULT_JUDET;
  const judet = judetByName(slug);

  const snapshot = await getDailyRates();
  const eur = snapshot.rates.find((r) => r.currency === "EUR");
  const usd = snapshot.rates.find((r) => r.currency === "USD");
  const quotes = eur && usd ? judetOfficeQuotes(judet.slug, eur, usd) : [];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        Schimb valutar județean
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Case de schimb valutar pe județe
      </h1>
      <p className="mt-3 text-base text-muted">
        Alege un județ pentru a vedea o comparație a cursurilor de
        cumpărare/vânzare EUR și USD oferite de case de schimb din zonă.
      </p>

      <div className="mt-6">
        <DataSourceNotice source={snapshot.source} className="mb-3" />
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm font-medium text-muted" htmlFor="judet-select">
            Județ
          </label>
          <JudetSelector judete={JUDETE} current={judet.slug} />
        </div>

        {quotes.length > 0 ? (
          <JudetOfficeTable quotes={quotes} judetName={judet.name} />
        ) : (
          <p className="text-sm text-muted">
            Datele nu sunt disponibile momentan.
          </p>
        )}
      </div>
    </div>
  );
}
