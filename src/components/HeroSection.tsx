import { Link } from "react-router-dom";
import heroVenue from "@/assets/hero-layer-venue.jpg";

const HeroSection = () => {
  return (
    <>
      <section className="fixed inset-0 h-screen overflow-hidden z-0">
        {/* Single background image */}
        <img
          src={heroVenue}
          alt="Elegant wedding venue"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />

        {/* Soft warm overlay */}
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-foreground/10" />

        {/* Centered content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <p
            className="hero-fade-up font-body text-xs md:text-sm tracking-[0.5em] uppercase text-primary-foreground/70 mb-6"
            style={{ animationDelay: "0.3s", animationDuration: "1s" }}
          >
            JSB Events
          </p>

          <h1
            className="hero-fade-up font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-primary-foreground leading-[1.1] mb-6 max-w-4xl"
            style={{ animationDelay: "0.6s", animationDuration: "1.2s" }}
          >
            Crafting Timeless
            <br />
            Celebrations
          </h1>

          <p
            className="hero-fade-up font-body text-base md:text-lg font-light text-primary-foreground/80 mb-10 max-w-lg"
            style={{ animationDelay: "0.9s", animationDuration: "1s" }}
          >
            Your reliable expert for planning destination weddings &amp; milestone celebrations.
          </p>

          <div
            className="hero-fade-up flex flex-col sm:flex-row items-center gap-4"
            style={{ animationDelay: "1.2s", animationDuration: "1s" }}
          >
            <Link
              to="/gallery"
              className="px-8 py-3.5 bg-primary-foreground/90 text-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary-foreground transition-colors duration-300"
            >
              Explore Our Work
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border border-primary-foreground/50 text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary-foreground/10 transition-all duration-300"
            >
              Start Planning Now
            </Link>
          </div>
        </div>
      </section>

      {/* Spacer so content below has room */}
      <div className="h-screen" />
    </>
  );
};

export default HeroSection;
