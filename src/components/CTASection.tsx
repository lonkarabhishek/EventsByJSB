import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { Clock } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-secondary">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-tight">
            Let's Create Your Dream Celebration
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-body text-muted-foreground mb-10 max-w-lg mx-auto">
            Every great celebration begins with a conversation. Let's start yours.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="px-8 py-3.5 bg-foreground text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-foreground/90 transition-colors duration-300">
              Start Planning Now
            </Link>
            <Link to="/contact" className="px-8 py-3.5 border border-foreground text-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors duration-300">
              Contact Us
            </Link>
          </div>
          <div className="inline-flex items-center justify-center gap-2 mt-8 px-5 py-2.5 bg-foreground/10 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-body text-sm font-medium text-foreground">We respond in under 10 minutes</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default CTASection;
