import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import heroBg from "@/assets/hero-layer-bg.jpg";
import heroVenue from "@/assets/hero-layer-venue.jpg";
import heroCouple from "@/assets/hero-layer-couple.png";
import heroFlorals from "@/assets/hero-layer-florals.png";

const stats = [
  { value: "200+", label: "Events Planned" },
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Destinations" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const coupleRef = useRef<HTMLImageElement>(null);
  const venueRef = useRef<HTMLImageElement>(null);
  const floralsRef = useRef<HTMLImageElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Combined scroll + mouse parallax — single rAF loop for smoothness
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range from center
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    // Smooth animation loop
    let currentMx = 0, currentMy = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      const y = scrollRef.current;
      const vh = window.innerHeight;
      const progress = Math.min(y / vh, 1);

      // Smooth mouse interpolation (eased follow)
      currentMx = lerp(currentMx, mouseRef.current.x, 0.05);
      currentMy = lerp(currentMy, mouseRef.current.y, 0.05);

      // Fade out section on scroll
      section.style.opacity = String(Math.max(0, 1 - y / (vh * 0.7)));

      // Layer parallax depths (mouse + scroll combined)
      const venue = venueRef.current;
      const couple = coupleRef.current;
      const florals = floralsRef.current;

      if (venue) {
        // Venue: subtle mouse shift + slight zoom on scroll
        const vx = currentMx * -8;
        const vy = currentMy * -5;
        venue.style.transform = `scale(${1.08 + progress * 0.05}) translate(${vx}px, ${vy}px)`;
      }

      if (couple) {
        // Couple: stronger mouse shift (closer = more movement) + scroll lift
        const cx = currentMx * 15;
        const cy = currentMy * 8;
        couple.style.transform = `translate(${cx}px, ${cy + (-y * 0.15)}px)`;
      }

      if (florals) {
        // Florals: medium mouse shift (overhead frame)
        const fx = currentMx * -5;
        const fy = currentMy * -3;
        florals.style.transform = `translate(${fx}px, ${fy}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Sticky hero that stays behind content */}
      <section
        ref={sectionRef}
        className="fixed inset-0 h-screen overflow-hidden z-0"
      >
        {/* Layer 1: Golden sky background */}
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />

        {/* Layer 2: Venue — parallax controlled via JS */}
        <img
          ref={venueRef}
          src={heroVenue}
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: "scale(1.08)" }}
          loading="eager"
        />

        {/* Layer 3: Dark cinematic overlays for text readability */}
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-foreground/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

        {/* Layer 4: Couple silhouette — walking down the aisle */}
        <div className="absolute inset-0 z-[5] flex items-end justify-center pointer-events-none">
          <img
            ref={coupleRef}
            src={heroCouple}
            alt="Couple holding hands"
            className="hero-fade-up h-[32vh] sm:h-[36vh] md:h-[42vh] lg:h-[48vh] object-contain mb-[80px] will-change-transform"
            style={{
              animationDelay: "1.6s",
              animationDuration: "1.5s",
              filter: "brightness(0.15) sepia(0.3) saturate(0.5)",
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 5%)",
              maskImage: "linear-gradient(to top, transparent 0%, black 5%)",
            }}
            loading="eager"
          />
        </div>

        {/* Layer 5: Floral frame at top — decorative depth */}
        <div className="absolute top-0 left-0 right-0 z-[6] pointer-events-none">
          <img
            ref={floralsRef}
            src={heroFlorals}
            alt=""
            className="w-full h-auto max-h-[30vh] object-cover object-bottom opacity-70 will-change-transform"
            loading="eager"
          />
          {/* Fade out florals at bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-transparent to-transparent" />
        </div>

        {/* Text content — above couple */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pb-[22vh] sm:pb-[24vh] md:pb-[28vh]">
          {/* Small decorative line */}
          <div
            className="hero-fade-up w-px h-12 bg-gold/60 mb-6"
            style={{ animationDelay: "0.2s", animationDuration: "1s" }}
          />

          <p
            className="hero-fade-up text-gold font-body text-xs md:text-sm tracking-[0.5em] uppercase mb-4 md:mb-6"
            style={{ animationDelay: "0.4s", animationDuration: "1s" }}
          >
            JSB Events
          </p>

          <h1
            className="hero-fade-up text-shadow-hero font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground leading-[1.1] mb-4 md:mb-6 max-w-5xl"
            style={{ animationDelay: "0.7s", animationDuration: "1.2s" }}
          >
            Crafting Timeless
            <br />
            Celebrations
          </h1>

          <p
            className="hero-fade-up text-shadow-hero font-body text-base md:text-lg font-light text-primary-foreground/80 mb-8 md:mb-10 max-w-xl"
            style={{ animationDelay: "1s", animationDuration: "1s" }}
          >
            Your reliable expert for planning destination weddings &amp; milestone celebrations.
          </p>

          <div
            className="hero-fade-up flex flex-col sm:flex-row items-center gap-4"
            style={{ animationDelay: "1.3s", animationDuration: "1s" }}
          >
            <Link
              to="/gallery"
              className="group relative px-8 py-3.5 bg-gold text-foreground font-body text-sm tracking-widest uppercase rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(183,142,78,0.4)]"
            >
              Explore Our Work
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border border-primary-foreground/50 text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary-foreground/10 hover:border-primary-foreground transition-all duration-500"
            >
              Book Consultation
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-fade-up absolute bottom-[115px] md:bottom-[125px] right-8 z-20 flex flex-col items-center gap-2"
          style={{ animationDelay: "2s", animationDuration: "1s" }}
        >
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-primary-foreground/40 [writing-mode:vertical-lr]">
            Scroll
          </span>
          <div className="w-px h-8 bg-primary-foreground/20 relative overflow-hidden">
            <div className="absolute top-0 w-full h-3 bg-gold/60 animate-[scrollPulse_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Stats overlay bar at bottom */}
        <div
          className="hero-fade-up absolute bottom-0 left-0 right-0 z-20 bg-foreground/50 backdrop-blur-md border-t border-primary-foreground/10"
          style={{ animationDelay: "1.8s", animationDuration: "1s" }}
        >
          <div className="max-w-5xl mx-auto flex justify-center divide-x divide-primary-foreground/15 py-5 px-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex-1 text-center px-4">
                <p className="font-heading text-3xl md:text-4xl text-gold font-light">{stat.value}</p>
                <p className="font-body text-[10px] md:text-xs text-primary-foreground/60 tracking-widest uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer so content below has room */}
      <div className="h-screen" />
    </>
  );
};

export default HeroSection;
