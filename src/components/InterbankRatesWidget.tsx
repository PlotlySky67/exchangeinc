"use client";

import { useEffect, useRef } from "react";

const TRADINGVIEW_WIDGET_SRC =
  "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";

export default function InterbankRatesWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = TRADINGVIEW_WIDGET_SRC;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 400,
      currencies: ["EUR", "USD", "GBP", "CHF", "RON"],
      isTransparent: false,
      colorTheme: "light",
      locale: "ro",
    });
    container.appendChild(script);
  }, []);

  return (
    <div
      className="tradingview-widget-container min-h-[400px] overflow-hidden rounded-xl border border-border bg-surface"
      ref={containerRef}
    >
      <div className="tradingview-widget-container__widget flex min-h-[400px] items-center justify-center text-sm text-muted">
        Se încarcă cotațiile în timp real…
      </div>
    </div>
  );
}
