import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const FOREST = "#1B3A2D";
const IVORY  = "#FAF8F3";

const faqs = [
  {
    q: "How far in advance should we book?",
    a: "We recommend booking at least 6 to 12 months before your event date for destination weddings, and 3 to 6 months for local celebrations. However, reach out anytime and we will do our best to accommodate you.",
  },
  {
    q: "Do you handle destination weddings outside India?",
    a: "Yes! While we specialise in destinations across India like Udaipur, Jaipur, Goa, and Kerala, we also plan international destination weddings. Contact us to discuss your dream location.",
  },
  {
    q: "What is included in your wedding planning packages?",
    a: "Our packages are fully customisable and can include venue selection, vendor management, décor design, catering coordination, guest hospitality, entertainment, and day-of coordination.",
  },
  {
    q: "Can we customise every detail of the event?",
    a: "Absolutely. Every celebration we plan is bespoke. From the colour palette and floral arrangements to the menu and entertainment, everything is tailored to your vision.",
  },
  {
    q: "How does the consultation process work?",
    a: "It starts with a free initial conversation where we learn about your vision, preferences, and budget. From there, we present a tailored proposal and once approved, our team takes it from there.",
  },
  {
    q: "What is the typical budget range for your events?",
    a: "Our events range widely based on scale, destination, and customisation. We work with you to create a plan that respects your budget while delivering an unforgettable experience.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 px-6" style={{ background: "#EEE9DF" }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <FadeIn>
            <p className="font-body text-[11px] tracking-[0.45em] uppercase mb-3"
              style={{ color: FOREST }}>
              Common Questions
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading font-light"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", color: "#1B2E24" }}>
              Frequently Asked
            </h2>
          </FadeIn>
        </div>

        {/* Custom accordion */}
        <FadeIn delay={0.2}>
          <div className="space-y-0 divide-y" style={{ borderColor: "rgba(27,58,45,0.12)" }}>
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-6 text-left group"
                  >
                    <span
                      className="font-heading text-lg md:text-xl font-light transition-colors duration-300"
                      style={{ color: isOpen ? FOREST : "#1B2E24" }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-colors duration-300"
                      style={{ color: FOREST }}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-out"
                    style={{ maxHeight: isOpen ? "200px" : "0" }}
                  >
                    <p
                      className="font-body text-sm leading-relaxed pb-6"
                      style={{ color: "rgba(27,46,36,0.55)" }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default FAQSection;
