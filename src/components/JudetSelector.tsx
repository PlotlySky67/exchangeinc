"use client";

import { useRouter } from "next/navigation";
import type { Judet } from "@/lib/judete";

export default function JudetSelector({
  judete,
  current,
}: {
  judete: Judet[];
  current: string;
}) {
  const router = useRouter();

  return (
    <select
      value={current}
      onChange={(e) => router.push(`/schimb-valutar-judetean?judet=${e.target.value}`)}
      className="rounded-md border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground focus:border-brand focus:outline-none"
    >
      {judete.map((j) => (
        <option key={j.slug} value={j.slug}>
          {j.name}
        </option>
      ))}
    </select>
  );
}
