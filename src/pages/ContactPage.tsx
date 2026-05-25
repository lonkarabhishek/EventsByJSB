import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import {
  MapPin, Phone, Mail, Clock, Instagram,
  CheckCircle, AlertCircle, MessageCircle,
} from "lucide-react";

const WEB3FORMS_KEY = "683f9335-f4c0-481e-ae0a-711e11c6414c";
const WA_NUMBER     = "919905168295";
const GOLD          = "#c9a96e";
const DARK          = "hsl(24 10% 5%)";

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

/* ── Floating-label input ───────────────────────────────────────── */
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
            focused   ? `${GOLD}70` :
            hasValue  ? `${GOLD}38` :
                        "rgba(201,169,110,0.18)"
          }`,
          background: type === "date" ? "hsl(24 10% 7%)" : "transparent",
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

/* ── Page ───────────────────────────────────────────────────────── */
const ContactPage = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", eventType: "", message: "",
  });
  const [focused, setFocused]   = useState<string | null>(null);
  const [status, setStatus]     = useState<"idle" | "sending" | "success" | "error">("idle");
  const [waLink, setWaLink]     = useState("");
  const [charCount, setCharCount] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* Progress: 4 key fields */
  const filled   = [form.name, form.email, form.eventType, form.message].filter(Boolean).length;
  const progress = Math.round((filled / 4) * 100);

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));
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
          access_key: WEB3FORMS_KEY,
          subject:    `New Enquiry from ${form.name} via JSB Events`,
          from_name:  "JSB Events Website",
          name:       form.name,
          email:      form.email,
          phone:      form.phone   || "Not provided",
          event_date: form.date    || "Not specified",
          event_type: form.eventType || "Not specified",
          message:    form.message,
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
    <div className="min-h-screen" style={{ background: DARK }}>
      <Navbar />

      {/* ── Page hero ─────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-32 pb-10 md:pb-20 px-6 text-center overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "700px", height: "320px",
            background: "radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 68%)",
          }}
        />
        <FadeIn>
          <p className="font-body text-[10px] tracking-[0.5em] uppercase mb-5" style={{ color: GOLD }}>
            Get In Touch
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1
            className="font-heading font-light mb-5"
            style={{ fontSize: "clamp(2.2rem, 8vw, 6.5rem)", color: "#e8e0d0", lineHeight: 0.95 }}
          >
            Let's Begin<br />
            <em className="italic" style={{ color: GOLD }}>Your Story</em>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12" style={{ background: `${GOLD}40` }} />
            <div className="w-1 h-1 rounded-full" style={{ background: `${GOLD}60` }} />
            <div className="h-px w-12" style={{ background: `${GOLD}40` }} />
          </div>
          <p className="font-body text-sm font-light max-w-sm mx-auto"
            style={{ color: "rgba(232,224,208,0.45)" }}>
            Tell us about your dream celebration. We respond within 10 minutes.
          </p>
        </FadeIn>
      </section>

      {/* ── Main grid ─────────────────────────────────────── */}
      {/* flex-col-reverse = form appears FIRST on mobile   */}
      <section className="px-4 md:px-6 pb-20 md:pb-32">
        <div className="max-w-5xl mx-auto flex flex-col-reverse md:grid md:grid-cols-[1fr_1.65fr] gap-8 md:gap-14 items-start">

          {/* ── Left: contact info ────────────────────────── */}
          <FadeIn direction="left">
            <div
              className="md:sticky md:top-28 p-5 md:p-8 space-y-6 md:space-y-7"
              style={{
                background: "rgba(201,169,110,0.04)",
                border: "1px solid rgba(201,169,110,0.13)",
              }}
            >
              <div>
                <p className="font-body text-[9px] tracking-[0.45em] uppercase mb-3"
                  style={{ color: "rgba(201,169,110,0.6)" }}>
                  Contact Details
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-light leading-tight"
                  style={{ color: "#e8e0d0" }}>
                  We'd Love to<br />
                  <em className="italic" style={{ color: "rgba(201,169,110,0.7)" }}>Hear From You</em>
                </h2>
              </div>

              <div className="space-y-5">
                {[
                  {
                    icon: <Phone className="w-[15px] h-[15px]" />,
                    label: "Phone",
                    content: (
                      <a href="tel:+919905168295"
                        className="font-body text-sm hover:text-[#c9a96e] transition-colors duration-300"
                        style={{ color: "#e8e0d0" }}>
                        +91 99051 68295
                      </a>
                    ),
                  },
                  {
                    icon: <MessageCircle className="w-[15px] h-[15px]" />,
                    label: "WhatsApp",
                    content: (
                      <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                        className="font-body text-sm hover:text-[#c9a96e] transition-colors duration-300"
                        style={{ color: "#e8e0d0" }}>
                        +91 99051 68295
                      </a>
                    ),
                  },
                  {
                    icon: <Mail className="w-[15px] h-[15px]" />,
                    label: "Email",
                    content: (
                      <a href="mailto:hello@jsbevents.com"
                        className="font-body text-sm hover:text-[#c9a96e] transition-colors duration-300"
                        style={{ color: "#e8e0d0" }}>
                        hello@jsbevents.com
                      </a>
                    ),
                  },
                  {
                    icon: <MapPin className="w-[15px] h-[15px]" />,
                    label: "Office",
                    content: (
                      <>
                        <p className="font-body text-sm" style={{ color: "#e8e0d0" }}>New Delhi, India</p>
                        <p className="font-body text-[11px] mt-0.5" style={{ color: "rgba(232,224,208,0.35)" }}>Available globally</p>
                      </>
                    ),
                  },
                  {
                    icon: <Clock className="w-[15px] h-[15px]" />,
                    label: "Hours",
                    content: (
                      <>
                        <p className="font-body text-sm" style={{ color: "#e8e0d0" }}>Mon to Sat</p>
                        <p className="font-body text-[11px] mt-0.5" style={{ color: "rgba(232,224,208,0.35)" }}>10 AM to 7 PM</p>
                      </>
                    ),
                  },
                ].map(({ icon, label, content }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="mt-0.5 w-8 h-8 flex items-center justify-center flex-shrink-0"
                      style={{ border: `1px solid ${GOLD}28`, color: GOLD }}
                    >
                      {icon}
                    </div>
                    <div>
                      <p className="font-body text-[9px] tracking-[0.25em] uppercase mb-1"
                        style={{ color: "rgba(232,224,208,0.28)" }}>
                        {label}
                      </p>
                      {content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px" style={{ background: `${GOLD}18` }} />

              <div>
                <p className="font-body text-[9px] tracking-[0.35em] uppercase mb-3"
                  style={{ color: "rgba(232,224,208,0.28)" }}>
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {[
                    {
                      href: "https://instagram.com/eventsbyjsb",
                      icon: <Instagram className="w-3.5 h-3.5" />,
                    },
                    {
                      href: `https://wa.me/${WA_NUMBER}`,
                      icon: (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      ),
                    },
                  ].map(({ href, icon }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                      style={{ border: `1px solid ${GOLD}22`, color: "rgba(232,224,208,0.4)" }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = GOLD; el.style.color = GOLD;
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = `${GOLD}22`; el.style.color = "rgba(232,224,208,0.4)";
                      }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── Right: interactive form ───────────────────── */}
          <FadeIn delay={0.1}>
            {status === "success" ? (

              /* Success state */
              <div
                className="flex flex-col items-center justify-center text-center py-16 md:py-20 px-8"
                style={{ border: "1px solid rgba(201,169,110,0.13)", background: "rgba(201,169,110,0.03)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ background: `${GOLD}12`, border: `1px solid ${GOLD}40` }}
                >
                  <CheckCircle className="w-6 h-6" style={{ color: GOLD }} />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-light mb-3"
                  style={{ color: "#e8e0d0" }}>
                  Enquiry Received
                </h3>
                <p className="font-body text-sm mb-8 max-w-xs"
                  style={{ color: "rgba(232,224,208,0.45)" }}>
                  Thank you for reaching out. We will be in touch within 10 minutes.
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
                  onClick={() => setStatus("idle")}
                  className="font-body text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
                  style={{ color: "rgba(232,224,208,0.3)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(232,224,208,0.3)"; }}
                >
                  Send Another Enquiry
                </button>
              </div>

            ) : (

              /* ── Form ── */
              <div>

                {/* Progress bar */}
                <div className="mb-7">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-body text-[9px] tracking-[0.45em] uppercase"
                      style={{ color: GOLD }}>
                      Send an Enquiry
                    </p>
                    <p className="font-body text-[9px] tracking-[0.2em]"
                      style={{ color: progress === 100 ? GOLD : "rgba(232,224,208,0.3)" }}>
                      {progress === 100 ? "Ready to send" : `${progress}% filled`}
                    </p>
                  </div>
                  {/* Track */}
                  <div className="h-px w-full" style={{ background: "rgba(201,169,110,0.12)" }}>
                    <div
                      className="h-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%`, background: GOLD }}
                    />
                  </div>
                </div>

                <h2 className="font-heading text-2xl md:text-3xl font-light leading-tight mb-6"
                  style={{ color: "#e8e0d0" }}>
                  Tell Us About<br />
                  <em className="italic" style={{ color: "rgba(201,169,110,0.7)" }}>Your Celebration</em>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Row 1: Name + Email */}
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

                  {/* Row 2: Phone + Date */}
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

                  {/* Event type pill selector */}
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
                              border: `1px solid ${active ? GOLD : "rgba(201,169,110,0.22)"}`,
                              color:  active ? "#0c0a08" : "rgba(232,224,208,0.5)",
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
                      rows={5}
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

                    {/* Primary submit */}
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
                      ) : (
                        "Send Enquiry"
                      )}
                    </button>

                    {/* WhatsApp shortcut */}
                    <a
                      href={`https://wa.me/${WA_NUMBER}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-4 font-body text-[11px] tracking-[0.3em] uppercase transition-all duration-300"
                      style={{ border: `1px solid ${GOLD}38`, color: GOLD }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background    = `${GOLD}10`;
                        el.style.borderColor   = GOLD;
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background    = "transparent";
                        el.style.borderColor   = `${GOLD}38`;
                      }}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Chat on WhatsApp
                    </a>
                  </div>

                  {/* Response time nudge */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    <span className="font-body text-[10px]" style={{ color: "rgba(232,224,208,0.3)" }}>
                      We typically respond in under 10 minutes
                    </span>
                  </div>

                </form>
              </div>
            )}
          </FadeIn>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
