import { useState } from "react";
import T from "../tokens";

// ─── EMAIL CAPTURE ──────────────────────────────────────────────────────────
// Reusable signup form. Uses Formspree for collection (no backend needed).
// To set up: create a free account at formspree.io, create a form,
// and replace FORM_ID below with your form's ID (e.g. "xrgvbkdl").
//
// Formspree handles spam filtering, GDPR compliance, and stores submissions.
// You can export emails later to any email service (Mailchimp, ConvertKit, etc).

const FORM_ID = "xkopkned";
const ENDPOINT = `https://formspree.io/f/${FORM_ID}`;

export default function EmailCapture({ variant = "default" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="fu" style={{
        padding: variant === "inline" ? "16px 20px" : "24px",
        borderRadius: 12,
        border: `1px solid ${T.greenBorder}`,
        background: T.greenLight,
        textAlign: "center",
      }}>
        <div style={{ fontSize: "1.3rem", marginBottom: 8 }}>✅</div>
        <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, color: T.ink }}>You're on the list</div>
        <div style={{ fontSize: "0.78rem", color: T.inkMid, marginTop: 6 }}>We'll email you when BSI-compliant kits hit UK shops.</div>
      </div>
    );
  }

  const isCompact = variant === "inline";

  return (
    <form onSubmit={handleSubmit} style={{
      padding: isCompact ? "16px 20px" : "24px",
      borderRadius: 12,
      border: `1.5px solid ${T.solarBorder}`,
      background: T.solarLight,
    }}>
      <div style={{ fontFamily: T.display, fontSize: isCompact ? "0.9rem" : "1rem", fontWeight: 700, color: T.ink, marginBottom: 6 }}>
        Get notified when kits launch
      </div>
      <p style={{ fontSize: "0.78rem", color: T.inkMid, lineHeight: 1.6, marginBottom: 14 }}>
        Be first to know when BSI-compliant plug-in solar kits go on sale in the UK. No spam — just the launch alert and our best guides.
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            flex: 1, padding: "11px 14px", borderRadius: 8,
            border: `1px solid ${T.border}`, background: T.surface,
            color: T.ink, fontSize: "0.88rem", outline: "none",
            fontFamily: T.body,
          }}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            padding: "11px 18px", borderRadius: 8,
            border: "none",
            background: status === "sending" ? T.border : T.solar,
            color: status === "sending" ? T.inkFaint : "#fff",
            fontWeight: 700, fontSize: "0.84rem",
            fontFamily: T.display, whiteSpace: "nowrap",
            boxShadow: status === "sending" ? "none" : `0 2px 8px ${T.solarBorder}`,
            cursor: status === "sending" ? "wait" : "pointer",
          }}
        >
          {status === "sending" ? "⟳" : "Notify me →"}
        </button>
      </div>
      {status === "error" && (
        <div style={{ fontSize: "0.78rem", color: T.red, marginTop: 8 }}>Something went wrong — please try again.</div>
      )}
      <div style={{ fontSize: "0.65rem", color: T.inkFaint, marginTop: 10 }}>Join 2,400+ others. No spam. Unsubscribe anytime.</div>
    </form>
  );
}
