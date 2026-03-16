import { Palette, Hotel, Music, UtensilsCrossed } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const services = [
  {
    icon: Palette,
    title: "Planning & Decor",
    description: "Meticulous planning and elegant décor that transforms every venue into a masterpiece.",
  },
  {
    icon: Hotel,
    title: "Hospitality & Logistics",
    description: "Travel, accommodations, and hospitality managed seamlessly for a worry-free experience.",
  },
  {
    icon: Music,
    title: "Entertainment",
    description: "Live performances, DJ sets, and interactive experiences that keep guests enthralled.",
  },
  {
    icon: UtensilsCrossed,
    title: "Culinary Experiences",
    description: "Curated menus and exceptional catering for a delightful dining experience.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <FadeIn>
            <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-4">
              Our Services
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              What We Offer
            </h2>
          </FadeIn>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <div className="p-8 md:p-10 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow duration-500">
                <service.icon className="w-7 h-7 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="font-heading text-2xl font-normal text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-body text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="mt-20 text-center">
            <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-3">Our Locations</p>
            <p className="font-heading text-2xl md:text-3xl font-light text-foreground">
              Patna &nbsp;·&nbsp; Delhi &nbsp;·&nbsp; Global
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ServicesSection;
