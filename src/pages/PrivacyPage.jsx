import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import SEO from "../components/SEO";

export default function PrivacyPage() {
  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title="Privacy Policy"
        description="How pluggedin.solar collects, uses and protects personal data under UK GDPR."
        path="/privacy"
      />
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <SectionLabel>Privacy Policy</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 24, letterSpacing: "-0.02em" }}>
          Privacy Policy
        </h1>
        <p style={{ color: T.inkFaint, fontSize: "0.85rem", marginBottom: 32 }}>Last updated: 25 September 2026</p>

        <div className="prose">
          <p>This Privacy Policy describes how <strong>pluggedin.solar</strong> ("we", "us", "our") handles personal data. This site is operated by Edd Saunders, an independent sole trader based in the United Kingdom. Contact: <strong>hello@pluggedin.solar</strong>.</p>

          <h2>1. What we collect</h2>
          <p>We collect only the minimum data needed to run the site:</p>
          <ul>
            <li><strong>Postcode/ZIP</strong> you enter into the savings calculator (used to fetch solar irradiance data; not stored on our servers).</li>
            <li><strong>Email address</strong> if you sign up for our newsletter or full-report email (stored via our email service provider, Sender.net).</li>
            <li><strong>Analytics</strong> — Vercel Analytics and Vercel Speed Insights, which record aggregated page-view metrics and Core Web Vitals. No cookies, no cross-site tracking, no PII.</li>
            <li><strong>Approximate country</strong> — derived from your IP address at the Vercel edge, used only to show region-appropriate content. Not stored.</li>
          </ul>

          <h2>2. What we do NOT collect</h2>
          <ul>
            <li>We do not use Google Analytics, Facebook Pixel, or any cross-site tracking cookies.</li>
            <li>We do not sell, rent, or share your data with third-party marketers.</li>
            <li>We do not use behavioural retargeting.</li>
          </ul>

          <h2>3. Cookies</h2>
          <p>We use a single first-party cookie, <code>pin-market</code>, to remember whether you're viewing the UK, US, or Australian version of the site. It contains only your selected market code (uk/us/au), is stored for 30 days, and never leaves this domain. See our <a href="/cookies">Cookie Policy</a> for full detail.</p>

          <h2>4. Third parties</h2>
          <p>When you click an affiliate link (marked "affiliate" or "sponsored"), you leave our site and are subject to the destination site's own privacy practices. We receive a small commission if you buy but do not receive your personal purchase details. Networks we partner with: Awin, Amazon Associates, Commission Factory.</p>

          <h2>5. Your rights (UK GDPR / Data Protection Act 2018)</h2>
          <p>You have the right to access, correct, or delete any personal data we hold about you. Email <strong>hello@pluggedin.solar</strong> and we will respond within 30 days. You also have the right to complain to the <a href="https://ico.org.uk" target="_blank" rel="noreferrer">Information Commissioner's Office (ICO)</a>.</p>

          <h2>6. Data retention</h2>
          <p>Newsletter emails are retained until you unsubscribe (link in every email). Analytics data is aggregated and retained by Vercel for 90 days. Postcode/ZIP entries in the calculator are never persisted.</p>

          <h2>7. Changes to this policy</h2>
          <p>We will update this page and the "last updated" date above whenever material changes are made. Continued use of the site after changes constitutes acceptance.</p>
        </div>
      </div>
    </section>
  );
}
