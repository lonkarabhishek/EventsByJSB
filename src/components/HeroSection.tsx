import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

import heroVenue from "@/assets/hero-layer-venue.jpg";
import heroCouple from "@/assets/hero-layer-couple.png";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Mouse parallax (desktop only) with RAF smoothing
  const targetMouse = useRef({ x: 0, y: 0 });
  const animatedMouse = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile) return;
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      targetMouse.current = { x: cx, y: cy };
    },
    [isMobile]
  );

  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      animatedMouse.current.x += (targetMouse.current.x - animatedMouse.current.x) * 0.05;
      animatedMouse.current.y += (targetMouse.current.y - animatedMouse.current.y) * 0.05;
      setMouse({ x: animatedMouse.current.x, y: animatedMouse.current.y });
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [isMobile, handleMouseMove]);

  // Scroll tracking for opacity fade
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.7));

  return (
    <>
      {/* Sticky hero that stays behind content */}
      <section
        ref={sectionRef}
        className="fixed inset-0 h-screen overflow-hidden z-0"
        style={{ opacity }}
      >
        {/* Layer 1: Venue background — moves with mouse */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(${mouse.x * -20}px, ${mouse.y * -15}px, 0) scale(1.15)`,
            transition: 'none',
          }}
        >
          <img
            src={heroVenue}
            alt="Elegant wedding venue"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-foreground/10" />
        </div>

        {/* Layer 2: Couple — stays still, pushed below fold so legs are hidden */}
        <div
          className="absolute inset-0 flex items-end justify-center will-change-transform"
          style={{
            transform: `translate3d(${mouse.x * 2}px, ${mouse.y * 1}px, 0)`,
          }}
        >
          <img
            src={heroCouple}
            alt="Bride and groom from behind facing the venue"
            className="h-[75vh] md:h-[90vh] object-contain drop-shadow-2xl translate-y-[18%]"
            loading="eager"
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-foreground/20 pointer-events-none" />

        {/* Text content */}
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-primary-foreground/70 font-body text-xs md:text-sm tracking-[0.4em] uppercase mb-4 md:mb-6"
          >
            Welcome to JSB
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground leading-tight mb-4 md:mb-6 max-w-5xl"
          >
            Crafting Timeless
            <br />
            Celebrations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            className="font-body text-base md:text-lg font-light text-primary-foreground/85 mb-8 md:mb-10 max-w-xl"
          >
            Your reliable expert for planning destination weddings &amp; milestone celebrations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/gallery"
              className="group relative px-8 py-3.5 bg-primary-foreground text-foreground font-body text-sm tracking-widest uppercase rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10">Explore Our Work</span>
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-body text-sm tracking-widest uppercase">
                Explore Our Work
              </span>
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border border-primary-foreground/60 text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary-foreground/10 hover:border-primary-foreground transition-all duration-500"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-primary-foreground/50 font-body text-[10px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <motion.div
            className="w-px h-8 bg-primary-foreground/30"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </section>

      {/* Spacer so content below has room */}
      <div className="h-screen" />
    </>
  );
};

export default HeroSection;
