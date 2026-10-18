import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie-uri",
  description:
    "indicial.ro nu folosește cookie-uri de analiză sau publicitate. Vezi exact ce stochează site-ul în browserul tău.",
  alternates: { canonical: "/cookie-uri" },
};

export default function CookieUriPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">Cookie-uri</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Politica de cookie-uri
      </h1>
      <p className="mt-3 text-sm text-muted">Ultima actualizare: 18 octombrie 2026</p>

      <div className="prose-sm mt-8 space-y-6 text-base leading-relaxed text-foreground">
        <section>
          <h2 className="text-lg font-bold text-foreground">
            Scurt: nu folosim cookie-uri de analiză sau publicitate
          </h2>
          <p className="mt-2 text-sm text-muted">
            indicial.ro măsoară traficul prin Vercel Analytics, un serviciu
            care funcționează fără cookie-uri și fără identificatori
            persistenți — nu plasează niciun cookie în browserul tău și nu te
            urmărește de la o vizită la alta. De asta nu afișăm un banner de
            consimțământ: pur și simplu nu avem ce cookie-uri să-ți cerem
            acordul.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            Ce stochează totuși browserul tău
          </h2>
          <p className="mt-2 text-sm text-muted">
            Unele funcții ale site-ului (ex. tema preferată, filtrele din
            convertor) pot folosi <code>localStorage</code>, o memorie locală
            a browserului care nu e un cookie, nu e trimisă către server și
            nu ne e vizibilă nouă în niciun fel — rămâne strict pe
            dispozitivul tău și poate fi ștearsă oricând din setările
            browserului.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Widget-uri terțe</h2>
          <p className="mt-2 text-sm text-muted">
            Graficul de curs interbancar încarcă un widget public de la
            TradingView. Dacă TradingView plasează propriile cookie-uri când
            acel widget se încarcă, asta ține de politica lor, nu de a
            noastră — poți verifica detalii direct pe tradingview.com.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Dacă asta se schimbă</h2>
          <p className="mt-2 text-sm text-muted">
            Dacă la un moment dat adăugăm un serviciu care chiar folosește
            cookie-uri (de exemplu reclame), actualizăm această pagină și
            adăugăm un banner de consimțământ înainte de a le activa — vezi
            și{" "}
            <Link href="/politica-de-confidentialitate" className="text-brand hover:underline">
              Politica de confidențialitate
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
