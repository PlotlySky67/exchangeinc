export interface Oras {
  slug: string;
  name: string;
}

export interface Judet {
  slug: string;
  name: string;
  orase: Oras[];
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-");
}

function withSlugs(names: string[]): Oras[] {
  return names.map((name) => ({ slug: slugify(name), name }));
}

// Currently scoped to the counties where sample coverage has been defined.
// Add more județe/orașe here as real coverage expands.
export const JUDETE: Judet[] = [
  {
    slug: "suceava",
    name: "Suceava",
    orase: withSlugs([
      "Suceava",
      "Rădăuți",
      "Vicov",
      "Vatra Dornei",
      "Câmpulung Moldovenesc",
    ]),
  },
  {
    slug: "iasi",
    name: "Iași",
    orase: withSlugs(["Iași"]),
  },
  {
    slug: "bucuresti",
    name: "București",
    orase: withSlugs(["București"]),
  },
];

export const DEFAULT_JUDET = JUDETE[0].slug;
export const DEFAULT_ORAS = JUDETE[0].orase[0].slug;

export function judetBySlug(slug: string): Judet {
  return JUDETE.find((j) => j.slug === slug) ?? JUDETE[0];
}

export function orasBySlug(judet: Judet, slug: string): Oras {
  return judet.orase.find((o) => o.slug === slug) ?? judet.orase[0];
}
