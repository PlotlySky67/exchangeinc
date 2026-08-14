import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
                C
              </span>
              <span className="text-base font-bold text-foreground">
                Curs<span className="text-brand">Actual</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Curs valutar zilnic, convertor și istoric al cursurilor, pe baza
              cursului de referință publicat de Banca Națională a României.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Navigare</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><Link href="/" className="hover:text-brand">Acasă</Link></li>
              <li><Link href="/convertor" className="hover:text-brand">Convertor valutar</Link></li>
              <li><Link href="/istoric" className="hover:text-brand">Istoric curs</Link></li>
              <li><Link href="/schimb-valutar-judetean" className="hover:text-brand">Schimb valutar județean</Link></li>
              <li><Link href="/despre" className="hover:text-brand">Despre</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Sursa datelor</h3>
            <p className="mt-3 text-sm text-muted">
              Cursurile oficiale provin din fluxul public XML al{" "}
              <a
                href="https://www.bnr.ro/Cursul-de-schimb-3544.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                Băncii Naționale a României
              </a>
              . Secțiunea de comparare case de schimb afișează date demonstrative.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} CursActual. Proiect independent, fără
          afiliere cu Banca Națională a României sau cu alte platforme de curs
          valutar. Informațiile au caracter orientativ și nu constituie sfat
          financiar.
        </div>
      </div>
    </footer>
  );
}
