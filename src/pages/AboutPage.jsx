import { Link } from "react-router-dom";
import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import SEO from "../components/SEO";

export default function AboutPage() {
  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title="About"
        description="Who we are, how our data works, and our editorial policy. Pluggedin.solar is the UK's independent plug-in solar resource."
        path="/about"
      />
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <SectionLabel>About</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 24, letterSpacing: "-0.02em" }}>
          Independent plug-in solar information for the UK
        </h1>

        <div className="prose">
          <p>
            <strong>pluggedin.solar</strong> was created in early 2026 to give UK households clear, honest information about plug-in solar &mdash; a technology that's been transforming energy bills across Europe and is now coming to the UK.
          </p>

          <h2>Who runs this site?</h2>
          <p>
            This site is built and maintained by Edd Saunders, an independent researcher and technologist based in the UK. After the government's March 2026 announcement confirming the legalisation of plug-in solar, it became clear that thousands of households would need trustworthy, accessible guidance &mdash; not marketing dressed up as advice.
          </p>

          <h2>Our editorial policy</h2>
          <p>
            Every article, tool, and recommendation on this site follows three principles:
          </p>
          <ul>
            <li><strong>Independence first.</strong> We are not affiliated with any manufacturer, retailer, or energy supplier. No company pays for coverage or influences our recommendations.</li>
            <li><strong>Data over opinion.</strong> Our calculator uses real PVGIS irradiance data from the EU Joint Research Centre, live grid data from the Carbon Intensity API, and Ofgem-published tariff rates. We cite our sources and show our working.</li>
            <li><strong>Honest about uncertainty.</strong> Compliant kits are not yet available in the UK. Where we reference products, we say so clearly. We won't pretend you can buy something today that you can't.</li>
          </ul>

          <h2>How the calculator works</h2>
          <p>
            When you enter a UK postcode, we geocode it via <a href="https://postcodes.io" target="_blank" rel="noreferrer">postcodes.io</a> and query the <a href="https://re.jrc.ec.europa.eu/pvg_tools/en/" target="_blank" rel="noreferrer">PVGIS API</a> (Photovoltaic Geographical Information System) operated by the European Commission's Joint Research Centre. This gives us monthly solar irradiance data specific to your exact latitude and longitude, factoring in your panel angle and orientation.
          </p>
          <p>
            We then apply your self-consumption rate (based on how much time you spend at home during daylight hours) and your electricity tariff to calculate real savings. The seasonal graph shows how these savings fluctuate across the year &mdash; peaking in June/July and dipping in December/January.
          </p>

          <h2>How we'll make money</h2>
          <p>
            Once BSI-compliant kits are available (expected July 2026), we plan to earn revenue through affiliate partnerships with retailers and manufacturers. This means if you click a product link and make a purchase, we may earn a commission at no extra cost to you.
          </p>
          <p>
            Affiliate relationships will never influence our editorial recommendations. We will always recommend the best kit for your situation, and we'll clearly label affiliate links.
          </p>

          <h2>Contact</h2>
          <p>
            Have a question, correction, or press enquiry? Email <strong>hello@pluggedin.solar</strong>.
          </p>
        </div>

        <div style={{ marginTop: 48, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/calculator" style={{ padding: "12px 24px", borderRadius: 10, background: T.solar, color: "#fff", fontSize: "0.9rem", fontWeight: 600, fontFamily: T.display, textDecoration: "none", boxShadow: `0 2px 12px ${T.solarBorder}` }}>
            Try the calculator
          </Link>
          <Link to="/blog" style={{ padding: "12px 24px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.surface, color: T.ink, fontSize: "0.9rem", fontWeight: 600, fontFamily: T.display, textDecoration: "none" }}>
            Read the blog
          </Link>
        </div>
      </div>
    </section>
  );
}
