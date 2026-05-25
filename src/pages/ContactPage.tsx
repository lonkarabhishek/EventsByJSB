import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { MapPin, Phone, Mail, Clock, Instagram, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";

const WEB3FORMS_KEY = "683f9335-f4c0-481e-ae0a-711e11c6414c";
const WA_NUMBER    = "919905168295";
const GOLD         = "#c9a96e";
const DARK         = "hsl(24 10% 5%)";

const buildWAMessage = (
  name: string,
  email: string,
  phone: string,
  eventType: string,
  date: string,
  message: string
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

const inputStyle = {
  fontSize: "16px",
  color: "#e8e0d0",
  border: "1px solid rgba(201,169,110,0.18)",
  background: "transparent",
  caretColor: GOLD,
  outline: "none",
  width: "100%",
};

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", eventType: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [waLink, setWaLink] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const msg = buildWAMessage(
      form.name, form.email, form.phone, form.eventType, form.date, form.message
    );
    setWaLink(`https://wa.me/${WA_NUMBER}?text=${msg}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Enquiry from ${form.name} via JSB Events`,
          from_name: "JSB Events Website",
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          event_date: form.date || "Not specified",
          event_type: form.eventType || "Not specified",
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", date: "", eventType: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const focusBorder  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    { (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}70`; };
  const blurBorder   = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.18)"; };

  return (
    <div className="min-h-screen" style={{ background: DARK }}>
      <Navbar />

      {/* ── Page hero ─────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pb-20 px-6 text-center overflow-hidden">
        {/* Radial gold glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "700px", height: "320px",
            background: "radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 68%)",
          }}
        />

        <FadeIn>
          <p className="font-body text-[10px] tracking-[0.5em] uppercase mb-5"
            style={{ color: GOLD }}>
            Get In Touch
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1
            className="font-heading font-light mb-5"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", color: "#e8e0d0", lineHeight: 0.95 }}
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
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto flex flex-col md:grid md:grid-cols-[1fr_1.65fr] gap-10 md:gap-14 items-start">

          {/* Left: Contact info panel */}
          <FadeIn direction="left">
            <div
              className="md:sticky md:top-28 p-8 space-y-7"
              style={{
                background: "rgba(201,169,110,0.04)",
                border: "1px solid rgba(201,169,110,0.13)",
              }}
            >
              {/* Heading */}
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

              {/* Info rows */}
              <div className="space-y-5">
                {[
                  {
                    icon: <Phone className="w-[15px] h-[15px]" />,
                    label: "Phone",
                    content: <a href="tel:+919905168295" className="font-body text-sm hover:text-[#c9a96e] transition-colors duration-300" style={{ color: "#e8e0d0" }}>+91 99051 68295</a>,
                  },
                  {
                    icon: <MessageCircle className="w-[15px] h-[15px]" />,
                    label: "WhatsApp",
                    content: <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="font-body text-sm hover:text-[#c9a96e] transition-colors duration-300" style={{ color: "#e8e0d0" }}>+91 99051 68295</a>,
                  },
                  {
                    icon: <Mail className="w-[15px] h-[15px]" />,
                    label: "Email",
                    content: <a href="mailto:hello@jsbevents.com" className="font-body text-sm hover:text-[#c9a96e] transition-colors duration-300" style={{ color: "#e8e0d0" }}>hello@jsbevents.com</a>,
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

              {/* Divider */}
              <div className="h-px" style={{ background: `${GOLD}18` }} />

              {/* Social links */}
              <div>
                <p className="font-body text-[9px] tracking-[0.35em] uppercase mb-3"
                  style={{ color: "rgba(232,224,208,0.28)" }}>
                  Follow Us
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/eventsbyjsb"
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
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://wa.me/${WA_NUMBER}`}
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
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Form */}
          <FadeIn delay={0.15}>
            {status === "success" ? (
              /* ── Success state ─────────────────────────── */
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
              /* ── Form ─────────────────────────────────── */
              <div>
                <div className="mb-8">
                  <p className="font-body text-[9px] tracking-[0.45em] uppercase mb-3"
                    style={{ color: GOLD }}>
                    Send an Enquiry
                  </p>
                  <h2 className="font-heading text-2xl md:text-3xl font-light leading-tight"
                    style={{ color: "#e8e0d0" }}>
                    Tell Us About<br />
                    <em className="italic" style={{ color: "rgba(201,169,110,0.7)" }}>Your Celebration</em>
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">

                  {/* Row 1 */}
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <input
                      type="text" placeholder="Your Name *" required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="px-4 py-3.5 font-body placeholder:text-[rgba(232,224,208,0.3)] transition-all duration-300"
                      style={inputStyle}
                      onFocus={focusBorder} onBlur={blurBorder}
                    />
                    <input
                      type="email" placeholder="Email Address *" required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="px-4 py-3.5 font-body placeholder:text-[rgba(232,224,208,0.3)] transition-all duration-300"
                      style={inputStyle}
                      onFocus={focusBorder} onBlur={blurBorder}
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <input
                      type="tel" placeholder="Phone Number"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="px-4 py-3.5 font-body placeholder:text-[rgba(232,224,208,0.3)] transition-all duration-300"
                      style={inputStyle}
                      onFocus={focusBorder} onBlur={blurBorder}
                    />
                    <input
                      type="date"
                      value={form.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                      className="px-4 py-3.5 font-body transition-all duration-300"
                      style={{
                        ...inputStyle,
                        color: form.date ? "#e8e0d0" : "rgba(232,224,208,0.3)",
                        colorScheme: "dark" as React.CSSProperties["colorScheme"],
                      }}
                      onFocus={focusBorder} onBlur={blurBorder}
                    />
                  </div>

                  {/* Event type */}
                  <select
                    value={form.eventType}
                    onChange={e => setForm({ ...form, eventType: e.target.value })}
                    className="px-4 py-3.5 font-body w-full transition-all duration-300 appearance-none"
                    style={{
                      ...inputStyle,
                      background: DARK,
                      color: form.eventType ? "#e8e0d0" : "rgba(232,224,208,0.3)",
                    }}
                    onFocus={focusBorder} onBlur={blurBorder}
                  >
                    <option value="" style={{ background: "hsl(24 10% 8%)", color: "rgba(232,224,208,0.5)" }}>
                      Select Event Type
                    </option>
                    {["Wedding", "Destination Wedding", "Engagement", "Corporate Event", "Private Celebration"].map(t => (
                      <option key={t} value={t} style={{ background: "hsl(24 10% 8%)", color: "#e8e0d0" }}>{t}</option>
                    ))}
                  </select>

                  {/* Message */}
                  <textarea
                    placeholder="Tell us about your dream celebration..."
                    required rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="px-4 py-3.5 font-body resize-none placeholder:text-[rgba(232,224,208,0.3)] transition-all duration-300"
                    style={inputStyle}
                    onFocus={focusBorder} onBlur={blurBorder}
                  />

                  {/* Error */}
                  {status === "error" && (
                    <div className="flex items-center gap-2 font-body text-sm" style={{ color: "#d97070" }}>
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      Something went wrong. Please try again or reach us on WhatsApp.
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto px-10 py-3.5 font-body text-[11px] tracking-[0.35em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: GOLD, color: "#0c0a08" }}
                    onMouseEnter={e => {
                      if (status !== "sending")
                        (e.currentTarget as HTMLElement).style.background = "#d4b878";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = GOLD;
                    }}
                  >
                    {status === "sending" ? "Sending..." : "Send Enquiry"}
                  </button>
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
