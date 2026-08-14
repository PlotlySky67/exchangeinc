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
    <div className="flex flex-col gap-2 sm:flex-row">
      <select
        value={selected.slug}
        onChange={(e) => {
          const next = judete.find((j) => j.slug === e.target.value) ?? judete[0];
          goTo(next.slug, next.orase[0].slug);
        }}
        className="rounded-md border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground focus:border-brand focus:outline-none"
      >
        {judete.map((j) => (
          <option key={j.slug} value={j.slug}>
            {j.name}
          </option>
        ))}
      </select>

      <select
        value={currentOras}
        onChange={(e) => goTo(selected.slug, e.target.value)}
        className="rounded-md border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground focus:border-brand focus:outline-none"
      >
        {selected.orase.map((o) => (
          <option key={o.slug} value={o.slug}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
}
