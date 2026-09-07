"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LAUNCH_DATE_ISO, LAUNCH_DATE_LABEL } from "@/lib/launch";
import { LogoMark } from "@/components/Logo";
import Fireworks from "@/components/Fireworks";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
}

function getRemaining(): Remaining {
  const diffMs = Math.max(0, new Date(LAUNCH_DATE_ISO).getTime() - Date.now());
  const totalMinutes = Math.floor(diffMs / 60000);
  return {
    days: Math.floor(totalMinutes / (60 * 24)),
    hours: Math.floor((totalMinutes % (60 * 24)) / 60),
    minutes: totalMinutes % 60,
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function ComingSoon() {
  const [remaining, setRemaining] = useState<Remaining>(() => getRemaining());

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 30000);
    return () => clearInterval(id);
  }, []);

  const tiles = [
    { label: "zile", value: remaining.days },
    { label: "ore", value: remaining.hours },
    { label: "min", value: remaining.minutes },
  ];

  return (
    <div
      className="relative flex min-h-full flex-1 flex-col items-center justify-center overflow-hidden px-4 text-center"
      style={{ background: "#0b1220" }}
    >
      <Fireworks />

      <div className="relative z-10 flex flex-col items-center">
        <button
          type="button"
          aria-label="indicial.ro"
          className="cursor-pointer transition-transform duration-300 ease-out hover:scale-110 active:scale-90 active:duration-150"
        >
          <LogoMark size={84} />
        </button>
        <p className="mt-4 text-lg font-bold tracking-tight" style={{ color: "#edf1f9" }}>
          indicial<span style={{ color: "#4f9ae0" }}>.ro</span>
        </p>
        <h1
          className="mt-5 text-xl font-bold tracking-tight sm:text-2xl"
          style={{ color: "#edf1f9" }}
        >
          {"În curând.."}
        </h1>
        <p
          className="mt-2 max-w-md text-base sm:max-w-none sm:whitespace-nowrap"
          style={{ color: "#93a0bb" }}
        >
          Curs valutar BNR, convertor valutar și cotații valutare în timp real !
        </p>

        <div className="mt-9 flex gap-3.5">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="w-20 rounded-2xl py-4 text-center"
              style={{ background: "#121b2e", border: "1px solid #223049" }}
            >
              <div
                className="font-mono text-3xl font-extrabold tabular-nums"
                style={{ color: "#edf1f9" }}
              >
                {pad(tile.value)}
              </div>
              <div
                className="mt-1 text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: "#93a0bb" }}
              >
                {tile.label}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-7 text-sm font-bold" style={{ color: "#4f9ae0" }}>
          Din {LAUNCH_DATE_LABEL}
        </p>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 z-10 overflow-hidden py-3"
        style={{ background: "#121b2e", borderTop: "1px solid #223049" }}
      >
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-3 pr-3">
              <a
                href="https://www.rotld.ro"
                target="_blank"
                rel="noopener noreferrer"
                title="Domeniu înregistrat prin ROTLD"
                className="flex items-center rounded-full px-3 py-1 whitespace-nowrap"
                style={{ background: "#ffffff", border: "1px solid #000000" }}
              >
                <Image
                  src="/rotld-logo.png"
                  alt="ROTLD"
                  width={76}
                  height={40}
                  className="h-6 w-auto"
                />
              </a>
              <a
                href="https://anpc.ro"
                target="_blank"
                rel="noopener noreferrer"
                title="ANPC · Soluționarea Alternativă a Litigiilor (SAL)"
                className="flex items-center overflow-hidden rounded-lg"
                style={{ background: "#121b2e", border: "1px solid #000000" }}
              >
                <Image
                  src="/anpc-sal-logo.png"
                  alt="ANPC SAL"
                  width={130}
                  height={32}
                  className="h-8 w-auto"
                />
              </a>
              <span
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap"
                style={{ background: "#ffffff", border: "1px solid #000000", color: "#10172a" }}
              >
                <Image
                  src="/awesome-logo.png"
                  alt="Awesome Solutions & Software"
                  width={31}
                  height={16}
                  className="h-4 w-auto"
                />
                powered by awesome solutions&software
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
