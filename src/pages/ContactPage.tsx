import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from "lucide-react";
import EnquiryWizard from "@/components/EnquiryWizard";

const WA_NUMBER = "919905168295";
const FOREST    = "#1B3A2D";
const IVORY     = "#FAF8F3";
const CREAM     = "#EEE9DF";

const ContactPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen" style={{ background: IVORY }}>
      <Navbar />

      {/* Page hero */}
      <section className="relative pt-24 md:pt-32 pb-10 md:pb-20 px-6 text-center overflow-hidden"
        style={{ background: CREAM }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: "700px", height: "320px", background: "radial-gradient(ellipse, rgba(27,58,45,0.05) 0%, transparent 68%)" }}
        />
        <FadeIn>
          <p className="font-body text-[10px] tracking-[0.5em] uppercase mb-5" style={{ color: FOREST }}>
            Get In Touch
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1
            className="font-heading font-light mb-5"
            style={{ fontSize: "clamp(2.2rem, 8vw, 6.5rem)", color: "#1B2E24", lineHeight: 0.95 }}
          >
            Let's Begin<br />
            <em className="italic" style={{ color: FOREST }}>Your Story</em>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12" style={{ background: `rgba(27,58,45,0.2)` }} />
            <div className="w-1 h-1 rounded-full" style={{ background: `rgba(27,58,45,0.35)` }} />
            <div className="h-px w-12" style={{ background: `rgba(27,58,45,0.2)` }} />
          </div>
          <p className="font-body text-sm font-light max-w-sm mx-auto"
            style={{ color: "rgba(27,46,36,0.48)" }}>
            Answer a few quick questions and we'll get back to you within 10 minutes.
          </p>
        </FadeIn>
      </section>

      {/* Main grid — wizard first on mobile */}
      <section className="px-4 md:px-6 pb-20 md:pb-32 pt-10 md:pt-16" style={{ background: IVORY }}>
        <div className="max-w-5xl mx-auto flex flex-col-reverse md:grid md:grid-cols-[1fr_1.65fr] gap-8 md:gap-14 md:items-start">

          {/* Left: contact info */}
          <FadeIn direction="left" className="w-full">
            <div className="md:sticky md:top-28 overflow-hidden"
              style={{ border: "1px solid rgba(27,58,45,0.12)", background: CREAM }}>

              {/* Header band */}
              <div className="px-6 pt-7 pb-6 relative"
                style={{ background: "rgba(27,58,45,0.05)", borderBottom: "1px solid rgba(27,58,45,0.1)" }}>
                {/* Forest corner accent */}
                <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
                  style={{ borderTop: `2px solid ${FOREST}`, borderLeft: `2px solid ${FOREST}` }} />

                <p className="font-body text-[9px] tracking-[0.5em] uppercase mb-3"
                  style={{ color: `rgba(27,58,45,0.55)` }}>
                  Reach Us
                </p>
                <h2 className="font-heading text-2xl font-light leading-snug"
                  style={{ color: "#1B2E24" }}>
                  We'd Love to<br />
                  <em className="italic" style={{ color: FOREST }}>Hear From You</em>
                </h2>

                {/* Response badge */}
                <div className="flex items-center gap-2 mt-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  <span className="font-body text-[10px]" style={{ color: "rgba(27,46,36,0.42)" }}>
                    Typically responds in under 10 minutes
                  </span>
                </div>
              </div>

              {/* Clickable contact rows */}
              <div style={{ background: CREAM }}>

                {/* Phone */}
                <a href="tel:+919905168295"
                  className="flex items-center gap-4 px-6 py-4 group transition-all duration-200"
                  style={{ borderBottom: "1px solid rgba(27,58,45,0.08)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(27,58,45,0.05)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(27,58,45,0.07)", border: `1px solid rgba(27,58,45,0.2)` }}>
                    <Phone className="w-3.5 h-3.5" style={{ color: FOREST }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-[9px] tracking-[0.25em] uppercase mb-0.5"
                      style={{ color: "rgba(27,46,36,0.35)" }}>Phone</p>
                    <p className="font-body text-sm" style={{ color: "#1B2E24" }}>+91 99051 68295</p>
                  </div>
                  <svg className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: FOREST }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 px-6 py-4 group transition-all duration-200"
                  style={{ borderBottom: "1px solid rgba(27,58,45,0.08)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.04)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.25)" }}>
                    <MessageCircle className="w-3.5 h-3.5" style={{ color: "#25D366" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-[9px] tracking-[0.25em] uppercase mb-0.5"
                      style={{ color: "rgba(27,46,36,0.35)" }}>WhatsApp</p>
                    <p className="font-body text-sm" style={{ color: "#1B2E24" }}>+91 99051 68295</p>
                  </div>
                  <svg className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#25D366" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Email */}
                <a href="mailto:hello@jsbevents.com"
                  className="flex items-center gap-4 px-6 py-4 group transition-all duration-200"
                  style={{ borderBottom: "1px solid rgba(27,58,45,0.08)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(27,58,45,0.05)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(27,58,45,0.07)", border: `1px solid rgba(27,58,45,0.2)` }}>
                    <Mail className="w-3.5 h-3.5" style={{ color: FOREST }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-[9px] tracking-[0.25em] uppercase mb-0.5"
                      style={{ color: "rgba(27,46,36,0.35)" }}>Email</p>
                    <p className="font-body text-sm truncate" style={{ color: "#1B2E24" }}>hello@jsbevents.com</p>
                  </div>
                  <svg className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: FOREST }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Location + Hours */}
                <div className="grid grid-cols-2"
                  style={{ borderBottom: "1px solid rgba(27,58,45,0.08)" }}>
                  <div className="px-6 py-4"
                    style={{ borderRight: "1px solid rgba(27,58,45,0.08)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: `rgba(27,58,45,0.55)` }} />
                      <p className="font-body text-[9px] tracking-[0.2em] uppercase"
                        style={{ color: "rgba(27,46,36,0.35)" }}>Location</p>
                    </div>
                    <p className="font-body text-sm leading-snug" style={{ color: "#1B2E24" }}>New Delhi</p>
                    <p className="font-body text-[10px] mt-0.5" style={{ color: "rgba(27,46,36,0.35)" }}>Available globally</p>
                  </div>
                  <div className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-3 h-3 flex-shrink-0" style={{ color: `rgba(27,58,45,0.55)` }} />
                      <p className="font-body text-[9px] tracking-[0.2em] uppercase"
                        style={{ color: "rgba(27,46,36,0.35)" }}>Hours</p>
                    </div>
                    <p className="font-body text-sm leading-snug" style={{ color: "#1B2E24" }}>Mon to Sat</p>
                    <p className="font-body text-[10px] mt-0.5" style={{ color: "rgba(27,46,36,0.35)" }}>10 AM to 7 PM</p>
                  </div>
                </div>
              </div>

              {/* Footer: WhatsApp CTA + socials */}
              <div className="px-6 py-5"
                style={{ background: "rgba(27,58,45,0.04)", borderTop: "1px solid rgba(27,58,45,0.1)" }}>

                {/* WhatsApp button */}
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=Hi%20JSB%20Events!%20I%27d%20like%20to%20enquire%20about%20my%20event.`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3 mb-4 font-body text-[11px] tracking-[0.25em] uppercase transition-all duration-300"
                  style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)", color: "#25D366" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.12)"; }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>

                {/* Social icons */}
                <div className="flex items-center gap-3">
                  <p className="font-body text-[9px] tracking-[0.3em] uppercase mr-1"
                    style={{ color: "rgba(27,46,36,0.25)" }}>
                    Follow
                  </p>
                  <a href="https://instagram.com/eventsbyjsb" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 transition-all duration-200"
                    style={{ border: `1px solid rgba(27,58,45,0.15)`, color: "rgba(27,46,36,0.42)" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = FOREST; el.style.color = FOREST; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `rgba(27,58,45,0.15)`; el.style.color = "rgba(27,46,36,0.42)"; }}
                  >
                    <Instagram className="w-3 h-3" />
                    <span className="font-body text-[9px] tracking-[0.15em] uppercase">Instagram</span>
                  </a>
                </div>
              </div>

            </div>
          </FadeIn>

          {/* Right: conversational wizard */}
          <FadeIn delay={0.1} className="w-full">
            <div
              className="p-5 md:p-8"
              style={{ background: IVORY, border: "1px solid rgba(27,58,45,0.1)" }}
            >
              <EnquiryWizard />
            </div>
          </FadeIn>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
