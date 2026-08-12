export interface CurrencyMeta {
  code: string;
  name: string;
  flag: string;
}

// Currencies published daily by the National Bank of Romania (BNR).
export const CURRENCIES: CurrencyMeta[] = [
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "USD", name: "Dolar american", flag: "🇺🇸" },
  { code: "GBP", name: "Liră sterlină", flag: "🇬🇧" },
  { code: "CHF", name: "Franc elvețian", flag: "🇨🇭" },
  { code: "JPY", name: "Yen japonez (100)", flag: "🇯🇵" },
  { code: "CAD", name: "Dolar canadian", flag: "🇨🇦" },
  { code: "AUD", name: "Dolar australian", flag: "🇦🇺" },
  { code: "CNY", name: "Yuan chinezesc", flag: "🇨🇳" },
  { code: "HUF", name: "Forint maghiar (100)", flag: "🇭🇺" },
  { code: "PLN", name: "Zlot polonez", flag: "🇵🇱" },
  { code: "BGN", name: "Leva bulgărească", flag: "🇧🇬" },
  { code: "TRY", name: "Liră turcească", flag: "🇹🇷" },
  { code: "MDL", name: "Leu moldovenesc", flag: "🇲🇩" },
  { code: "NOK", name: "Coroană norvegiană", flag: "🇳🇴" },
  { code: "SEK", name: "Coroană suedeză", flag: "🇸🇪" },
  { code: "DKK", name: "Coroană daneză", flag: "🇩🇰" },
  { code: "CZK", name: "Coroană cehă", flag: "🇨🇿" },
  { code: "XAU", name: "Aur (gram)", flag: "🥇" },
];

export const DEFAULT_CURRENCY = "EUR";

export function currencyMeta(code: string): CurrencyMeta {
  return (
    CURRENCIES.find((c) => c.code === code.toUpperCase()) ?? {
      code: code.toUpperCase(),
      name: code.toUpperCase(),
      flag: "💱",
    }
  );
}
