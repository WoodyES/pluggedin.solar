import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import SEO from "../components/SEO";

export default function CookiesPage() {
  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title="Cookie Policy"
        description="A short, honest list of the cookies pluggedin.solar uses (spoiler: one)."
        path="/cookies"
      />
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <SectionLabel>Cookie Policy</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 24, letterSpacing: "-0.02em" }}>
          Cookie Policy
        </h1>
        <p style={{ color: T.inkFaint, fontSize: "0.85rem", marginBottom: 32 }}>Last updated: 25 September 2026</p>

        <div className="prose">
          <p>Short version: <strong>we use one cookie</strong>. It remembers your region. That's the whole story. This page is only this long because the ICO expects it to be.</p>

          <h2>1. The cookie we use</h2>
          <table>
            <thead><tr><th>Cookie</th><th>Purpose</th><th>Duration</th><th>Type</th></tr></thead>
            <tbody>
              <tr>
                <td><code>pin-market</code></td>
                <td>Remembers whether you selected UK, US, or Australian region so we can show region-appropriate content on your next visit.</td>
                <td>30 days</td>
                <td>Strictly necessary (functional)</td>
              </tr>
            </tbody>
          </table>

          <p>The <code>pin-market</code> cookie contains only a two-letter code (uk / us / au). It never leaves this domain, is never shared, and can't be used to identify you.</p>

          <h2>2. What we DON'T use</h2>
          <ul>
            <li>No Google Analytics</li>
            <li>No Facebook / Meta Pixel</li>
            <li>No behavioural advertising cookies</li>
            <li>No cross-site tracking</li>
            <li>No third-party marketing cookies</li>
          </ul>
          <p>Because we do not use any tracking or advertising cookies, we do not display a cookie consent banner &mdash; UK PECR and GDPR guidance permit "strictly necessary" cookies to be set without consent.</p>

          <h2>3. Analytics without cookies</h2>
          <p>We use Vercel Analytics and Vercel Speed Insights for aggregated performance metrics. These are cookie-free by design &mdash; they use anonymised, hashed request signals rather than persistent identifiers. No PII, no tracking.</p>

          <h2>4. Cookies set by affiliate networks</h2>
          <p>When you <em>click</em> an affiliate link (e.g. our EcoFlow, Amazon, or Commission Factory links), the destination site may set its own cookies to attribute the sale. Those cookies are set by the destination site under its own privacy policy, not by us. See our <a href="/disclosure">Affiliate Disclosure</a>.</p>

          <h2>5. How to disable cookies</h2>
          <p>You can clear or block cookies in your browser settings at any time. Disabling <code>pin-market</code> just means the site will re-detect your region on every visit &mdash; nothing else breaks.</p>

          <h2>6. Contact</h2>
          <p>Questions about cookies? Email <strong>hello@pluggedin.solar</strong>.</p>
        </div>
      </div>
    </section>
  );
}
