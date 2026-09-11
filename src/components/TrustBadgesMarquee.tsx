import Image from "next/image";

export default function TrustBadgesMarquee() {
  return (
    <div
      className="overflow-hidden py-3"
      style={{ background: "#0d3a63", borderTop: "1px solid #14528c" }}
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
              style={{ background: "#ffffff", border: "2px solid #000000" }}
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
              style={{ background: "#121b2e", border: "2px solid #000000" }}
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
              style={{ background: "#121b2e", border: "2px solid #000000", color: "#edf1f9" }}
            >
              <span className="flex items-center rounded px-0.5" style={{ background: "#ffffff" }}>
                <Image
                  src="/awesome-logo.png"
                  alt="Awesome Solutions & Software"
                  width={31}
                  height={16}
                  className="h-4 w-auto"
                />
              </span>
              Powered by Awesome Solutions &amp; Software
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
