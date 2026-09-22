import type { Metadata } from "next";
import Link from "next/link";
import { getDailyRates } from "@/lib/bnr";
import { JUDETE, DEFAULT_JUDET, DEFAULT_ORAS, judetBySlug, orasBySlug } from "@/lib/judete";
import { REAL_OFFICES } from "@/lib/realOffices";
import JudetSelector from "@/components/JudetSelector";
import RealOfficeTable from "@/components/RealOfficeTable";
import RomaniaMapExplorer from "@/components/RomaniaMapExplorer";

export const metadata: Metadata = {
  title: "Schimb valutar județean",
  description:
    "Compară cursurile de cumpărare și vânzare EUR/USD oferite de case de schimb, pe județ și oraș.",
  alternates: { canonical: "/schimb-valutar-judetean" },
};

function formatRomanianDate(dateStr: string): string {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

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
  const offices = REAL_OFFICES[`${judet.slug}:${oras.slug}`] ?? [];
  const snapshot = await getDailyRates();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        Schimb valutar județean
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Case de schimb valutar pe județe și orașe
      </h1>
      <p className="mt-3 text-base text-muted">
        Alege un județ și un oraș.
      </p>
      <p className="mt-2 text-xs font-medium text-muted">
        Curs BNR de referință actualizat: {formatRomanianDate(snapshot.date)}
      </p>

      <div className="mt-6">
        <div className="mb-6">
          <RomaniaMapExplorer currentJudet={judet.slug} />
        </div>
        <div className="mb-6">
          <JudetSelector judete={JUDETE} currentJudet={judet.slug} currentOras={oras.slug} />
        </div>

        {offices.length > 0 && (
          <div className="flex flex-col gap-4">
            {offices.map((office) => (
              <RealOfficeTable key={office.name} office={office} bnrRates={snapshot.rates} />
            ))}
          </div>
        )}

        {offices.length > 0 && (
          <p className="mt-6 text-xs text-muted">
            Cursurile pot varia; confirmă la sediu sau pe site-ul oficial al
            casei de schimb înainte de a efectua o tranzacție. Vezi și{" "}
            <Link href="/termeni-si-conditii" className="text-brand hover:underline">
              termenii și condițiile
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
