import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import PanelFinderQuiz from "../components/PanelFinderQuiz";

export default function QuizPage() {
  return (
    <section style={{ padding: "100px 32px 80px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <SectionLabel>Find your kit</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 8, letterSpacing: "-0.02em" }}>Which plug-in solar kit is right for you?</h1>
        <p style={{ color: T.inkMid, fontSize: "0.95rem", marginBottom: 48, lineHeight: 1.6 }}>
          5 quick questions. Personalised recommendation. Takes about 30 seconds.
        </p>
        <div style={{ padding: "32px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.surface }}>
          <PanelFinderQuiz />
        </div>
      </div>
    </section>
  );
}
