import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, AlertCircle } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const WA_NUMBER      = "919905168295";
const PHONE          = "+91 99051 68295";
const WEB3FORMS_KEY  = "683f9335-f4c0-481e-ae0a-711e11c6414c";
const GOLD           = "#c9a96e";
const DARK           = "hsl(24 8% 7%)";

const EVENT_TYPES = [
  "Wedding",
  "Destination Wedding",
  "Engagement",
  "Corporate Event",
  "Private Celebration",
  "Other",
];

const buildWAMessage = (
  name: string, email: string, phone: string,
  eventType: string, date: string, message: string,
) => {
  const lines = [
    "Hi JSB Events! I would like to enquire about planning my event.",
    "",
    eventType ? `Event Type: ${eventType}` : null,
    date      ? `Event Date: ${date}`       : null,
    "",
    `Name: ${name}`,
    phone   ? `Phone: ${phone}`   : null,
    email   ? `Email: ${email}`   : null,
    message ? `\nMessage: ${message}` : null,
    "",
    "Looking forward to hearing from you!",
  ].filter((l): l is string => l !== null);
  return encodeURIComponent(lines.join("\n"));
};

/* ── Floating-label input (box style, matching ContactPage) ── */
interface FIProps {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  alwaysLifted?: boolean;
  min?: string;
}

const FloatingInput = ({
  label, type = "text", value, onChange,
  required = false, focused, onFocus, onBlur,
  alwaysLifted = false, min,
}: FIProps) => {
  const hasValue = value.length > 0;
  const lifted   = alwaysLifted || focused || hasValue;

  return (
    <div className="relative">
      <label
        className="absolute left-4 pointer-events-none font-body"
        style={{
          top: lifted ? "8px" : "50%",
          transform: lifted ? "none" : "translateY(-50%)",
          fontSize: lifted ? "9px" : "14px",
          letterSpacing: lifted ? "0.1em" : "normal",
          textTransform: lifted ? "uppercase" : "none",
          color: focused ? GOLD : lifted ? `${GOLD}90` : "rgba(232,224,208,0.3)",
          transition: "all 0.2s ease",
          zIndex: 1,
        }}
      >
        {label}{required ? " *" : ""}
      </label>

      <input
        type={type}
        required={required}
        value={value}
        min={min}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full font-body"
        style={{
          fontSize: "16px",
          color: hasValue ? "#e8e0d0" : "rgba(232,224,208,0.35)",
          border: `1px solid ${
            focused  ? `${GOLD}70` :
            hasValue ? `${GOLD}38` :
                       "rgba(201,169,110,0.18)"
          }`,
          background: type === "date" ? "hsl(24 10% 8%)" : "transparent",
          caretColor: GOLD,
          outline: "none",
          paddingTop: "24px",
          paddingBottom: "10px",
          paddingLeft: "16px",
          paddingRight: hasValue && type !== "date" ? "40px" : "16px",
          transition: "border-color 0.25s",
          colorScheme: type === "date" ? "dark" : undefined,
        } as React.CSSProperties}
      />

      {hasValue && type !== "date" && (
        <CheckCircle
          className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
          style={{ color: `${GOLD}80` }}
        />
      )}
    </div>
  );
};

/* ── Main component ── */
const ContactSection = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", eventType: "", message: "",
  });
  const [focused, setFocused]     = useState<string | null>(null);
  const [status, setStatus]       = useState<"idle" | "sending" | "success" | "error">("idle");
  const [waLink, setWaLink]       = useState("");
  const [charCount, setCharCount] = useState(0);

  const filled   = [form.name, form.email, form.eventType, form.message].filter(Boolean).length;
  const progress = Math.round((filled / 4) * 100);

  const set      = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));
  const focusOn  = (k: string) => () => setFocused(k);
  const blurAll  = () => setFocused(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const msg = buildWAMessage(
      form.name, form.email, form.phone, form.eventType, form.date, form.message,
    );
    setWaLink(`https://wa.me/${WA_NUMBER}?text=${msg}`);
    try {
      const res  = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key:  WEB3FORMS_KEY,
          subject:     `New Enquiry from ${form.name} via JSB Events`,
          from_name:   "JSB Events Website",
          name:        form.name,
          email:       form.email,
          phone:       form.phone     || "Not provided",
          event_date:  form.date      || "Not specified",
          event_type:  form.eventType || "Not specified",
          message:     form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", date: "", eventType: "", message: "" });
        setCharCount(0);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-0">
      <div className="flex flex-col md:grid md:grid-cols-2 min-h-0">

        {/* ── Left: image + contact info ──────────────── */}
        <div className="relative overflow-hidden" style={{ minHeight: "380px" }}>
          <img
            src="/gallery/mandap-velvet.jpg"
            alt="JSB Events celebration"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg,rgba(0,0,0,0.84) 0%,rgba(0,0,0,0.52) 60%,rgba(0,0,0,0.75) 100%)" }}
          />

          <div
            className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-10 md:p-12 lg:p-16"
            style={{ minHeight: "380px" }}
          >
            <div>
              <FadeIn>
                <p className="font-body text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: GOLD }}>
                  Get In Touch
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2
                  className="font-heading font-light leading-tight mb-4"
                  style={{ fontSize: "clamp(1.8rem,5vw,3rem)", color: "#fff" }}
                >
                  Let's Begin<br />
                  <em className="italic" style={{ color: GOLD }}>Your Story</em>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-body text-sm leading-relaxed max-w-xs"
                  style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                  Share your vision and we'll craft something extraordinary together.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.3}>
              <div className="flex flex-col gap-4 mt-8">
                {[
                  { Icon: Phone,  label: "Call / WhatsApp", value: PHONE              },
                  { Icon: Mail,   label: "Email",           value: "hello@jsbevents.com" },
                  { Icon: MapPin, label: "Office",          value: "New Delhi, India"    },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ border: "1px solid rgba(201,169,110,0.35)", background: "rgba(201,169,110,0.08)" }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: GOLD }} />
                    </div>
                    <div>
                      <p className="font-body text-[10px] tracking-[0.2em] uppercase"
                        style={{ color: "rgba(201,169,110,0.55)" }}>
                        {label}
                      </p>
                      <p className="font-body mt-0.5" style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px" }}>
                        {value}
                      </p>
                    </div>
                  </div>
                ))}

                <a
                  href={`https://wa.me/${WA_NUMBER}?text=Hi%20JSB%20Events!%20I%27d%20like%20to%20enquire%20about%20planning%20my%20event.`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 mt-1 font-body text-[11px] tracking-[0.25em] uppercase self-start"
                  style={{
                    background: "rgba(37,211,102,0.15)",
                    border: "1px solid rgba(37,211,102,0.35)",
                    color: "#25D366",
                  }}
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  Chat on WhatsApp
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ── Right: form ─────────────────────────────── */}
        <div
          className="flex flex-col justify-center p-6 sm:p-10 md:p-12 lg:p-16"
          style={{ background: DARK }}
        >
          {status === "success" ? (

            /* Success */
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{ background: `${GOLD}12`, border: `1px solid ${GOLD}40` }}
              >
                <CheckCircle className="w-6 h-6" style={{ color: GOLD }} />
              </div>
              <h3 className="font-heading text-2xl font-light mb-3" style={{ color: "#e8e0d0" }}>
                Enquiry Received
              </h3>
              <p className="font-body text-sm mb-8 max-w-xs"
                style={{ color: "rgba(232,224,208,0.45)" }}>
                Thank you for reaching out. We'll be in touch within 10 minutes.
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
              <p className="font-body text-[9px] tracking-[0.2em] uppercase"
                style={{ color: "rgba(232,224,208,0.28)" }}>
                Your details are pre-filled in the message
              </p>
            </div>

          ) : (

            /* Form */
            <div>

              {/* Progress bar */}
              <div className="mb-7">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-body text-[9px] tracking-[0.45em] uppercase" style={{ color: GOLD }}>
                    Send an Enquiry
                  </p>
                  <p className="font-body text-[9px] tracking-[0.2em]"
                    style={{ color: progress === 100 ? GOLD : "rgba(232,224,208,0.3)" }}>
                    {progress === 100 ? "Ready to send" : `${progress}% filled`}
                  </p>
                </div>
                <div className="h-px w-full" style={{ background: "rgba(201,169,110,0.12)" }}>
                  <div
                    className="h-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%`, background: GOLD }}
                  />
                </div>
              </div>

              <h2 className="font-heading text-2xl font-light leading-tight mb-6"
                style={{ color: "#e8e0d0" }}>
                Tell Us About<br />
                <em className="italic" style={{ color: "rgba(201,169,110,0.7)" }}>Your Celebration</em>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FloatingInput
                    label="Your Name" required
                    value={form.name} onChange={set("name")}
                    focused={focused === "name"}
                    onFocus={focusOn("name")} onBlur={blurAll}
                  />
                  <FloatingInput
                    label="Email Address" type="email" required
                    value={form.email} onChange={set("email")}
                    focused={focused === "email"}
                    onFocus={focusOn("email")} onBlur={blurAll}
                  />
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FloatingInput
                    label="Phone Number" type="tel"
                    value={form.phone} onChange={set("phone")}
                    focused={focused === "phone"}
                    onFocus={focusOn("phone")} onBlur={blurAll}
                  />
                  <FloatingInput
                    label="Event Date" type="date"
                    value={form.date} onChange={set("date")}
                    focused={focused === "date"}
                    onFocus={focusOn("date")} onBlur={blurAll}
                    alwaysLifted
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Event type pills */}
                <div>
                  <p className="font-body text-[9px] tracking-[0.3em] uppercase mb-3"
                    style={{ color: "rgba(232,224,208,0.3)" }}>
                    Event Type
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {EVENT_TYPES.map(t => {
                      const active = form.eventType === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, eventType: active ? "" : t }))}
                          className="px-3.5 py-2 font-body text-[10px] tracking-[0.15em] uppercase transition-all duration-200"
                          style={{
                            border:     `1px solid ${active ? GOLD : "rgba(201,169,110,0.22)"}`,
                            color:      active ? "#0c0a08" : "rgba(232,224,208,0.5)",
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
                              el.style.borderColor = "rgba(201,169,110,0.22)";
                              el.style.color = "rgba(232,224,208,0.5)";
                            }
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message + char count */}
                <div className="relative">
                  <label
                    className="absolute left-4 pointer-events-none font-body"
                    style={{
                      top: focused === "message" || form.message ? "9px" : "18px",
                      fontSize: focused === "message" || form.message ? "9px" : "14px",
                      letterSpacing: focused === "message" || form.message ? "0.1em" : "normal",
                      textTransform: focused === "message" || form.message ? "uppercase" : "none",
                      color: focused === "message" ? GOLD :
                             form.message ? `${GOLD}90` :
                             "rgba(232,224,208,0.3)",
                      transition: "all 0.2s ease",
                      zIndex: 1,
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    maxLength={500}
                    value={form.message}
                    onChange={e => { set("message")(e.target.value); setCharCount(e.target.value.length); }}
                    onFocus={focusOn("message")}
                    onBlur={blurAll}
                    className="w-full font-body resize-none"
                    style={{
                      fontSize: "16px",
                      color: "#e8e0d0",
                      border: `1px solid ${
                        focused === "message" ? `${GOLD}70` :
                        form.message          ? `${GOLD}38` :
                                                "rgba(201,169,110,0.18)"
                      }`,
                      background: "transparent",
                      caretColor: GOLD,
                      outline: "none",
                      paddingTop: "28px",
                      paddingBottom: "12px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      transition: "border-color 0.25s",
                    }}
                  />
                  <p className="text-right font-body text-[10px] mt-1.5"
                    style={{ color: charCount > 450 ? GOLD : "rgba(232,224,208,0.2)" }}>
                    {charCount} / 500
                  </p>
                </div>

                {/* Error */}
                {status === "error" && (
                  <div className="flex items-center gap-2 font-body text-sm" style={{ color: "#d97070" }}>
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Something went wrong. Please try again or reach us on WhatsApp.
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-8 py-4 font-body text-[11px] tracking-[0.35em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: GOLD, color: "#0c0a08" }}
                    onMouseEnter={e => {
                      if (status !== "sending")
                        (e.currentTarget as HTMLElement).style.background = "#d4b878";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = GOLD;
                    }}
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : "Send Enquiry"}
                  </button>

                  <a
                    href={`https://wa.me/${WA_NUMBER}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-4 font-body text-[11px] tracking-[0.3em] uppercase transition-all duration-300"
                    style={{ border: `1px solid ${GOLD}38`, color: GOLD }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background  = `${GOLD}10`;
                      el.style.borderColor = GOLD;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background  = "transparent";
                      el.style.borderColor = `${GOLD}38`;
                    }}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Chat on WhatsApp
                  </a>
                </div>

                {/* Response badge */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <span className="font-body text-[10px]" style={{ color: "rgba(232,224,208,0.3)" }}>
                    We typically respond in under 10 minutes
                  </span>
                </div>

              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
