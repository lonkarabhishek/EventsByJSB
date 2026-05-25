import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import EnquiryWizard from "@/components/EnquiryWizard";

const WA_NUMBER = "919905168295";
const PHONE     = "+91 99051 68295";
const GOLD      = "#c9a96e";
const DARK      = "hsl(24 8% 7%)";

const ContactSection = () => (
  <section id="contact" className="py-0">
    <div className="flex flex-col md:grid md:grid-cols-2 min-h-0">

      {/* ── Left: image + contact info ── */}
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
              <p className="font-body text-[10px] tracking-[0.5em] uppercase mb-3"
                style={{ color: GOLD }}>
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
                { Icon: Phone,  label: "Call / WhatsApp", value: PHONE                },
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
                style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.35)", color: "#25D366" }}
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                Chat on WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── Right: conversational wizard ── */}
      <div
        className="flex flex-col justify-center p-6 sm:p-10 md:p-12 lg:p-16"
        style={{ background: DARK }}
      >
        <EnquiryWizard compact />
      </div>

    </div>
  </section>
);

export default ContactSection;
