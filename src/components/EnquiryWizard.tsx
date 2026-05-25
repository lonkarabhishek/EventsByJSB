import { useEffect, useRef, useState } from "react";
import { MessageCircle, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

const WA_NUMBER     = "919905168295";
const WEB3FORMS_KEY = "683f9335-f4c0-481e-ae0a-711e11c6414c";
const GOLD          = "#c9a96e";

const buildWAMessage = (a: Record<string, string>) => {
  const lines = [
    "Hi JSB Events! I would like to enquire about planning my event.",
    "",
    a.eventType ? `Event Type: ${a.eventType}` : null,
    a.date      ? `Event Date: ${a.date}`       : null,
    "",
    a.name      ? `Name: ${a.name}`             : null,
    a.phone     ? `Phone: ${a.phone}`           : null,
    a.email     ? `Email: ${a.email}`           : null,
    a.message   ? `\nMessage: ${a.message}`     : null,
    "",
    "Looking forward to hearing from you!",
  ].filter((l): l is string => l !== null);
  return encodeURIComponent(lines.join("\n"));
};

interface Step {
  id: string;
  question: string;
  hint: string;
  type: "pills" | "date" | "text" | "tel" | "email" | "textarea";
  placeholder?: string;
  options?: string[];
  required: boolean;
  skippable?: boolean;
}

const STEPS: Step[] = [
  {
    id: "eventType",
    question: "What are we celebrating?",
    hint: "Tap to select your event type",
    type: "pills",
    options: ["Wedding", "Destination Wedding", "Engagement", "Corporate Event", "Private Celebration", "Other"],
    required: true,
  },
  {
    id: "date",
    question: "When is your event?",
    hint: "Approximate date is fine — you can always change it later",
    type: "date",
    required: false,
    skippable: true,
  },
  {
    id: "name",
    question: "What's your name?",
    hint: "So we know who we're speaking with",
    type: "text",
    placeholder: "Your full name",
    required: true,
  },
  {
    id: "phone",
    question: "Best number to reach you?",
    hint: "We'll call or WhatsApp you directly",
    type: "tel",
    placeholder: "+91 XXXXX XXXXX",
    required: true,
  },
  {
    id: "email",
    question: "And your email address?",
    hint: "We'll send you a detailed proposal",
    type: "email",
    placeholder: "you@example.com",
    required: true,
  },
  {
    id: "message",
    question: "Tell us about your dream celebration",
    hint: "Any ideas, inspiration, or must-haves you'd like to share",
    type: "textarea",
    placeholder: "Dream venue, décor theme, guest count, special requests...",
    required: false,
    skippable: true,
  },
];

/* ── Shared animation hook ── */
const useStepTransition = () => {
  const [visible, setVisible] = useState(true);
  const [dir, setDir]         = useState<"up" | "down">("up");

  const transition = (fn: () => void, direction: "up" | "down") => {
    setDir(direction);
    setVisible(false);
    setTimeout(() => { fn(); setVisible(true); }, 280);
  };

  return { visible, dir, transition };
};

/* ── Wizard ── */
interface Props {
  /** dark background the wizard sits on */
  compact?: boolean;
}

const EnquiryWizard = ({ compact = false }: Props) => {
  const [stepIdx, setStepIdx]   = useState(0);
  const [answers, setAnswers]   = useState<Record<string, string>>({});
  const [status, setStatus]     = useState<"idle" | "sending" | "success" | "error">("idle");
  const [waLink, setWaLink]     = useState("");
  const { visible, dir, transition } = useStepTransition();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const step    = STEPS[stepIdx];
  const current = answers[step?.id] ?? "";
  const canNext = step?.required ? current.trim().length > 0 : true;

  /* auto-focus text inputs after step change */
  useEffect(() => {
    if (!step || step.type === "pills" || step.type === "date") return;
    const t = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(t);
  }, [stepIdx]);

  const setAnswer = (val: string) =>
    setAnswers(a => ({ ...a, [step.id]: val }));

  const advance = () => {
    if (stepIdx < STEPS.length - 1) {
      transition(() => setStepIdx(i => i + 1), "up");
    } else {
      submit();
    }
  };

  const back = () => {
    if (stepIdx > 0)
      transition(() => setStepIdx(i => i - 1), "down");
  };

  /* pill auto-advances after a short delay */
  const pickPill = (val: string) => {
    setAnswer(val);
    setTimeout(advance, 320);
  };

  const submit = async () => {
    setStatus("sending");
    const msg  = buildWAMessage(answers);
    const link = `https://wa.me/${WA_NUMBER}?text=${msg}`;
    setWaLink(link);
    try {
      const res  = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key:  WEB3FORMS_KEY,
          subject:     `New Enquiry from ${answers.name ?? "Unknown"} via JSB Events`,
          from_name:   "JSB Events Website",
          name:        answers.name     ?? "",
          email:       answers.email    ?? "",
          phone:       answers.phone    || "Not provided",
          event_date:  answers.date     || "Not specified",
          event_type:  answers.eventType|| "Not specified",
          message:     answers.message  || "No message",
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  /* ── Success screen ── */
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-8 md:py-12 px-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
          style={{ background: `${GOLD}12`, border: `1px solid ${GOLD}45` }}
        >
          <CheckCircle className="w-6 h-6" style={{ color: GOLD }} />
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-light mb-3" style={{ color: "#e8e0d0" }}>
          Enquiry Received
        </h3>
        <p className="font-body text-sm mb-8 max-w-xs" style={{ color: "rgba(232,224,208,0.45)" }}>
          Thank you{answers.name ? `, ${answers.name.split(" ")[0]}` : ""}! We'll be in touch within 10 minutes.
        </p>
        <a
          href={waLink}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 font-body text-[11px] tracking-[0.3em] uppercase mb-3 transition-all duration-300"
          style={{ background: GOLD, color: "#0c0a08" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#d4b878"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GOLD; }}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Continue on WhatsApp
        </a>
        <p className="font-body text-[9px] tracking-[0.2em] uppercase mb-8"
          style={{ color: "rgba(232,224,208,0.28)" }}>
          Your details are pre-filled in the message
        </p>
        <button
          onClick={() => { setStatus("idle"); setStepIdx(0); setAnswers({}); }}
          className="font-body text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
          style={{ color: "rgba(232,224,208,0.3)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(232,224,208,0.3)"; }}
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  /* ── Progress segments ── */
  const ProgressBar = () => (
    <div className="flex gap-1 mb-8 md:mb-10">
      {STEPS.map((_, i) => (
        <div
          key={i}
          className="h-[2px] flex-1 rounded-full transition-all duration-500"
          style={{ background: i < stepIdx ? GOLD : i === stepIdx ? `${GOLD}90` : "rgba(201,169,110,0.15)" }}
        />
      ))}
    </div>
  );

  /* ── Slide transition style ── */
  const animStyle: React.CSSProperties = {
    transition: "opacity 0.28s ease, transform 0.28s ease",
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : dir === "up" ? "translateY(-16px)" : "translateY(16px)",
  };

  /* ── Input rendering ── */
  const inputBase: React.CSSProperties = {
    fontSize: "16px",
    color: "#e8e0d0",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid rgba(201,169,110,0.3)`,
    caretColor: GOLD,
    outline: "none",
    width: "100%",
    padding: "12px 0",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const renderInput = () => {
    if (step.type === "pills") {
      return (
        <div className="flex flex-wrap gap-2">
          {step.options!.map(opt => {
            const active = current === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => pickPill(opt)}
                className="px-4 py-2.5 font-body text-[11px] tracking-[0.15em] uppercase transition-all duration-200"
                style={{
                  border:     `1px solid ${active ? GOLD : "rgba(201,169,110,0.25)"}`,
                  color:      active ? "#0c0a08" : "rgba(232,224,208,0.6)",
                  background: active ? GOLD : "transparent",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${GOLD}70`;
                    el.style.color = "#e8e0d0";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(201,169,110,0.25)";
                    el.style.color = "rgba(232,224,208,0.6)";
                  }
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      );
    }

    if (step.type === "date") {
      return (
        <input
          type="date"
          value={current}
          min={new Date().toISOString().split("T")[0]}
          onChange={e => setAnswer(e.target.value)}
          style={{
            ...inputBase,
            color: current ? "#e8e0d0" : "rgba(232,224,208,0.35)",
            colorScheme: "dark",
          } as React.CSSProperties}
        />
      );
    }

    if (step.type === "textarea") {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          rows={compact ? 3 : 4}
          value={current}
          placeholder={step.placeholder}
          onChange={e => setAnswer(e.target.value)}
          className="resize-none font-body"
          style={{
            ...inputBase,
            borderBottom: "none",
            border: `1px solid rgba(201,169,110,0.25)`,
            padding: "14px 16px",
          }}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={step.type}
        value={current}
        placeholder={step.placeholder}
        onChange={e => setAnswer(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter" && canNext) advance(); }}
        style={inputBase}
        onFocus={e => { e.currentTarget.style.borderBottomColor = GOLD; }}
        onBlur={e => { e.currentTarget.style.borderBottomColor = "rgba(201,169,110,0.3)"; }}
      />
    );
  };

  return (
    <div className="w-full">
      <ProgressBar />

      <div style={animStyle}>
        {/* Step counter */}
        <p className="font-body text-[9px] tracking-[0.4em] uppercase mb-3"
          style={{ color: "rgba(201,169,110,0.5)" }}>
          {stepIdx + 1} of {STEPS.length}
        </p>

        {/* Question */}
        <h3
          className="font-heading font-light leading-tight mb-2"
          style={{
            fontSize: compact ? "clamp(1.3rem, 4vw, 1.7rem)" : "clamp(1.5rem, 4vw, 2.1rem)",
            color: "#e8e0d0",
          }}
        >
          {step.question}
        </h3>

        {/* Hint */}
        <p className="font-body text-sm mb-6" style={{ color: "rgba(232,224,208,0.38)", fontSize: "12px" }}>
          {step.hint}
        </p>

        {/* Input */}
        {renderInput()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {/* Back */}
        {stepIdx > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1.5 font-body text-[10px] tracking-[0.3em] uppercase transition-colors duration-200"
            style={{ color: "rgba(201,169,110,0.4)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(201,169,110,0.4)"; }}
          >
            <ArrowLeft className="w-3 h-3" />
            Back
          </button>
        ) : (
          <div />
        )}

        {/* Skip + Continue/Submit — not shown for pills (auto-advances) */}
        {step.type !== "pills" && (
          <div className="flex items-center gap-3">
            {step.skippable && (
              <button
                type="button"
                onClick={advance}
                className="font-body text-[10px] tracking-[0.3em] uppercase transition-colors duration-200"
                style={{ color: "rgba(232,224,208,0.3)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(232,224,208,0.6)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(232,224,208,0.3)"; }}
              >
                Skip
              </button>
            )}

            <button
              type="button"
              onClick={advance}
              disabled={!canNext || status === "sending"}
              className="inline-flex items-center gap-2 px-6 py-3 font-body text-[11px] tracking-[0.3em] uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: canNext ? GOLD : "transparent", color: canNext ? "#0c0a08" : "rgba(201,169,110,0.4)", border: canNext ? "none" : `1px solid rgba(201,169,110,0.25)` }}
              onMouseEnter={e => { if (canNext) (e.currentTarget as HTMLElement).style.background = "#d4b878"; }}
              onMouseLeave={e => { if (canNext) (e.currentTarget as HTMLElement).style.background = GOLD; }}
            >
              {status === "sending" ? (
                <>
                  <svg className="animate-spin w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : stepIdx === STEPS.length - 1 ? (
                <>Send Enquiry <ArrowRight className="w-3.5 h-3.5" /></>
              ) : (
                <>Continue <ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Error message */}
      {status === "error" && (
        <p className="font-body text-sm mt-4" style={{ color: "#d97070" }}>
          Something went wrong. Please try again or{" "}
          <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
            style={{ color: GOLD, textDecoration: "underline" }}>
            chat on WhatsApp
          </a>.
        </p>
      )}

      {/* Response badge */}
      {stepIdx === STEPS.length - 1 && status !== "sending" && (
        <div className="flex items-center gap-2 mt-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="font-body text-[10px]" style={{ color: "rgba(232,224,208,0.28)" }}>
            We typically respond in under 10 minutes
          </span>
        </div>
      )}
    </div>
  );
};

export default EnquiryWizard;
