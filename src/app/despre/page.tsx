import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Despre",
  description:
    "Despre Indicial.ro: sursa datelor, cum funcționează convertorul și limitele secțiunii de comparare case de schimb.",
};

export default function DesprePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">Despre</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Despre Indicial.ro
      </h1>

      <div className="prose-sm mt-6 space-y-5 text-base leading-relaxed text-foreground">
        <p>
          Indicial.ro este un proiect independent care afișează cursul valutar
          de referință publicat zilnic de{" "}
          <a
            href="https://www.bnr.ro/Cursul-de-schimb-3544.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            Banca Națională a României (BNR)
          </a>
          , pune la dispoziție un convertor valutar și un istoric al
          cursurilor cu grafic interactiv.
        </p>

        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-lg font-bold text-foreground">Sursa datelor</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted">
            <li>Cursul zilnic provine din fluxul XML public al BNR.</li>
            <li>
              Istoricul provine din arhivele anuale XML publicate tot de BNR.
            </li>
            <li>
              Dacă fluxul live este temporar indisponibil, aplicația afișează
              date de rezervă (cache), marcate explicit ca atare.
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-accent/40 bg-accent/10 p-5">
          <h2 className="text-lg font-bold text-foreground">
            Secțiunea &bdquo;Compară case de schimb&rdquo;
          </h2>
          <p className="mt-2 text-sm text-muted">
            Tabelul cu case de schimb de pe pagina principală conține{" "}
            <strong>date demonstrative</strong>, generate matematic pornind de
            la cursul BNR, pentru a ilustra funcționalitatea. Nu reprezintă
            cotații live de la case de schimb reale. Pentru date reale, această
            secțiune poate fi conectată la un furnizor de date propriu.
          </p>
        </div>

        <p className="text-sm text-muted">
          Indicial.ro nu este afiliat Băncii Naționale a României și nu oferă
          consultanță financiară. Informațiile au caracter orientativ.
        </p>
      </div>
    </div>
  );
}
