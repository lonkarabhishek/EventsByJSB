import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import FadeIn from "@/components/FadeIn";

const faqs = [
  {
    q: "How far in advance should we book?",
    a: "We recommend booking at least 6–12 months before your event date for destination weddings, and 3–6 months for local celebrations. However, reach out anytime — we'll do our best to accommodate you.",
  },
  {
    q: "Do you handle destination weddings outside India?",
    a: "Yes! While we specialize in destinations across India like Udaipur, Jaipur, Goa, and Kerala, we also plan international destination weddings. Contact us to discuss your dream location.",
  },
  {
    q: "What is included in your wedding planning packages?",
    a: "Our packages are fully customizable and can include venue selection, vendor management, decor design, catering coordination, guest hospitality, entertainment, and day-of coordination.",
  },
  {
    q: "Can we customize every detail of the event?",
    a: "Absolutely. Every celebration we plan is bespoke. From the color palette and floral arrangements to the menu and entertainment — everything is tailored to your vision.",
  },
  {
    q: "How does the consultation process work?",
    a: "It starts with a free initial conversation where we learn about your vision, preferences, and budget. From there, we present a tailored proposal and once approved, our team takes it from there.",
  },
  {
    q: "What is the typical budget range for your events?",
    a: "Our events range widely based on scale, destination, and customization. We work with you to create a plan that respects your budget while delivering an unforgettable experience.",
  },
];

const FAQSection = () => {
  return (
    <section className="section-padding bg-gold-light">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
              Common Questions
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              Frequently Asked Questions
            </h2>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-background border border-border rounded-lg px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="font-heading text-lg text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-body text-muted-foreground pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
};

export default FAQSection;
