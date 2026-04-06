import { Helmet } from "react-helmet-async";

const DOMAIN = "https://pluggedin.solar";
const DEFAULT_DESC = "Compare UK plug-in solar kits, calculate your savings with real PVGIS data, and find the right panel for your balcony, garden, or flat roof.";
const SITE_NAME = "Pluggedin.solar";

export default function SEO({ title, description, path, type = "website", jsonLd, noSuffix }) {
  const fullTitle = noSuffix ? title : `${title} | ${SITE_NAME}`;
  const desc = description || DEFAULT_DESC;
  const url = `${DOMAIN}${path || "/"}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
