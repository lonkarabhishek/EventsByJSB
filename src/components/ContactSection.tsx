import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, ChevronRight, Check, Calendar, Users, DollarSign } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const WA_NUMBER = "919905168295";
const PHONE     = "+91 99051 68295";

const EVENT_TYPES = [
  { id: "wedding",    label: "Wedding",    emoji: "💍", desc: "Destination and Celebration Weddings" },
  { id: "engagement", label: "Engagement", emoji: "💑", desc: "Roka and Engagement Ceremonies"       },
  { id: "corporate",  label: "Corporate",  emoji: "🏢", desc: "Corporate Events and Parties"         },
  { id: "social",     label: "Social",     emoji: "🎉", desc: "Birthdays and Private Celebrations"   },
];

const BUDGET_LABELS = ["Under 5L", "5 to 10L", "10 to 25L", "25 to 50L", "50L+"];

/* ── Floating-label input ── */
const FloatInput = ({
  label, type = "text", value, onChange, required = false,
}: { label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean }) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative">
      <input
        type={type}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pt-6 pb-2 px-4 bg-transparent font-body text-sm outline-none"
        style={{
          color: "#e8e0d0",
          borderBottom: `1px solid ${focused ? "#c9a96e" : "rgba(201,169,110,0.25)"}`,
          transition: "border-color 0.3s",
          fontSize: "16px", /* prevents iOS zoom */
        }}
        placeholder=" "
      />
      <label
        className="absolute left-4 pointer-events-none font-body transition-all duration-300"
        style={{
          top: lifted ? "4px" : "16px",
          fontSize: lifted ? "10px" : "13px",
          color: focused ? "#c9a96e" : "rgba(201,169,110,0.5)",
          letterSpacing: lifted ? "0.15em" : "0",
          textTransform: lifted ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
    </div>
  );
};

/* ── Floating-label textarea ── */
const FloatTextarea = ({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative">
      <textarea
        rows={3}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pt-6 pb-2 px-4 bg-transparent font-body text-sm outline-none resize-none"
        style={{
          color: "#e8e0d0",
          borderBottom: `1px solid ${focused ? "#c9a96e" : "rgba(201,169,110,0.25)"}`,
          transition: "border-color 0.3s",
          fontSize: "16px",
        }}
        placeholder=" "
      />
      <label
        className="absolute left-4 pointer-events-none font-body transition-all duration-300"
        style={{
          top: lifted ? "4px" : "16px",
          fontSize: lifted ? "10px" : "13px",
          color: focused ? "#c9a96e" : "rgba(201,169,110,0.5)",
          letterSpacing: lifted ? "0.15em" : "0",
          textTransform: lifted ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
    </div>
  );
};

/* ── Build pre-filled WhatsApp message ── */
const buildWAMessage = (params: {
  eventType: string; date: string; guests: number;
  budget: number; location: string; name: string; phone: string; email: string; message: string;
}) => {
  const { eventType, date, guests, budget, location, name, phone, email, message } = params;
  const typeLabel = EVENT_TYPES.find(e => e.id === eventType)?.label ?? eventType;
  const lines = [
    `Hi JSB Events! I would like to enquire about planning my event.`,
    ``,
    `Event Type: ${typeLabel}`,
    date     ? `Date: ${date}`                  : null,
    `Guests: ${guests}`,
    `Budget: ${BUDGET_LABELS[budget]}`,
    location ? `Location: ${location}`          : null,
    ``,
    `Name: ${name}`,
    phone    ? `Phone: ${phone}`                : null,
    email    ? `Email: ${email}`                : null,
    message  ? `\nMessage: ${message}`          : null,
    ``,
    `Looking forward to hearing from you!`,
  ].filter(l => l !== null);
  return encodeURIComponent(lines.join("\n"));
};

/* ── Main component ── */
const ContactSection = () => {
  const [step,       setStep]       = useState(0);
  const [direction,  setDirection]  = useState<1 | -1>(1);
  const [animating,  setAnimating]  = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [sending,    setSending]    = useState(false);
  const [waLink,     setWaLink]     = useState("");

  const [eventType, setEventType] = useState("");
  const [date,      setDate]      = useState("");
  const [guests,    setGuests]    = useState(50);
  const [budget,    setBudget]    = useState(2);
  const [location,  setLocation]  = useState("");
  const [name,      setName]      = useState("");
  const [phone,     setPhone]     = useState("");
  const [email,     setEmail]     = useState("");
  const [message,   setMessage]   = useState("");

  const STEPS = ["Event Type", "Event Details", "Your Details"];

  const goTo = (next: number) => {
    if (animating) return;
    setDirection(next > step ? 1 : -1);
    setAnimating(true);
    setTimeout(() => { setStep(next); setAnimating(false); }, 320);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    /* Build pre-filled WA link before submit */
    const encoded = buildWAMessage({ eventType, date, guests, budget, location, name, phone, email, message });
    setWaLink(`https://wa.me/${WA_NUMBER}?text=${encoded}`);

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "683f9335-f4c0-481e-ae0a-711e11c6414c",
          subject: `New Enquiry from ${name} - JSB Events`,
          from_name: "JSB Events Website",
          name, email,
          phone:      phone    || "Not provided",
          event_type: eventType,
          event_date: date     || "Not specified",
          guests:     guests.toString(),
          budget:     BUDGET_LABELS[budget],
          location:   location || "Not specified",
          message:    message  || "No message",
        }),
      });
    } catch { /* silent */ }

    setSending(false);
    setSubmitted(true);
  };

  const slideStyle: React.CSSProperties = {
    animation: animating
      ? `slideOut${direction > 0 ? "Left" : "Right"} 0.32s ease forwards`
      : `slideIn${direction > 0 ? "Right" : "Left"} 0.32s ease forwards`,
  };

  return (
    <>
      <style>{`
        @keyframes slideOutLeft  { to   { transform:translateX(-50px); opacity:0 } }
        @keyframes slideOutRight { to   { transform:translateX( 50px); opacity:0 } }
        @keyframes slideInRight  { from { transform:translateX( 50px); opacity:0 } to { transform:translateX(0); opacity:1 } }
        @keyframes slideInLeft   { from { transform:translateX(-50px); opacity:0 } to { transform:translateX(0); opacity:1 } }
        @keyframes popIn { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.12);opacity:1} 100%{transform:scale(1);opacity:1} }
        .animate-pop-in { animation: popIn 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards }
        input[type="range"] { -webkit-appearance:none; appearance:none; background:transparent; width:100% }
        input[type="range"]::-webkit-slider-runnable-track { height:2px; background:rgba(201,169,110,0.2); border-radius:1px }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; background:#c9a96e; border-radius:50%; margin-top:-9px; cursor:pointer; box-shadow:0 0 0 4px rgba(201,169,110,0.15); transition:box-shadow 0.2s }
        input[type="range"]::-webkit-slider-thumb:hover { box-shadow:0 0 0 8px rgba(201,169,110,0.18) }
        input[type="date"]::-webkit-calendar-picker-indicator { filter:invert(0.6) sepia(1) saturate(2) hue-rotate(10deg); cursor:pointer }
      `}</style>

      <section id="contact" className="py-0">
        {/* Mobile: stacked. Desktop: side-by-side */}
        <div className="flex flex-col md:grid md:grid-cols-2 min-h-0">

          {/* LEFT: info + background image */}
          <div className="relative overflow-hidden" style={{ minHeight: "380px" }}>
            <img
              src="/gallery/mandap-velvet.jpg"
              alt="JSB Events celebration"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(135deg,rgba(0,0,0,0.84) 0%,rgba(0,0,0,0.52) 60%,rgba(0,0,0,0.75) 100%)" }} />

            <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-10 md:p-12 lg:p-16" style={{ minHeight: "380px" }}>
              <div>
                <FadeIn>
                  <p className="font-body text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: "#c9a96e" }}>
                    Get In Touch
                  </p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h2 className="font-heading font-light leading-tight mb-4" style={{ fontSize: "clamp(1.8rem,5vw,3rem)", color: "#fff" }}>
                    Let's Begin<br />
                    <em className="italic" style={{ color: "#c9a96e" }}>Your Story</em>
                  </h2>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="font-body text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                    Share your vision and we'll craft something extraordinary together.
                  </p>
                </FadeIn>
              </div>

              <FadeIn delay={0.3}>
                <div className="flex flex-col gap-4 mt-8">
                  {[
                    { Icon: Phone,  label: "Call / WhatsApp", value: PHONE },
                    { Icon: Mail,   label: "Email",           value: "hello@jsbevents.com" },
                    { Icon: MapPin, label: "Office",          value: "New Delhi, India" },
                  ].map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ border: "1px solid rgba(201,169,110,0.35)", background: "rgba(201,169,110,0.08)" }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: "#c9a96e" }} />
                      </div>
                      <div>
                        <p className="font-body text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(201,169,110,0.55)" }}>{label}</p>
                        <p className="font-body mt-0.5" style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px" }}>{value}</p>
                      </div>
                    </div>
                  ))}

                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=Hi%20JSB%20Events!%20I%27d%20like%20to%20enquire%20about%20planning%20my%20event.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 mt-1 font-body text-[11px] tracking-[0.25em] uppercase self-start"
                    style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.35)", color: "#25D366" }}
                  >
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* RIGHT: multi-step form */}
          <div className="flex flex-col justify-center p-6 sm:p-10 md:p-12 lg:p-16" style={{ background: "hsl(24 8% 7%)" }}>

            {submitted ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center text-center py-10 animate-pop-in">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.4)" }}>
                  <Check className="w-7 h-7" style={{ color: "#c9a96e" }} />
                </div>
                <h3 className="font-heading font-light mb-2" style={{ fontSize: "clamp(1.5rem,4vw,2rem)", color: "#e8e0d0" }}>
                  Thank You, {name}!
                </h3>
                <p className="font-body text-sm leading-relaxed max-w-xs mb-2" style={{ color: "rgba(232,224,208,0.45)", fontSize: "13px" }}>
                  Your enquiry has been received. We'll reach out within 10 minutes.
                </p>
                <div className="flex items-center gap-2 mb-7">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-body" style={{ color: "rgba(232,224,208,0.35)", fontSize: "11px" }}>Under 10 minute response</span>
                </div>
                {/* Pre-filled WhatsApp CTA */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 font-body text-[11px] tracking-[0.25em] uppercase w-full justify-center"
                  style={{ background: "rgba(37,211,102,0.18)", border: "1px solid rgba(37,211,102,0.45)", color: "#25D366" }}
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Continue on WhatsApp</span>
                </a>
                <p className="font-body mt-3" style={{ color: "rgba(232,224,208,0.25)", fontSize: "10px" }}>
                  Your details are pre-filled in the message
                </p>
              </div>
            ) : (
              <>
                {/* Progress stepper */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    {STEPS.map((s, i) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => i < step && goTo(i)}
                        className="flex items-center gap-1.5 sm:gap-2"
                        style={{ cursor: i < step ? "pointer" : "default" }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center font-body transition-all duration-300 flex-shrink-0"
                          style={{
                            fontSize: "10px",
                            background: i <= step ? "#c9a96e" : "transparent",
                            border: `1px solid ${i <= step ? "#c9a96e" : "rgba(201,169,110,0.3)"}`,
                            color: i <= step ? "#0c0a08" : "rgba(201,169,110,0.5)",
                          }}
                        >
                          {i < step ? <Check className="w-3 h-3" /> : i + 1}
                        </div>
                        <span
                          className="font-body hidden sm:block"
                          style={{
                            fontSize: "10px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: i === step ? "#c9a96e" : "rgba(201,169,110,0.35)",
                          }}
                        >
                          {s}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="h-px w-full relative" style={{ background: "rgba(201,169,110,0.12)" }}>
                    <div
                      className="absolute top-0 left-0 h-full transition-all duration-500"
                      style={{ background: "#c9a96e", width: `${(step / (STEPS.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={slideStyle}>

                    {/* Step 0: Event type */}
                    {step === 0 && (
                      <div>
                        <h3 className="font-heading font-light mb-1" style={{ fontSize: "clamp(1.3rem,4vw,1.8rem)", color: "#e8e0d0" }}>
                          What are we celebrating?
                        </h3>
                        <p className="font-body mb-6" style={{ color: "rgba(232,224,208,0.35)", fontSize: "12px" }}>
                          Select your event type to get started
                        </p>
                        <div className="grid grid-cols-2 gap-2.5">
                          {EVENT_TYPES.map(et => (
                            <button
                              key={et.id}
                              type="button"
                              onClick={() => setEventType(et.id)}
                              className="p-3.5 sm:p-4 text-left transition-all duration-300"
                              style={{
                                border: `1px solid ${eventType === et.id ? "#c9a96e" : "rgba(201,169,110,0.2)"}`,
                                background: eventType === et.id ? "rgba(201,169,110,0.1)" : "transparent",
                                transform: eventType === et.id ? "translateY(-2px)" : "none",
                              }}
                            >
                              <span className="text-xl sm:text-2xl block mb-2">{et.emoji}</span>
                              <p
                                className="font-heading font-light mb-0.5"
                                style={{ fontSize: "clamp(0.9rem,3vw,1.1rem)", color: eventType === et.id ? "#c9a96e" : "#e8e0d0" }}
                              >
                                {et.label}
                              </p>
                              <p className="font-body leading-snug hidden sm:block" style={{ fontSize: "10px", color: "rgba(232,224,208,0.35)" }}>
                                {et.desc}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 1: Event details */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <h3 className="font-heading font-light" style={{ fontSize: "clamp(1.3rem,4vw,1.8rem)", color: "#e8e0d0" }}>
                          Tell us the details
                        </h3>

                        {/* Date */}
                        <div>
                          <label className="flex items-center gap-1.5 font-body mb-2" style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
                            <Calendar className="w-3 h-3" /> Event Date
                          </label>
                          <input
                            type="date"
                            value={date}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={e => setDate(e.target.value)}
                            className="w-full px-4 py-3 bg-transparent font-body outline-none"
                            style={{ color: date ? "#e8e0d0" : "rgba(201,169,110,0.45)", borderBottom: "1px solid rgba(201,169,110,0.25)", fontSize: "16px", colorScheme: "dark" }}
                          />
                        </div>

                        {/* Guest slider */}
                        <div>
                          <label className="flex items-center justify-between font-body mb-3" style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
                            <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> Guest Count</span>
                            <span className="font-heading" style={{ fontSize: "1.2rem", color: "#c9a96e" }}>{guests}</span>
                          </label>
                          <input type="range" min={10} max={1000} step={10} value={guests} onChange={e => setGuests(Number(e.target.value))} />
                          <div className="flex justify-between mt-1 font-body" style={{ fontSize: "10px", color: "rgba(232,224,208,0.3)" }}>
                            <span>10</span><span>500</span><span>1000+</span>
                          </div>
                        </div>

                        {/* Budget slider */}
                        <div>
                          <label className="flex items-center justify-between font-body mb-3" style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
                            <span className="flex items-center gap-1.5"><DollarSign className="w-3 h-3" /> Budget Range</span>
                            <span className="font-heading" style={{ fontSize: "1rem", color: "#c9a96e" }}>{BUDGET_LABELS[budget]}</span>
                          </label>
                          <input type="range" min={0} max={4} step={1} value={budget} onChange={e => setBudget(Number(e.target.value))} />
                          <div className="flex justify-between mt-1 font-body" style={{ fontSize: "9px", color: "rgba(232,224,208,0.3)" }}>
                            {BUDGET_LABELS.map(l => <span key={l}>{l}</span>)}
                          </div>
                        </div>

                        <FloatInput label="Preferred Location / City" value={location} onChange={setLocation} />
                      </div>
                    )}

                    {/* Step 2: Personal details */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <h3 className="font-heading font-light" style={{ fontSize: "clamp(1.3rem,4vw,1.8rem)", color: "#e8e0d0" }}>
                          Almost there
                        </h3>
                        <FloatInput label="Your Name"     value={name}  onChange={setName}  required />
                        <FloatInput label="Phone Number"  type="tel"  value={phone} onChange={setPhone} required />
                        <FloatInput label="Email Address" type="email" value={email} onChange={setEmail} required />
                        <FloatTextarea label="Tell us about your dream event" value={message} onChange={setMessage} />
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={() => goTo(step - 1)}
                        className="font-body transition-colors duration-300"
                        style={{ color: "rgba(201,169,110,0.45)", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}
                      >
                        Back
                      </button>
                    ) : <div />}

                    {step < STEPS.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => { if (step === 0 && !eventType) return; goTo(step + 1); }}
                        className="flex items-center gap-2 px-6 py-3 font-body transition-all duration-300"
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          background: (step === 0 && !eventType) ? "transparent" : "#c9a96e",
                          color:      (step === 0 && !eventType) ? "rgba(201,169,110,0.4)" : "#0c0a08",
                          border:     (step === 0 && !eventType) ? "1px solid rgba(201,169,110,0.25)" : "none",
                          cursor:     (step === 0 && !eventType) ? "not-allowed" : "pointer",
                        }}
                      >
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={sending}
                        className="flex items-center gap-2 px-6 py-3 font-body transition-all duration-300"
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          background: sending ? "rgba(201,169,110,0.5)" : "#c9a96e",
                          color: "#0c0a08",
                        }}
                      >
                        {sending ? "Sending..." : "Send Enquiry"}
                        {!sending && <ChevronRight className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
