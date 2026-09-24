import Link from "next/link";

interface BankRate {
  name: string;
  buy: number;
  sell: number;
}

// Real EUR/RON quotes published by each bank, sourced by the site owner.
const BANK_RATES: BankRate[] = [
  { name: "Exim Banca Românească", buy: 5.214, sell: 5.314 },
  { name: "CEC Bank", buy: 5.2, sell: 5.32 },
  { name: "Libra Internet Bank", buy: 5.195, sell: 5.325 },
  { name: "BCR", buy: 5.188, sell: 5.339 },
  { name: "BRD", buy: 5.182, sell: 5.345 },
  { name: "Raiffeisen Bank", buy: 5.1798, sell: 5.3302 },
  { name: "Patria Bank", buy: 5.166, sell: 5.3727 },
  { name: "UniCredit Bank", buy: 5.15, sell: 5.37 },
];

function initials(name: string): string {
  return name
    .split(" ")
    .filter((w) => w.length > 1)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function BankRatesSection() {
  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        Curs valutar bănci EUR/RON
      </h2>
      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand">
        actualizat la data de 22 septembrie 2026
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Cursurile de cumpărare și vânzare EUR/RON afișate de principalele
        bănci din România.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/40 text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold sm:px-5">Bancă</th>
              <th className="px-4 py-3 text-right font-semibold sm:px-5">Cumpără</th>
              <th className="px-4 py-3 text-right font-semibold sm:px-5">Vinde</th>
            </tr>
          </thead>
          <tbody>
            {BANK_RATES.map((bank) => (
              <tr key={bank.name} className="border-b border-border last:border-0">
                <td className="px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                      {initials(bank.name)}
                    </span>
                    <span className="font-medium text-foreground">{bank.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono font-semibold text-foreground sm:px-5">
                  {bank.buy.toFixed(4)}
                </td>
                <td className="px-4 py-3 text-right font-mono font-semibold text-foreground sm:px-5">
                  {bank.sell.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">
        Cursurile pot varia; confirmă pe site-ul oficial al băncii înainte de
        a efectua o tranzacție. Vezi și{" "}
        <Link href="/termeni-si-conditii" className="text-brand hover:underline">
          termenii și condițiile
        </Link>
        .
      </p>
    </section>
  );
}
