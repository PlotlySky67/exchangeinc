import { LAUNCH_DATE_LABEL } from "@/lib/launch";

export default function ComingSoon() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-background px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-2xl font-bold text-white">
        I
      </span>
      <p className="mt-5 text-lg font-bold tracking-tight text-foreground">
        Indicial<span className="text-brand">.ro</span>
      </p>
      <h1 className="mt-6 max-w-lg text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {"În curând.."}
      </h1>
      <p className="mt-3 max-w-md text-base text-muted">
        Curs valutar BNR, convertor valutar și istoric al cursurilor,
        disponibile din <span className="font-semibold text-foreground">{LAUNCH_DATE_LABEL}</span>.
      </p>
    </div>
  );
}
