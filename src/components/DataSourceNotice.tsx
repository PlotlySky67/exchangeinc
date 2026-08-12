export default function DataSourceNotice({
  source,
  className = "",
}: {
  source: "live" | "fallback";
  className?: string;
}) {
  if (source === "live") return null;
  return (
    <div
      className={`rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-xs font-medium text-accent-foreground ${className}`}
      style={{ color: "var(--accent)" }}
    >
      ⚠ Flux BNR indisponibil momentan — se afișează date de rezervă (cache),
      nu curs live.
    </div>
  );
}
