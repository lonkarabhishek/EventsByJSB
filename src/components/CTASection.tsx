import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";

const CTASection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/gallery/cta-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2 className="font-heading text-4xl md:text-6xl font-light text-primary-foreground mb-6 leading-tight">
            Let's Create Your Dream Celebration
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-body text-primary-foreground/80 mb-10 max-w-xl mx-auto">
            Every great celebration begins with a conversation. Let's start yours.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="px-8 py-3.5 bg-gold text-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-gold/90 transition-colors duration-300">
              Start Planning Now
            </Link>
            <Link to="/contact" className="px-8 py-3.5 border border-primary-foreground text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary-foreground/10 transition-colors duration-300">
              Contact Us
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default CTASection;
