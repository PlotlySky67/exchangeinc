export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-2xl bg-brand text-white"
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.56}
        height={size * 0.56}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 8h13M17 8l-3.5-3.5M17 8l-3.5 3.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 16H7M7 16l3.5-3.5M7 16l3.5 3.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function LogoWordmark({ size = "text-lg" }: { size?: string }) {
  return (
    <span className={`font-bold tracking-tight text-foreground ${size}`}>
      indicial<span className="text-brand">.ro</span>
    </span>
  );
}
