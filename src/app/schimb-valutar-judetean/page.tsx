import type { Metadata } from "next";
import { getDailyRates } from "@/lib/bnr";
import { JUDETE, DEFAULT_JUDET, DEFAULT_ORAS, judetBySlug, orasBySlug } from "@/lib/judete";
import { judetOfficeQuotes } from "@/lib/demoOffices";
import JudetSelector from "@/components/JudetSelector";
import JudetOfficeTable from "@/components/JudetOfficeTable";
import DataSourceNotice from "@/components/DataSourceNotice";

export const metadata: Metadata = {
  title: "Schimb valutar județean",
  description:
    "Compară cursurile de cumpărare și vânzare EUR/USD oferite de case de schimb, pe județ și oraș.",
};

export default async function SchimbValutarJudeteanPage({
  searchParams,
}: PageProps<"/schimb-valutar-judetean">) {
  const params = await searchParams;
  const rawJudet = params?.judet;
  const rawOras = params?.oras;
  const judetSlug = (Array.isArray(rawJudet) ? rawJudet[0] : rawJudet) ?? DEFAULT_JUDET;
  const orasSlug = (Array.isArray(rawOras) ? rawOras[0] : rawOras) ?? DEFAULT_ORAS;

  const judet = judetBySlug(judetSlug);
  const oras = orasBySlug(judet, orasSlug);

  const snapshot = await getDailyRates();
  const eur = snapshot.rates.find((r) => r.currency === "EUR");
  const usd = snapshot.rates.find((r) => r.currency === "USD");
  const quotes = eur && usd ? judetOfficeQuotes(judet.slug, oras.slug, eur, usd) : [];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        Schimb valutar județean
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Case de schimb valutar pe județe și orașe
      </h1>
      <p className="mt-3 text-base text-muted">
        Alege un județ și un oraș pentru a vedea o comparație a cursurilor de
        cumpărare/vânzare EUR și USD oferite de case de schimb din zonă.
      </p>

      <div className="mt-6">
        <DataSourceNotice source={snapshot.source} className="mb-3" />
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-muted">Județ / oraș</span>
          <JudetSelector judete={JUDETE} currentJudet={judet.slug} currentOras={oras.slug} />
        </div>

        {quotes.length > 0 ? (
          <JudetOfficeTable quotes={quotes} judetName={judet.name} orasName={oras.name} />
        ) : (
          <p className="text-sm text-muted">
            Datele nu sunt disponibile momentan.
          </p>
        )}
      </div>
    </div>
  );
}
