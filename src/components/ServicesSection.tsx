import { Palette, Hotel, Music, UtensilsCrossed } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const services = [
  {
    icon: Palette,
    title: "Exquisite Planning & Decor",
    description: "We create stunning events with meticulous planning and elegant décor that transforms every venue into a masterpiece.",
  },
  {
    icon: Hotel,
    title: "Flawless Hospitality & Logistics",
    description: "Travel, accommodations, and hospitality are managed seamlessly — so you and your guests enjoy a worry-free experience.",
  },
  {
    icon: Music,
    title: "Engaging Entertainment",
    description: "Entertainment includes live performances, DJ sets, and interactive experiences that keep your guests enthralled all night.",
  },
  {
    icon: UtensilsCrossed,
    title: "Customized Culinary Experiences",
    description: "Curated menus and exceptional catering to ensure a delightful dining experience for every palate.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
              Our Services
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              What We Offer
            </h2>
          </FadeIn>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <div className="bg-card p-8 rounded-lg hover:shadow-lg transition-shadow duration-500 group">
                <service.icon className="w-8 h-8 text-primary mb-5 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-heading text-2xl font-normal text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-body text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Locations */}
        <FadeIn delay={0.5}>
          <div className="mt-16 text-center">
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">Our Locations</p>
            <p className="font-heading text-2xl md:text-3xl font-light text-foreground">
              Patna &nbsp;|&nbsp; Delhi &nbsp;|&nbsp; Global
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ServicesSection;
