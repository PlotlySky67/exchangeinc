import type { MetadataRoute } from "next";
import { JUDETE } from "@/lib/judete";

const SITE_URL = "https://www.indicial.ro";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/convertor`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/schimb-valutar-judetean`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/compara-case-schimb`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/istoric`, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/cum-aleg-o-casa-de-schimb-buna`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/despre`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/termeni-si-conditii`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/politica-de-confidentialitate`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cookie-uri`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Each județ/oraș pair renders meaningfully different office listings, so
  // it's worth a distinct sitemap entry even though they share one route
  // via query params.
  //
  // Next.js's sitemap() renderer writes `url` straight into <loc> without
  // XML-escaping it, so a raw "&" between query params produces invalid XML
  // (confirmed: Google Search Console reported "couldn't fetch" because of
  // exactly this). Escape it ourselves as &amp; — the only XML-special
  // character these generated URLs can contain, since judet/oraș slugs are
  // already stripped down to plain ASCII by slugify().
  const judetRoutes: MetadataRoute.Sitemap = JUDETE.flatMap((judet) =>
    judet.orase.map((oras) => ({
      url: `${SITE_URL}/schimb-valutar-judetean?judet=${judet.slug}&amp;oras=${oras.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...judetRoutes];
}
