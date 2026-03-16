import { Link } from "react-router-dom";
const heroVenue = "/gallery/venue-night.jpg";

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

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/25 to-foreground/35" />

        {/* Centered content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 -mt-28 md:mt-0">
          <p
            className="hero-fade-up font-body text-xs md:text-sm tracking-[0.5em] uppercase text-primary-foreground mb-4 md:mb-6 text-shadow-hero"
            style={{ animationDelay: "0.3s", animationDuration: "1s" }}
          >
            JSB Events
          </p>

          <h1
            className="hero-fade-up text-shadow-hero font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-normal text-primary-foreground leading-[1.1] mb-4 md:mb-6 max-w-4xl"
            style={{ animationDelay: "0.6s", animationDuration: "1.2s" }}
          >
            Crafting Timeless
            <br />
            Celebrations
          </h1>

          <p
            className="hero-fade-up text-shadow-hero font-body text-sm md:text-lg font-normal text-primary-foreground mb-6 md:mb-10 max-w-lg"
            style={{ animationDelay: "0.9s", animationDuration: "1s" }}
          >
            Your reliable expert for planning destination weddings &amp; milestone celebrations.
          </p>

          <div
            className="hero-fade-up flex flex-row items-center gap-3 sm:gap-4"
            style={{ animationDelay: "1.2s", animationDuration: "1s" }}
          >
            <Link
              to="/gallery"
              className="px-5 py-2.5 sm:px-8 sm:py-3.5 bg-primary-foreground/90 text-foreground font-body text-[10px] sm:text-sm tracking-widest uppercase rounded-full hover:bg-primary-foreground transition-colors duration-300"
            >
              Explore Our Work
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 sm:px-8 sm:py-3.5 border border-primary-foreground/50 text-primary-foreground font-body text-[10px] sm:text-sm tracking-widest uppercase rounded-full hover:bg-primary-foreground/10 transition-all duration-300"
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
