import Link from "next/link";
import { LogoMark, LogoWordmark } from "@/components/Logo";
import { getDailyRates } from "@/lib/bnr";

const NAV_LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/convertor", label: "Convertor valutar" },
  { href: "/schimb-valutar-judetean", label: "Județe" },
  { href: "/compara-case-schimb", label: "Compară case" },
  { href: "/istoric", label: "Istoric curs" },
  { href: "/despre", label: "Despre" },
];

const TICKER_CURRENCIES = ["EUR", "USD", "GBP", "CHF"];

function formatShortDate(dateStr: string): string {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "short",
  }).format(new Date(dateStr));
}

export default async function Header() {
  const snapshot = await getDailyRates();
  const tickerRates = TICKER_CURRENCIES.map((code) =>
    snapshot.rates.find((r) => r.currency === code),
  ).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <header className="sticky top-0 z-30 border-b border-border">
      {tickerRates.length > 0 && (
        <div className="overflow-x-auto bg-brand-dark px-4 py-1.5 text-white sm:px-6">
          <div className="flex w-max gap-5 text-xs font-semibold">
            {tickerRates.map((r) => (
              <span key={r.currency} className="whitespace-nowrap">
                {r.currency}{" "}
                <span className="font-mono opacity-90">
                  {(r.rate / r.multiplier).toFixed(4)}
                </span>
              </span>
            ))}
            <span className="whitespace-nowrap font-normal opacity-75">
              actualizat {formatShortDate(snapshot.date)}
            </span>
          </div>
        </div>
      )}
      <div className="bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <LogoMark size={36} />
          <LogoWordmark />
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/convertor"
          className="hidden shrink-0 rounded-full bg-foreground px-4 py-2.5 text-sm font-bold text-background transition-colors hover:opacity-85 sm:block"
        >
          Convertor →
        </Link>
        <Link
          href="/convertor"
          className="rounded-full bg-foreground px-3.5 py-2 text-sm font-bold text-background transition-colors hover:opacity-85 sm:hidden"
        >
          Convertor
        </Link>
      </div>
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border px-4 py-1.5 sm:hidden">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold text-muted hover:bg-background hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      </div>
    </header>
  );
}
