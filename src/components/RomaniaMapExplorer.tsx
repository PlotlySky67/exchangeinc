import Link from "next/link";

interface CityPin {
  name: string;
  judetSlug: string;
  orasSlug: string;
  x: number;
  y: number;
}

const ACTIVE_PINS: CityPin[] = [
  { name: "Suceava", judetSlug: "suceava", orasSlug: "suceava", x: 60, y: 14 },
  { name: "Iași", judetSlug: "iasi", orasSlug: "iasi", x: 76, y: 21 },
  { name: "București", judetSlug: "bucuresti", orasSlug: "bucuresti", x: 58, y: 80 },
];

// Approximate positions only, shown as inactive reference points — no office
// coverage there yet.
const COMING_SOON_PINS: { name: string; x: number; y: number }[] = [
  { name: "Oradea", x: 16, y: 22 },
  { name: "Cluj-Napoca", x: 32, y: 38 },
  { name: "Timișoara", x: 14, y: 56 },
  { name: "Sibiu", x: 42, y: 46 },
  { name: "Brașov", x: 50, y: 50 },
  { name: "Craiova", x: 35, y: 76 },
  { name: "Constanța", x: 85, y: 66 },
  { name: "Galați", x: 84, y: 46 },
];

const ROMANIA_OUTLINE =
  "M15,18 C20,10 35,6 50,8 C60,9 65,14 72,12 C80,10 88,18 90,28 " +
  "C93,40 96,50 94,58 C92,66 88,72 90,80 C91,86 85,90 78,88 " +
  "C68,86 60,90 50,88 C38,86 30,90 22,85 C14,80 10,70 12,60 " +
  "C8,50 6,40 10,30 C12,24 12,20 15,18 Z";

export default function RomaniaMapExplorer({
  currentJudet,
}: {
  currentJudet: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface p-4 sm:p-5">
      <p className="text-sm font-semibold text-foreground">Explorare pe hartă</p>
      <p className="mt-1 text-xs text-muted">
        Hartă simplificată, orientativă — alege un oraș marcat activ pentru a
        vedea casele de schimb din zonă.
      </p>
      <div className="mx-auto mt-4 max-w-xs">
        <svg viewBox="0 0 100 100" className="w-full" aria-hidden="true">
          <path
            d={ROMANIA_OUTLINE}
            className="fill-brand/10 stroke-brand/40"
            strokeWidth="1.2"
          />
          {COMING_SOON_PINS.map((p) => (
            <circle
              key={p.name}
              cx={p.x}
              cy={p.y}
              r="1.4"
              className="fill-muted/50"
            >
              <title>{p.name} · în curând</title>
            </circle>
          ))}
          {ACTIVE_PINS.map((p) => {
            const active = p.judetSlug === currentJudet;
            return (
              <g key={p.name}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active ? 3.2 : 2.6}
                  className={active ? "fill-brand" : "fill-brand-dark"}
                  stroke="white"
                  strokeWidth="0.8"
                />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {ACTIVE_PINS.map((p) => {
          const active = p.judetSlug === currentJudet;
          return (
            <Link
              key={p.name}
              href={`/schimb-valutar-judetean?judet=${p.judetSlug}&oras=${p.orasSlug}`}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-brand text-white"
                  : "border border-border text-muted hover:bg-background hover:text-foreground"
              }`}
            >
              📍 {p.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
