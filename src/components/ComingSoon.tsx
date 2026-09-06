import { LAUNCH_DATE_LABEL } from "@/lib/launch";
import { LogoMark, LogoWordmark } from "@/components/Logo";

export default function ComingSoon() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-background px-4 text-center">
      <LogoMark size={56} />
      <p className="mt-5">
        <LogoWordmark />
      </p>
      <h1 className="mt-6 max-w-lg text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {"În curând.."}
      </h1>
      <p className="mt-3 max-w-md text-base text-muted">
        Curs valutar BNR, convertor valutar și cotații valutare în timp
        real, disponibile din{" "}
        <span className="font-semibold text-foreground">{LAUNCH_DATE_LABEL}</span>.
      </p>
    </div>
  );
}
