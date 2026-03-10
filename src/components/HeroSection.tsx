import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import heroImg from "@/assets/hero-wedding.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Elegant wedding ceremony setup" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-foreground/30" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <FadeIn delay={0.2}>
          <p className="text-primary-foreground/80 font-body text-sm tracking-[0.3em] uppercase mb-6">
            Luxury Wedding & Event Planning
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground leading-tight mb-8">
            Creating Beautiful Celebrations
          </h1>
        </FadeIn>
        <FadeIn delay={0.6}>
          <p className="font-body text-lg md:text-xl font-light text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Elegant wedding and event planning tailored to your story.
          </p>
        </FadeIn>
        <FadeIn delay={0.8}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/gallery" className="px-8 py-3.5 bg-primary-foreground text-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary-foreground/90 transition-colors duration-300">
              View Our Work
            </Link>
            <Link to="/contact" className="px-8 py-3.5 border border-primary-foreground text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary-foreground/10 transition-colors duration-300">
              Book Consultation
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
