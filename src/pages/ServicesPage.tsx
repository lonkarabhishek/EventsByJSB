import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { Heart, MapPin, Gem, Building2, PartyPopper, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Wedding Planning",
    description: "Full-service wedding planning from concept to celebration. We handle venue selection, vendor coordination, décor design, timeline management, and day-of execution — so you can focus on enjoying every moment.",
    features: ["Venue Selection", "Vendor Management", "Décor & Design", "Day-of Coordination", "Budget Planning"],
  },
  {
    icon: MapPin,
    title: "Destination Weddings",
    description: "Dream weddings in breathtaking locations around the world. We manage travel logistics, local vendor partnerships, cultural integration, and ensure a seamless experience for you and your guests.",
    features: ["Location Scouting", "Travel Coordination", "Local Vendors", "Cultural Integration", "Guest Management"],
  },
  {
    icon: Gem,
    title: "Engagement Ceremonies",
    description: "Beautifully curated engagement celebrations that set the perfect tone for your upcoming journey together. From intimate proposals to grand celebration parties.",
    features: ["Proposal Planning", "Venue Styling", "Photography Coordination", "Catering & Menu", "Entertainment"],
  },
  {
    icon: Building2,
    title: "Corporate Events",
    description: "Sophisticated corporate gatherings that leave lasting impressions. From product launches to annual galas, we create polished, professional experiences.",
    features: ["Event Strategy", "Brand Integration", "AV Production", "Catering", "Logistics Management"],
  },
  {
    icon: PartyPopper,
    title: "Private Celebrations",
    description: "Intimate, bespoke events for life's special milestones. Whether it's a milestone birthday, anniversary, or family reunion, we make it unforgettable.",
    features: ["Theme Development", "Custom Décor", "Entertainment", "Catering", "Guest Experience"],
  },
];

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-6 text-center bg-muted">
        <FadeIn>
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">What We Do</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-foreground mb-6">Our Services</h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Comprehensive event planning services designed to bring your vision to life with elegance and precision.
          </p>
        </FadeIn>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto space-y-20">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={0.1}>
              <div className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-4">{service.title}</h2>
                  <p className="text-body text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-body text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-muted rounded-lg h-72 flex items-center justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <service.icon className="w-20 h-20 text-primary/20" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-primary-foreground mb-6">
              Ready to Start Planning?
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-body text-primary-foreground/80 mb-10">
              Let's discuss how we can make your celebration truly extraordinary.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <a
              href="/contact"
              className="inline-block px-8 py-3.5 bg-primary-foreground text-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary-foreground/90 transition-colors duration-300"
            >
              Book a Consultation
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
