import { Head } from "vite-react-ssg";

const DOMAIN = "https://pluggedin.solar";
const DEFAULT_DESC = "Compare UK plug-in solar kits, calculate your savings with real PVGIS data, and find the right panel for your balcony, garden, or flat roof.";
const SITE_NAME = "Pluggedin.solar";
const DEFAULT_OG_IMAGE = `${DOMAIN}/og-default.png`;

export default function SEO({ title, description, path, type = "website", jsonLd, noSuffix, image, hreflang }) {
  const fullTitle = noSuffix ? title : `${title} | ${SITE_NAME}`;
  const desc = description || DEFAULT_DESC;
  const url = `${DOMAIN}${path || "/"}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {/* hreflang for multi-market pages */}
      {hreflang && hreflang.map(({ lang, href }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Head>
  );
}
