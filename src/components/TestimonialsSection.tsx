import { useRef, useState } from "react";
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const testimonials = [
  {
    name: "Priya & Arjun",
    location: "Udaipur Wedding",
    text: "JSB Events turned our dream wedding into reality. Every detail was perfect, from the flowers to the timeline. We couldn't have asked for a more seamless, magical experience.",
    rating: 5,
  },
  {
    name: "Sarah & James",
    location: "Destination Wedding, Udaipur",
    text: "Our destination wedding was absolutely magical. The team handled everything with such grace and professionalism. Guests still talk about it as the most beautiful event they've ever attended.",
    rating: 5,
  },
  {
    name: "Meera & Rohan",
    location: "Delhi Reception",
    text: "From the initial consultation to the last dance, JSB Events made us feel like the most important couple in the world. Every single element was crafted with pure love and perfection.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(false);

  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(i => (i + 1) % testimonials.length);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else         { v.play().catch(() => {}); setPlaying(true); }
  };

  const t = testimonials[active];

  return (
    <section
      className="py-16 md:py-32 px-4 md:px-6"
      style={{
        background: "linear-gradient(to bottom, hsl(24 10% 5%), hsl(24 8% 7%))",
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 md:mb-20">
          <FadeIn>
            <p className="font-body text-[11px] tracking-[0.45em] uppercase mb-3"
              style={{ color: "#c9a96e" }}>
              Testimonials
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading font-light"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: "#e8e0d0" }}>
              Words From Our Couples
            </h2>
          </FadeIn>
        </div>

        {/* Large featured quote */}
        <FadeIn delay={0.15}>
          <div
            className="relative px-5 md:px-16 py-10 md:py-16 mb-8"
            style={{ border: "1px solid rgba(201,169,110,0.12)", background: "rgba(201,169,110,0.03)" }}
          >
            {/* Big decorative quote mark */}
            <span
              className="absolute top-6 left-8 md:left-14 font-heading leading-none select-none pointer-events-none"
              style={{ fontSize: "8rem", color: "rgba(201,169,110,0.08)", lineHeight: 1 }}
            >
              "
            </span>

            {/* Quote */}
            <blockquote
              className="relative font-heading font-light italic text-center mb-8 leading-snug transition-all duration-500"
              style={{
                fontSize: "clamp(1.1rem, 3vw, 2.2rem)",
                color: "rgba(232,224,208,0.85)",
                maxWidth: "820px",
                margin: "0 auto 2rem",
              }}
            >
              "{t.text}"
            </blockquote>

            {/* Attribution */}
            <div className="flex flex-col items-center gap-1">
              <div className="h-px w-10 mb-3" style={{ background: "#c9a96e" }} />
              <p className="font-heading text-xl font-light" style={{ color: "#c9a96e" }}>
                {t.name}
              </p>
              <p className="font-body text-[11px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(232,224,208,0.35)" }}>
                {t.location}
              </p>
            </div>

            {/* Nav arrows */}
            <div className="absolute inset-y-0 left-3 md:left-6 flex items-center">
              <button
                onClick={prev}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:opacity-100 opacity-40"
                style={{ border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e" }}
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-3 md:right-6 flex items-center">
              <button
                onClick={next}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:opacity-100 opacity-40"
                style={{ border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e" }}
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-[2px] rounded-full transition-all duration-400"
                style={{
                  width: i === active ? "2rem" : "0.5rem",
                  background: i === active ? "#c9a96e" : "rgba(201,169,110,0.25)",
                }}
              />
            ))}
          </div>
        </FadeIn>

        {/* ── Stats + Video testimonial ──────────────── */}
        <div className="mt-20 md:mt-24 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Stats / text side */}
          <FadeIn delay={0.2}>
            <p className="font-body text-[11px] tracking-[0.45em] uppercase mb-5"
              style={{ color: "#c9a96e" }}>
              Hear Their Story
            </p>
            <h3 className="font-heading font-light leading-tight mb-6"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#e8e0d0" }}>
              Hear From Our<br />
              <em className="italic" style={{ color: "rgba(232,224,208,0.45)" }}>
                Happy Couples
              </em>
            </h3>
            <p className="font-body text-sm leading-relaxed mb-10"
              style={{ color: "rgba(232,224,208,0.45)" }}>
              Nothing speaks louder than joy. Watch this heartfelt testimonial and see why families trust JSB Events for their most precious celebrations.
            </p>
            <div className="flex items-center gap-10">
              <div>
                <p className="font-heading text-4xl font-light" style={{ color: "#c9a96e" }}>200+</p>
                <p className="font-body text-[11px] tracking-[0.2em] uppercase mt-1" style={{ color: "rgba(232,224,208,0.35)" }}>
                  Happy Couples
                </p>
              </div>
              <div className="w-px h-12" style={{ background: "rgba(201,169,110,0.2)" }} />
              <div>
                <p className="font-heading text-4xl font-light" style={{ color: "#c9a96e" }}>5.0</p>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="10" height="10" viewBox="0 0 10 10" fill="#c9a96e">
                      <polygon points="5,0 6.2,3.6 10,3.6 7,5.8 8.1,9.5 5,7.4 1.9,9.5 3,5.8 0,3.6 3.8,3.6"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Video side — full width on mobile, right-aligned on desktop */}
          <FadeIn delay={0.3}>
            <div className="flex justify-center md:justify-end">
              <div
                className="relative overflow-hidden shadow-2xl w-full md:w-auto"
                style={{
                  maxWidth: "420px",
                  width: "min(100%, 420px)",
                  aspectRatio: "9/16",
                  border: "1px solid rgba(201,169,110,0.2)",
                }}
              >
                <video
                  ref={videoRef}
                  poster="/gallery/venue-night.jpg"
                  muted={muted}
                  playsInline
                  controls={false}
                  preload="metadata"
                  className="w-full h-full object-cover"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                >
                  <source src="/videos/testimonial.mp4" type="video/mp4" />
                </video>

                {!playing && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 z-10 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.35)" }}
                    aria-label="Play testimonial"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(201,169,110,0.9)", backdropFilter: "blur(4px)" }}
                    >
                      <Play className="w-6 h-6 fill-black text-black ml-1" />
                    </div>
                  </button>
                )}
                {playing && (
                  <>
                    <button onClick={togglePlay} className="absolute inset-0 z-10" aria-label="Pause" />
                    <button
                      onClick={e => { e.stopPropagation(); setMuted(m => !m); }}
                      className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
                    >
                      {muted
                        ? <VolumeX className="w-3.5 h-3.5" style={{ color: "#c9a96e" }} />
                        : <Volume2 className="w-3.5 h-3.5" style={{ color: "#c9a96e" }} />}
                    </button>
                  </>
                )}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
