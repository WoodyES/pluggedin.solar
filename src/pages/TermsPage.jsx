import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import SEO from "../components/SEO";

export default function TermsPage() {
  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title="Terms & Conditions"
        description="Terms of use for pluggedin.solar — an independent UK plug-in solar information site."
        path="/terms"
      />
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <SectionLabel>Terms &amp; Conditions</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 24, letterSpacing: "-0.02em" }}>
          Terms &amp; Conditions
        </h1>
        <p style={{ color: T.inkFaint, fontSize: "0.85rem", marginBottom: 32 }}>Last updated: 25 September 2026</p>

        <div className="prose">
          <p>By using <strong>pluggedin.solar</strong> ("the site") you agree to these terms. This site is operated by Edd Saunders, sole trader, United Kingdom. Contact: <strong>hello@pluggedin.solar</strong>.</p>

          <h2>1. Nature of the content</h2>
          <p>Pluggedin.solar publishes editorial, informational and comparison content about plug-in solar systems. Nothing on this site constitutes financial, electrical, or legal advice. We are not qualified electricians and no article on this site should be treated as a substitute for professional advice or a proper G98 / G99 grid-code compliance check.</p>

          <h2>2. Accuracy disclaimer</h2>
          <p>We use best efforts to keep prices, specifications, regulatory information and product availability current. Solar market conditions, retailer pricing, and regulations (particularly around SI 2026 No. 848 and G98 compliance) change frequently. Verify all safety-critical information directly with the manufacturer, retailer, or your Distribution Network Operator (DNO) before purchase or installation.</p>

          <h2>3. Affiliate links</h2>
          <p>Some links on this site are affiliate links. When you click an affiliate link and make a purchase, we may earn a small commission at no additional cost to you. See our <a href="/disclosure">Affiliate Disclosure</a> for a full list of partners and how commissions work. Affiliate arrangements do not influence our editorial coverage.</p>

          <h2>4. External links</h2>
          <p>The site links to third-party websites (retailers, manufacturers, government resources). We are not responsible for the content, privacy practices, availability, or accuracy of those external sites. Follow external links at your own risk.</p>

          <h2>5. Calculator limitations</h2>
          <p>The savings calculator provides estimates only, based on PVGIS satellite irradiance data and industry-average tariff assumptions. Actual generation depends on shading, orientation, temperature, panel quality, and installation. Do not treat the estimate as a guarantee of savings.</p>

          <h2>6. Intellectual property</h2>
          <p>Site content (articles, calculator UI, imagery) is © pluggedin.solar 2026 unless otherwise stated. Personal, non-commercial reuse of short quotes with attribution and a link back is permitted. For commercial reuse, contact us.</p>

          <h2>7. Limitation of liability</h2>
          <p>To the maximum extent permitted by law, we accept no liability for any loss (financial, safety, or otherwise) arising from reliance on this site's content or the calculator's estimates. Your use of any recommendation is at your own risk.</p>

          <h2>8. Governing law</h2>
          <p>These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

          <h2>9. Changes to these terms</h2>
          <p>We may update these terms from time to time. The "last updated" date above reflects the most recent revision. Continued use of the site constitutes acceptance of the current terms.</p>
        </div>
      </div>
    </section>
  );
}
