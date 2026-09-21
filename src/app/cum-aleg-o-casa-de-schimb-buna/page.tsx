import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cum aleg o casă de schimb bună",
  description:
    "Ghid practic: la ce te uiți înainte să schimbi valută la o casă de schimb, ca să nu pierzi bani pe comisioane ascunse sau curs dezavantajos.",
  alternates: { canonical: "/cum-aleg-o-casa-de-schimb-buna" },
};

const TIPS = [
  {
    title: "Compară cursul de cumpărare, nu doar pe cel de vânzare",
    body:
      "Dacă vinzi valută (ai euro/dolari și vrei lei), te interesează cursul de CUMPĂRARE al casei de schimb — cu cât e mai mare, cu atât primești mai mulți lei. Dacă vrei să cumperi valută, te interesează cursul de VÂNZARE — cu cât e mai mic, cu atât plătești mai puțini lei.",
  },
  {
    title: "Raportează-te mereu la cursul BNR al zilei",
    body:
      "Cursul BNR e reperul oficial, nu prețul la care poți schimba efectiv. O casă de schimb serioasă are un ecart (diferența dintre cumpărare și vânzare) rezonabil față de cursul BNR — un ecart foarte mare e un semn că plătești o marjă prea mare.",
  },
  {
    title: "Evită casele de schimb din zone turistice și gări/aeroporturi",
    body:
      "Cursurile din zonele cu trafic turistic intens (centre istorice, gări, aeroporturi) sunt aproape mereu mai dezavantajoase decât cele dintr-un cartier obișnuit sau dintr-un oraș mai mic, pentru că se bazează pe clienți grăbiți care nu mai compară.",
  },
  {
    title: "Întreabă explicit dacă există comision suplimentar",
    body:
      "Cursul afișat pe panou ar trebui să fie cursul final. Unele case de schimb adaugă totuși un comision fix sau procentual la sume mari — cere să ți se confirme suma finală înainte să predai banii.",
  },
  {
    title: "Cere bon fiscal / dovadă a tranzacției",
    body:
      "O casă de schimb autorizată emite întotdeauna bon fiscal sau chitanță cu suma, cursul și data. Lipsa bonului e un semnal de alarmă.",
  },
  {
    title: "Compară minimum 2-3 case de schimb înainte să schimbi sume mari",
    body:
      "Diferențele de curs între case de schimb din același oraș pot însemna zeci de lei în plus sau în minus la o sumă de câteva sute de euro. Merită câteva minute de comparație.",
  },
];

export default function CumAlegOCasaDeSchimbBunaPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">Ghid</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Cum aleg o casă de schimb bună
      </h1>
      <p className="mt-3 text-base text-muted">
        Câteva repere simple, practice, ca să nu pierzi bani atunci când
        schimbi valută la o casă de schimb fizică.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {TIPS.map((tip, i) => (
          <div
            key={tip.title}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <p className="text-xs font-semibold text-brand">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-1 text-base font-bold text-foreground">{tip.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{tip.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-brand/30 bg-brand/5 p-5">
        <p className="text-sm font-semibold text-foreground">
          Vrei să compari direct case de schimb reale?
        </p>
        <p className="mt-1 text-sm text-muted">
          Am adunat cursurile de cumpărare și vânzare de la case de schimb
          reale, pe județ și pe valută.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/compara-case-schimb"
            className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Compară case de schimb →
          </Link>
          <Link
            href="/schimb-valutar-judetean"
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-background"
          >
            Case de schimb pe județe
          </Link>
        </div>
      </div>
    </div>
  );
}
