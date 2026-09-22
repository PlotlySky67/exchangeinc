"use client";

import { useRouter } from "next/navigation";
import { ROMANIA_COUNTIES, ROMANIA_VIEWBOX } from "@/lib/romaniaCounties";

interface ActiveCounty {
  countyId: string;
  judetSlug: string;
  orasSlug: string;
  label: string;
}

const ACTIVE_COUNTIES: ActiveCounty[] = [
  { countyId: "ro-sv", judetSlug: "suceava", orasSlug: "suceava", label: "Suceava" },
  { countyId: "ro-is", judetSlug: "iasi", orasSlug: "iasi", label: "Iași" },
  { countyId: "ro-b", judetSlug: "bucuresti", orasSlug: "bucuresti", label: "București" },
];

export default function RomaniaMapExplorer({
  currentJudet,
}: {
  currentJudet: string;
}) {
  const router = useRouter();
  const activeById = new Map(ACTIVE_COUNTIES.map((c) => [c.countyId, c]));

  function goTo(county: ActiveCounty) {
    router.push(`/schimb-valutar-judetean?judet=${county.judetSlug}&oras=${county.orasSlug}`);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface p-4 sm:p-5">
      <p className="text-sm font-semibold text-foreground">Explorare pe hartă</p>
      <p className="mt-1 text-xs text-muted">
        Harta reală a județelor României — alege un județ marcat activ pentru
        a vedea casele de schimb din zonă.
      </p>
      <div className="mx-auto mt-4 max-w-md">
        <svg viewBox={ROMANIA_VIEWBOX} className="w-full">
          {ROMANIA_COUNTIES.map((county) => {
            const active = activeById.get(county.id);
            const isCurrent = active?.judetSlug === currentJudet;
            return (
              <path
                key={county.id}
                d={county.d}
                onClick={active ? () => goTo(active) : undefined}
                className={
                  active
                    ? `cursor-pointer stroke-surface transition-colors ${
                        isCurrent ? "fill-brand" : "fill-brand-dark hover:fill-brand"
                      }`
                    : "fill-muted/25 stroke-surface"
                }
                strokeWidth="1"
              >
                <title>
                  {county.name}
                  {active ? "" : " · în curând"}
                </title>
              </path>
            );
          })}
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {ACTIVE_COUNTIES.map((county) => {
          const isCurrent = county.judetSlug === currentJudet;
          return (
            <button
              key={county.countyId}
              type="button"
              onClick={() => goTo(county)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                isCurrent
                  ? "bg-brand text-white"
                  : "border border-border text-muted hover:bg-background hover:text-foreground"
              }`}
            >
              📍 {county.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
