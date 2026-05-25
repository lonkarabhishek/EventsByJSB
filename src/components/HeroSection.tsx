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
const CYCLE_MS   = 8000; // time each video plays
const FADE_MS    = 1200; // crossfade duration

const HeroSection = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fading,     setFading]     = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  /* ── Play the newly active video, buffer the next one ── */
  useEffect(() => {
    const v = videoRefs.current[currentIdx];
    if (v) { v.currentTime = 0; v.play().catch(() => {}); }
    const next = (currentIdx + 1) % VIDEOS.length;
    videoRefs.current[next]?.load();
  }, [currentIdx]);

  /* ── Auto-cycle ──────────────────────────────────────── */
  useEffect(() => {
    const timer = setInterval(() => {
      // Pre-play next so it's ready
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

        {/* ── Video layers ─────────────────────────────── */}
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

        {/* ── Cinematic overlays ───────────────────────── */}
        <div className="absolute inset-0 z-10 bg-black/50" />
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.45) 100%)" }}
        />
        {/* Side vignette */}
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.35) 100%)" }}
        />

        {/* ── Main content ─────────────────────────────── */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">

          {/* Spacer for navbar */}
          <div className="hidden md:block" style={{ height: "0.5rem" }} />

          {/* Brand eyebrow */}
          <p
            className="hero-fade-up font-body text-[10px] md:text-xs tracking-[0.65em] uppercase text-[#c9a96e] mb-5 md:mb-7"
            style={{ animationDelay: "0.45s" }}
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
            <em className="italic" style={{ color: "hsl(38 46% 68%)" }}>Timeless</em><br />
            Celebrations
          </h1>

          {/* Gold divider */}
          <div
            className="hero-fade-up flex items-center gap-4 my-5 md:my-7"
            style={{ animationDelay: "1.0s" }}
          >
            <div className="h-px w-16 bg-[#c9a96e]/40" />
            <div className="w-1 h-1 rounded-full bg-[#c9a96e]/60" />
            <div className="h-px w-16 bg-[#c9a96e]/40" />
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
              className="px-9 py-3.5 bg-[#c9a96e] text-black font-body text-[11px] tracking-[0.35em] uppercase hover:bg-[#d4b878] transition-all duration-300"
            >
              Explore Our Work
            </Link>
            <Link
              to="/contact"
              className="px-9 py-3.5 border border-white/25 text-white font-body text-[11px] tracking-[0.35em] uppercase hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300"
            >
              Begin Your Journey
            </Link>
          </div>
        </div>

        {/* ── Video progress dots ───────────────────────── */}
        <div className="absolute bottom-10 right-8 z-20 flex items-center gap-2">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFading(false); setCurrentIdx(i); }}
              className="h-[1px] transition-all duration-500 rounded-full"
              style={{
                width: i === currentIdx ? "2rem" : "0.6rem",
                backgroundColor: i === currentIdx ? "#c9a96e" : "rgba(255,255,255,0.25)",
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
