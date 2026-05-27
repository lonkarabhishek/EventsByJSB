import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const VIDEOS = [
  "/videos/reels/reel-4.mp4",
  "/videos/reels/reel-1.mp4",
  "/videos/reels/reel-2.mp4",
  "/videos/reels/reel-3.mp4",
  "/videos/reels/reel-5.mp4",
  "/videos/reels/reel-6.mp4",
];
const CYCLE_MS   = 8000;
const FADE_MS    = 1200;

/* Sage-mint accent for hero (readable on dark video overlay) */
const SAGE = "#9FCFB8";

const HeroSection = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fading,     setFading]     = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const v = videoRefs.current[currentIdx];
    if (v) { v.currentTime = 0; v.play().catch(() => {}); }
    const next = (currentIdx + 1) % VIDEOS.length;
    videoRefs.current[next]?.load();
  }, [currentIdx]);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (currentIdx + 1) % VIDEOS.length;
      videoRefs.current[next]?.play().catch(() => {});

      setFading(true);
      setTimeout(() => {
        setCurrentIdx(next);
        setFading(false);
      }, FADE_MS);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, [currentIdx]);

  return (
    <>
      <section className="fixed inset-0 h-screen overflow-hidden z-0">

        {/* Video layers */}
        {VIDEOS.map((src, i) => (
          <video
            key={src}
            ref={el => { videoRefs.current[i] = el; }}
            src={src}
            autoPlay={i === 0}
            muted
            loop
            playsInline
            preload={i < 2 ? "auto" : "metadata"}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === currentIdx ? (fading ? 0 : 1) : 0,
              transition: `opacity ${FADE_MS}ms ease`,
              zIndex: i === currentIdx ? 1 : 0,
            }}
          />
        ))}

        {/* Cinematic overlays */}
        <div className="absolute inset-0 z-10 bg-black/52" />
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.48) 100%)" }}
        />
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.35) 100%)" }}
        />

        {/* Main content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">

          <div className="hidden md:block" style={{ height: "0.5rem" }} />

          {/* Brand eyebrow */}
          <p
            className="hero-fade-up font-body text-[10px] md:text-xs tracking-[0.65em] uppercase mb-5 md:mb-7"
            style={{ color: SAGE, animationDelay: "0.45s" }}
          >
            JSB Events &nbsp;·&nbsp; Est.&nbsp;2014
          </p>

          {/* Headline */}
          <h1
            className="hero-fade-up text-shadow-hero font-heading font-light text-white leading-[0.95] mb-5 md:mb-6 tracking-wide"
            style={{
              fontSize: "clamp(2.4rem, 9vw, 10rem)",
              animationDelay: "0.7s",
            }}
          >
            Crafting<br />
            <em className="italic" style={{ color: SAGE }}>Timeless</em><br />
            Celebrations
          </h1>

          {/* Sage divider */}
          <div
            className="hero-fade-up flex items-center gap-4 my-5 md:my-7"
            style={{ animationDelay: "1.0s" }}
          >
            <div className="h-px w-16" style={{ background: `${SAGE}45` }} />
            <div className="w-1 h-1 rounded-full" style={{ background: `${SAGE}70` }} />
            <div className="h-px w-16" style={{ background: `${SAGE}45` }} />
          </div>

          {/* Subheading */}
          <p
            className="hero-fade-up font-body text-sm md:text-base font-light text-white/55 mb-10 md:mb-12 max-w-md tracking-wider"
            style={{ animationDelay: "1.15s" }}
          >
            Destination weddings &amp; milestone celebrations,<br className="hidden md:block" />
            crafted with intention.
          </p>

          {/* CTA buttons */}
          <div
            className="hero-fade-up flex flex-col sm:flex-row items-center gap-4"
            style={{ animationDelay: "1.35s" }}
          >
            <Link
              to="/gallery"
              className="px-9 py-3.5 font-body text-[11px] tracking-[0.35em] uppercase transition-all duration-300"
              style={{ background: "#1B3A2D", color: "#FAF8F3" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#2E6348"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#1B3A2D"; }}
            >
              Explore Our Work
            </Link>
            <Link
              to="/contact"
              className="px-9 py-3.5 border font-body text-[11px] tracking-[0.35em] uppercase transition-all duration-300"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = SAGE;
                el.style.color = SAGE;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.3)";
                el.style.color = "#fff";
              }}
            >
              Begin Your Journey
            </Link>
          </div>
        </div>

        {/* Video progress dots */}
        <div className="absolute bottom-10 right-8 z-20 flex items-center gap-2">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFading(false); setCurrentIdx(i); }}
              className="h-[1px] transition-all duration-500 rounded-full"
              style={{
                width: i === currentIdx ? "2rem" : "0.6rem",
                backgroundColor: i === currentIdx ? SAGE : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

      </section>

      {/* Spacer so page content starts below the viewport */}
      <div className="h-screen" />
    </>
  );
};

export default HeroSection;
