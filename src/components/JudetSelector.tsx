"use client";

import { useRouter } from "next/navigation";
import type { Judet } from "@/lib/judete";

export default function JudetSelector({
  judete,
  currentJudet,
  currentOras,
}: {
  judete: Judet[];
  currentJudet: string;
  currentOras: string;
}) {
  const router = useRouter();
  const selected = judete.find((j) => j.slug === currentJudet) ?? judete[0];

  function goTo(judetSlug: string, orasSlug: string) {
    router.push(`/schimb-valutar-judetean?judet=${judetSlug}&oras=${orasSlug}`);
  }

  return (
    <div>
      <div className="relative flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground">
        <span aria-hidden="true">📍</span>
        <select
          value={selected.slug}
          onChange={(e) => {
            const next = judete.find((j) => j.slug === e.target.value) ?? judete[0];
            goTo(next.slug, next.orase[0].slug);
          }}
          className="w-full cursor-pointer appearance-none bg-transparent pr-5 focus:outline-none"
        >
          {judete.map((j) => (
            <option key={j.slug} value={j.slug}>
              {j.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 text-muted" aria-hidden="true">
          ▾
        </span>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {selected.orase.map((o) => {
          const active = o.slug === currentOras;
          return (
            <button
              key={o.slug}
              type="button"
              onClick={() => goTo(selected.slug, o.slug)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-brand text-white"
                  : "border border-border text-muted hover:bg-background hover:text-foreground"
              }`}
            >
              {o.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
