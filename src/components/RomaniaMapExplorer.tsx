import Link from "next/link";

interface CityPin {
  name: string;
  judetSlug: string;
  orasSlug: string;
  x: number;
  y: number;
}

// Coordinates below are a hand-projected approximation of Romania's real
// border (equirectangular projection, longitude compressed for latitude
// ~46°N), not a survey-accurate boundary — good enough to be recognizable.
const ACTIVE_PINS: CityPin[] = [
  { name: "Suceava", judetSlug: "suceava", orasSlug: "suceava", x: 61.5, y: 16.3 },
  { name: "Iași", judetSlug: "iasi", orasSlug: "iasi", x: 71, y: 23 },
  { name: "București", judetSlug: "bucuresti", orasSlug: "bucuresti", x: 60.2, y: 57.2 },
];

// Approximate positions only, shown as inactive reference points — no office
// coverage there yet.
const COMING_SOON_PINS: { name: string; x: number; y: number }[] = [
  { name: "Oradea", x: 23.2, y: 23.8 },
  { name: "Cluj-Napoca", x: 38.1, y: 27.5 },
  { name: "Timișoara", x: 17.1, y: 40.4 },
  { name: "Sibiu", x: 42.9, y: 39.9 },
  { name: "Brașov", x: 55.8, y: 41.6 },
  { name: "Craiova", x: 39.8, y: 58.6 },
  { name: "Constanța", x: 81.5, y: 61 },
  { name: "Galați", x: 75.5, y: 45.5 },
];

// Traces Beba Veche (W) south along the Serbia border, along the Danube to
// Dobrogea, up the Black Sea coast to the Danube Delta (E), back north along
// the Prut, then west through Maramureș and Satu Mare back to Beba Veche.
const ROMANIA_OUTLINE =
  "M8.2,35.3 L12,44.5 L23.9,53.8 L29.2,55.1 L39.8,65.3 L54,67.2 " +
  "L59,64 L70.8,61.4 L82,65.9 L82.7,60.4 L92,48.1 L77.2,44.3 " +
  "L73.4,22.6 L72.6,9.9 L59.3,9 L41.6,11.8 L30.1,14.4 L19.5,24.5 " +
  "L15.1,34.7 Z";

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
        <svg viewBox="0 0 100 78" className="w-full" aria-hidden="true">
          <path
            d={ROMANIA_OUTLINE}
            className="fill-brand/10 stroke-brand/40"
            strokeWidth="1.2"
            strokeLinejoin="round"
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
