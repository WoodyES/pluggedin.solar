import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import SEO from "../components/SEO";

export default function DisclosurePage() {
  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title="Affiliate Disclosure"
        description="Full disclosure of our affiliate partnerships — what we earn commission on, and how it does (and doesn't) affect our coverage."
        path="/disclosure"
      />
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <SectionLabel>Affiliate Disclosure</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 24, letterSpacing: "-0.02em" }}>
          Affiliate Disclosure
        </h1>
        <p style={{ color: T.inkFaint, fontSize: "0.85rem", marginBottom: 32 }}>Last updated: 25 September 2026</p>

        <div className="prose">
          <p>Short version: <strong>some links on this site earn us a small commission if you buy something</strong>. Your price stays the same. It doesn't buy the manufacturer favourable coverage &mdash; if a kit is bad, we say so.</p>

          <h2>1. How affiliate links work</h2>
          <p>An affiliate link is a URL with a tracking parameter that tells the destination retailer we sent you. If you click through and buy within a set window (usually 24 hours to 30 days), the retailer pays us a small percentage of the sale &mdash; typically 3&ndash;8% for solar hardware, capped at whatever the merchant sets. Your price is not increased.</p>

          <h2>2. Networks and partners we work with</h2>
          <ul>
            <li><strong>Awin</strong> &mdash; primarily EcoFlow UK (merchant 51797). Our publisher ID: 2846734.</li>
            <li><strong>Amazon Associates UK</strong> &mdash; tag <code>pluggedinsola-21</code>.</li>
            <li><strong>Amazon Associates US</strong> &mdash; tag <code>pluggedinsola-20</code>. Used on US-market articles.</li>
            <li><strong>Amazon Associates Australia</strong> &mdash; tag <code>pluggedinsola-22</code>. Used on AU-market articles.</li>
            <li><strong>Commission Factory</strong> &mdash; used for select UK and AU retailer relationships.</li>
          </ul>
          <p>We are actively evaluating additional networks for solar-specific merchants. We will update this list whenever we add or remove a partner.</p>

          <h2>3. How affiliate links are marked</h2>
          <p>Every affiliate link on this site is either:</p>
          <ul>
            <li>Marked with a "Affiliate link &mdash; we may earn a small commission" disclaimer in the product card, or</li>
            <li>Tagged with <code>rel="sponsored"</code> in the HTML source (per Google's guidelines), or</li>
            <li>Both.</li>
          </ul>
          <p>You can hover any product card or price link to see the destination URL before clicking. Affiliate URLs typically go through <code>awin1.com</code>, <code>amazon.co.uk/com/com.au</code>, or a commission network's redirect.</p>

          <h2>4. Editorial policy: how affiliate links do NOT influence us</h2>
          <p>This is the important part. Every product we cover was chosen because we think it is a genuinely reasonable option for UK/US/AU plug-in solar buyers &mdash; not because of the commission rate.</p>
          <ul>
            <li>We do not accept payment for coverage or reviews.</li>
            <li>We do not accept free product samples in exchange for positive coverage.</li>
            <li>We publish critical reviews of products from affiliate partners when the product warrants it (see our Bright Saver review, our critique of some EcoFlow SKUs' price positioning, etc.).</li>
            <li>We publish non-affiliate options (JA Solar, Hoymiles, Trina) alongside affiliate ones when they're the honest recommendation.</li>
          </ul>

          <h2>5. Regulatory compliance</h2>
          <p>This disclosure complies with:</p>
          <ul>
            <li><strong>UK ASA / CAP Code</strong> &mdash; affiliate content is clearly labelled and identifiable as commercial.</li>
            <li><strong>US FTC 16 CFR Part 255</strong> &mdash; material connections with retailers disclosed.</li>
            <li><strong>Australian ACCC Guidelines</strong> &mdash; commercial relationships disclosed prominently.</li>
            <li><strong>Google Search Central guidelines</strong> &mdash; all paid links carry <code>rel="sponsored"</code>.</li>
          </ul>

          <h2>6. Contact</h2>
          <p>Questions about our affiliate practices, or a specific link you're unsure about? Email <strong>hello@pluggedin.solar</strong> &mdash; we'll respond within a working week.</p>
        </div>
      </div>
    </section>
  );
}
