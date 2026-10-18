import type { Metadata } from "next";

const CONTACT_EMAIL = "contact@indicial.ro";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Scrie-ne pentru corectarea unui curs, o casă de schimb nouă de adăugat sau orice altă întrebare despre indicial.ro.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">Contact</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Scrie-ne</h1>
      <p className="mt-3 text-base text-muted">
        Ai găsit un curs greșit, vrei să adăugăm o casă de schimb nouă sau ai
        altă întrebare despre indicial.ro? Scrie-ne direct pe email.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-surface shadow-sm p-6">
        <p className="text-sm font-semibold text-foreground">Email</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-1 inline-block text-lg font-bold text-brand hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Răspundem de obicei în câteva zile lucrătoare. Dacă ne semnalezi un
          curs greșit, ajută să menționezi casa de schimb/banca, orașul și
          sursa (captură de ecran, link) de unde provine cursul corect.
        </p>
      </div>
    </div>
  );
}
