import Image from "next/image";
import Link from "next/link";

interface BankRate {
  name: string;
  buy: number;
  sell: number;
  logo?: string;
}

// Real EUR/RON quotes published by each bank, sourced by the site owner.
const BANK_RATES: BankRate[] = [
  { name: "CEC Bank", buy: 5.27, sell: 5.39, logo: "/cec-bank-logo.jpg" },
  {
    name: "Libra Internet Bank",
    buy: 5.265,
    sell: 5.395,
    logo: "/libra-internet-bank-logo.png",
  },
  {
    name: "UniCredit Bank",
    buy: 5.22,
    sell: 5.44,
    logo: "/unicredit-bank-logo.png",
  },
  {
    name: "Patria Bank",
    buy: 5.254,
    sell: 5.408,
    logo: "/patria-bank-logo.png",
  },
  { name: "BRD", buy: 5.243, sell: 5.409, logo: "/brd-logo.png" },
  {
    name: "Raiffeisen Bank",
    buy: 5.2533,
    sell: 5.4052,
    logo: "/raiffeisen-bank-logo.png",
  },
  { name: "BCR", buy: 5.259, sell: 5.41 },
  { name: "Exim Banca Românească", buy: 5.286, sell: 5.386 },
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

function BankLogo({ bank }: { bank: BankRate }) {
  return bank.logo ? (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-white">
      <Image
        src={bank.logo}
        alt={bank.name}
        width={32}
        height={32}
        className="h-full w-full object-contain p-1"
      />
    </span>
  ) : (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
      {initials(bank.name)}
    </span>
  );
}

function RateTable({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle: string;
  rows: { bank: BankRate; value: number }[];
}) {
  const best = rows[0]?.value;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="border-b border-border bg-brand/5 px-4 py-4 text-center sm:px-5">
        <p className="text-sm font-bold text-brand">{title}</p>
        <p className="mt-0.5 text-xs text-muted">{subtitle}</p>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map(({ bank, value }) => {
            const isBest = value === best;
            return (
              <tr key={bank.name} className="border-b border-border last:border-0">
                <td className="px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-3">
                    <BankLogo bank={bank} />
                    <span className="font-medium text-foreground">{bank.name}</span>
                    {isBest && (
                      <span className="rounded-full bg-positive/15 px-2 py-0.5 text-[10px] font-semibold text-positive">
                        cel mai bun
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono font-bold text-foreground sm:px-5">
                  {value.toFixed(4)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function BankRatesSection() {
  const buyRows = [...BANK_RATES]
    .sort((a, b) => b.buy - a.buy)
    .map((bank) => ({ bank, value: bank.buy }));
  const sellRows = [...BANK_RATES]
    .sort((a, b) => a.sell - b.sell)
    .map((bank) => ({ bank, value: bank.sell }));

  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        Curs valutar bănci EUR/RON
      </h2>
      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand">
        actualizat la data de 21 octombrie 2026
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Cursurile de cumpărare și vânzare EUR/RON afișate de principalele
        bănci din România, fiecare sortată după cursul cel mai avantajos.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RateTable
          title="Curs Cumpărare: EUR/RON"
          subtitle="Banca cumpără valută, clientul vinde valută"
          rows={buyRows}
        />
        <RateTable
          title="Curs Vânzare: EUR/RON"
          subtitle="Banca vinde valută, clientul cumpără valută"
          rows={sellRows}
        />
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
