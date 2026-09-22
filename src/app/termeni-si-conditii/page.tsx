import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description:
    "Termenii de utilizare a indicial.ro: scopul site-ului, sursa datelor, limitele de răspundere și drepturile de autor.",
  alternates: { canonical: "/termeni-si-conditii" },
};

export default function TermeniSiConditiiPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        Termeni și condiții
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Termeni și condiții de utilizare
      </h1>
      <p className="mt-3 text-sm text-muted">Ultima actualizare: 22 septembrie 2026</p>

      <div className="prose-sm mt-8 space-y-6 text-base leading-relaxed text-foreground">
        <section>
          <h2 className="text-lg font-bold text-foreground">1. Scopul site-ului</h2>
          <p className="mt-2 text-sm text-muted">
            indicial.ro este un proiect independent, cu caracter informativ, care
            afișează cursul valutar de referință publicat de Banca Națională a
            României (BNR), un convertor valutar, un istoric al cursurilor și
            cotații orientative de la case de schimb și bănci. Site-ul nu
            efectuează și nu intermediază tranzacții valutare.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            2. Fără afiliere și fără consultanță financiară
          </h2>
          <p className="mt-2 text-sm text-muted">
            indicial.ro nu este afiliat Băncii Naționale a României, băncilor
            comerciale sau caselor de schimb valutar menționate pe site.
            Informațiile prezentate au caracter strict orientativ și nu
            constituie consultanță financiară, fiscală sau juridică. Deciziile
            financiare luate pe baza informațiilor de pe acest site sunt în
            responsabilitatea exclusivă a utilizatorului.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">3. Acuratețea cursurilor</h2>
          <p className="mt-2 text-sm text-muted">
            Cursul oficial BNR provine din fluxul XML public al BNR și se poate
            actualiza cu întârziere față de momentul publicării oficiale.
            Cursurile caselor de schimb și ale băncilor sunt colectate manual,
            periodic, din surse publice (panouri fizice, site-uri proprii,
            agregatoare precum valutare.ro) și pot să nu reflecte cursul
            disponibil în timp real la sediul fiecărei instituții.{" "}
            <strong>
              Confirmă întotdeauna cursul direct la sediul casei de schimb sau
              al băncii, ori pe site-ul oficial al acesteia, înainte de a
              efectua o tranzacție.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">4. Limitarea răspunderii</h2>
          <p className="mt-2 text-sm text-muted">
            indicial.ro depune eforturi rezonabile pentru a menține informațiile
            corecte și actualizate, dar nu garantează acuratețea, completitudinea
            sau disponibilitatea neîntreruptă a acestora. Site-ul nu răspunde
            pentru eventuale pierderi financiare rezultate din utilizarea sau
            interpretarea informațiilor prezentate.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            5. Proprietate intelectuală și surse
          </h2>
          <p className="mt-2 text-sm text-muted">
            Cursul oficial provine din fluxul public al BNR. Cotațiile
            interbancare live folosesc widgetul public TradingView și API-ul
            public Frankfurter (curs de referință BCE). Harta județelor
            folosește conturul real din pachetul open-source{" "}
            <Link
              href="/despre"
              className="text-brand hover:underline"
            >
              @svg-maps/romania (CC-BY 4.0)
            </Link>
            . Numele băncilor și caselor de schimb sunt folosite exclusiv cu
            titlu informativ/comparativ, fără a implica o afiliere sau un
            parteneriat.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">6. Solicitări de eliminare</h2>
          <p className="mt-2 text-sm text-muted">
            Dacă reprezinți o casă de schimb sau o bancă menționată pe site și
            dorești corectarea sau eliminarea datelor afișate, informațiile
            respective vor fi actualizate sau eliminate prompt la cerere.
          </p>
        </section>

        <p className="text-sm text-muted">
          Pentru detalii despre sursele de date, vezi și pagina{" "}
          <Link href="/despre" className="text-brand hover:underline">
            Despre
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
