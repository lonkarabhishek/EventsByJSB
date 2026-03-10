import { Heart, MapPin, Gem, Building2, PartyPopper } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const services = [
  {
    icon: Heart,
    title: "Wedding Planning",
    description: "Full-service wedding planning from concept to celebration, ensuring every detail reflects your unique love story.",
  },
  {
    icon: MapPin,
    title: "Destination Weddings",
    description: "Dream weddings in breathtaking locations worldwide, with seamless logistics and local expertise.",
  },
  {
    icon: Gem,
    title: "Engagement Ceremonies",
    description: "Beautifully curated engagement celebrations that set the tone for your journey together.",
  },
  {
    icon: Building2,
    title: "Corporate Events",
    description: "Sophisticated corporate gatherings that leave lasting impressions on clients and colleagues.",
  },
  {
    icon: PartyPopper,
    title: "Private Celebrations",
    description: "Intimate, bespoke events for life's special milestones — birthdays, anniversaries, and more.",
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
};

export default ServicesSection;
