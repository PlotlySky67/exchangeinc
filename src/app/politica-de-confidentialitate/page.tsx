import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politică de confidențialitate",
  description:
    "Ce date colectează indicial.ro, cum sunt folosite și ce drepturi ai în privința lor.",
  alternates: { canonical: "/politica-de-confidentialitate" },
};

export default function PoliticaDeConfidentialitatePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        Confidențialitate
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Politică de confidențialitate
      </h1>
      <p className="mt-3 text-sm text-muted">Ultima actualizare: 18 octombrie 2026</p>

      <div className="prose-sm mt-8 space-y-6 text-base leading-relaxed text-foreground">
        <section>
          <h2 className="text-lg font-bold text-foreground">1. Cine suntem</h2>
          <p className="mt-2 text-sm text-muted">
            indicial.ro este un proiect independent, cu caracter informativ,
            despre cursul valutar. Pentru orice întrebare legată de
            confidențialitate ne poți scrie la adresa indicată pe pagina{" "}
            <Link href="/contact" className="text-brand hover:underline">
              Contact
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">2. Ce date colectăm</h2>
          <p className="mt-2 text-sm text-muted">
            Site-ul nu are cont de utilizator și nu îți cerem nume, email sau
            alte date personale ca să folosești convertorul, istoricul
            cursurilor sau comparațiile de case de schimb. Singurele date
            colectate sunt statistici de trafic agregate și anonime (ex.
            pagini vizitate, țară aproximativă, tip de dispozitiv), prin
            Vercel Analytics — un serviciu care{" "}
            <strong>nu folosește cookie-uri</strong> și nu urmărește vizitatori
            individual pe mai multe site-uri. Detalii despre asta în pagina{" "}
            <Link href="/cookie-uri" className="text-brand hover:underline">
              Cookie-uri
            </Link>
            .
          </p>
          <p className="mt-2 text-sm text-muted">
            Dacă ne scrii prin pagina de Contact, folosim adresa ta de email
            doar ca să-ți răspundem — nu o adăugăm în nicio listă de
            marketing și nu o transmitem unor terți.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">3. Cum folosim datele</h2>
          <p className="mt-2 text-sm text-muted">
            Statisticile agregate de trafic sunt folosite exclusiv intern,
            pentru a înțelege ce pagini sunt utile și unde apar probleme
            tehnice. Nu vindem și nu închiriem date despre vizitatori.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">4. Servicii terțe</h2>
          <p className="mt-2 text-sm text-muted">
            Unele secțiuni ale site-ului (ex. graficul de curs interbancar)
            încarcă un widget public de la TradingView. Interacțiunea ta cu
            acel widget este guvernată de politica de confidențialitate a
            TradingView, nu de a noastră.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">5. Drepturile tale</h2>
          <p className="mt-2 text-sm text-muted">
            Din moment ce nu colectăm date personale identificabile prin
            simpla navigare pe site, nu există un profil al tău pe care să-l
            putem edita sau șterge. Dacă ne-ai scris vreodată prin email și
            vrei ca acel mesaj să fie șters din căsuța noastră, cere-ne asta
            la adresa din pagina{" "}
            <Link href="/contact" className="text-brand hover:underline">
              Contact
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">6. Modificări</h2>
          <p className="mt-2 text-sm text-muted">
            Putem actualiza această politică din când în când. Data de la
            începutul paginii arată ultima actualizare.
          </p>
        </section>
      </div>
    </div>
  );
}
