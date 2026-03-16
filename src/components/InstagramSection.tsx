import { useRef, useState, useEffect, useCallback } from "react";
import FadeIn from "@/components/FadeIn";
import { Play, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

const reels = [
  { src: "/videos/reels/reel-1.mp4", label: "Wedding Highlights" },
  { src: "/videos/reels/reel-2.mp4", label: "Grand Reception" },
  { src: "/videos/reels/reel-3.mp4", label: "Decor Showcase" },
  { src: "/videos/reels/reel-4.mp4", label: "Venue Magic" },
  { src: "/videos/reels/reel-5.mp4", label: "Celebration Vibes" },
  { src: "/videos/reels/reel-6.mp4", label: "Behind the Scenes" },
];

const CARD_W = 240;
const CARD_GAP = 20;

const VideoReelsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const dragOffsetRef = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const isDraggingRef = useRef(false);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const lockRef = useRef(false);

  // Navigate with infinite wrapping
  const goTo = useCallback((index: number) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setTimeout(() => { lockRef.current = false; }, 350);
    const n = ((index % reels.length) + reels.length) % reels.length;
    activeRef.current = n;
    setActiveIndex(n);
  }, []);

  const goNext = useCallback(() => goTo(activeRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(activeRef.current - 1), [goTo]);

  // Snap to nearest card based on drag offset
  const snapFromDrag = useCallback(() => {
    const offset = dragOffsetRef.current;
    const threshold = (CARD_W + CARD_GAP) * 0.3;
    if (Math.abs(offset) > threshold) {
      const steps = Math.round(Math.abs(offset) / (CARD_W + CARD_GAP));
      const clamped = Math.max(1, steps);
      if (offset < 0) {
        goTo(activeRef.current + clamped);
      } else {
        goTo(activeRef.current - clamped);
      }
    }
    dragOffsetRef.current = 0;
    setDragOffset(0);
    isDraggingRef.current = false;
  }, [goTo]);

  // Touch swipe + trackpad horizontal scroll
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      isDraggingRef.current = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.touches[0].clientX - touchStartRef.current.x;
      if (Math.abs(dx) > 10) {
        dragOffsetRef.current = dx;
        setDragOffset(dx);
      }
    };

    const onTouchEnd = () => {
      snapFromDrag();
    };

    // Trackpad / mouse wheel — capture both horizontal and vertical scroll
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 2) {
        e.preventDefault();
        isDraggingRef.current = true;
        dragOffsetRef.current -= delta;
        setDragOffset(dragOffsetRef.current);
        clearTimeout(wheelTimerRef.current);
        wheelTimerRef.current = setTimeout(() => {
          snapFromDrag();
        }, 150);
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
      clearTimeout(wheelTimerRef.current);
    };
  }, [goNext, goPrev, snapFromDrag]);

  // Lightbox body scroll lock + hide navbar/sticky CTA
  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
      // Hide navbar and sticky CTA so they don't cover video controls
      const navbar = document.querySelector("nav.fixed");
      const stickyCta = document.querySelector(".fixed.bottom-0");
      if (navbar) (navbar as HTMLElement).style.display = "none";
      if (stickyCta) (stickyCta as HTMLElement).style.display = "none";
    } else {
      document.body.style.overflow = "";
      const navbar = document.querySelector("nav.fixed");
      const stickyCta = document.querySelector(".fixed.bottom-0");
      if (navbar) (navbar as HTMLElement).style.display = "";
      if (stickyCta) (stickyCta as HTMLElement).style.display = "";
    }
    return () => {
      document.body.style.overflow = "";
      const navbar = document.querySelector("nav.fixed");
      const stickyCta = document.querySelector(".fixed.bottom-0");
      if (navbar) (navbar as HTMLElement).style.display = "";
      if (stickyCta) (stickyCta as HTMLElement).style.display = "";
    };
  }, [lightbox]);

  // Auto-play lightbox video
  useEffect(() => {
    if (lightbox !== null && lightboxVideoRef.current) {
      lightboxVideoRef.current.play().catch(() => {});
    }
  }, [lightbox]);

  // Keyboard nav in lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox(lightbox === 0 ? reels.length - 1 : lightbox - 1);
      if (e.key === "ArrowRight") setLightbox(lightbox === reels.length - 1 ? 0 : lightbox + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  const half = Math.floor(reels.length / 2);
  const cardHeight = Math.round(CARD_W * 16 / 9);

  return (
    <>
      <section className="py-24 md:py-32 bg-muted overflow-hidden">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <FadeIn>
            <Play className="w-7 h-7 text-primary mx-auto mb-4" strokeWidth={1.5} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              Events in Motion
            </h2>
          </FadeIn>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="relative mx-auto select-none"
          style={{ height: cardHeight + 20 }}
        >
          {/* Nav arrows */}
          <button
            onClick={goPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Previous reel"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Next reel"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Reel cards — positioned around center */}
          {reels.map((reel, i) => {
            let offset = i - activeIndex;
            if (offset > half) offset -= reels.length;
            if (offset < -half) offset += reels.length;

            const absOff = Math.abs(offset);
            const isActive = offset === 0;
            const scale = isActive ? 1 : 0.82;
            const x = offset * (CARD_W + CARD_GAP) + dragOffset;
            const isVisible = absOff <= 2 || (isDraggingRef.current && absOff <= 3);
            const isDragging = isDraggingRef.current;

            return (
              <div
                key={i}
                className={`absolute top-0 ${isDragging ? "transition-none" : "transition-all duration-500 ease-out"}`}
                style={{
                  left: "50%",
                  width: CARD_W,
                  marginLeft: -CARD_W / 2,
                  transform: `translateX(${x}px) scale(${scale})`,
                  opacity: isVisible ? (isActive ? 1 : absOff === 1 ? 0.5 : 0.2) : 0,
                  zIndex: 10 - absOff,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                onClick={() => (isActive ? setLightbox(i) : goTo(i))}
              >
                <div className="group relative rounded-[2rem] overflow-hidden border border-border bg-foreground aspect-[9/16] shadow-lg cursor-pointer">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src={reel.src} type="video/mp4" />
                  </video>

                  {/* Hover expand icon on active */}
                  {isActive && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <Maximize2 className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}

                  {/* Label gradient */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="font-heading text-sm text-primary-foreground tracking-wider">
                      {reel.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress indicator lines — tappable */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {reels.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group relative h-[3px] rounded-full overflow-hidden transition-all duration-500 hover:h-[5px]"
              style={{ width: activeIndex === i ? 40 : 16 }}
              aria-label={`Go to reel ${i + 1}`}
            >
              <div className="absolute inset-0 bg-foreground/15 rounded-full" />
              <div
                className="absolute inset-0 bg-primary rounded-full transition-transform duration-500 origin-left"
                style={{
                  transform: activeIndex === i ? "scaleX(1)" : "scaleX(0)",
                }}
              />
            </button>
          ))}
        </div>

        {/* Instagram CTA */}
        <FadeIn delay={0.3}>
          <div className="text-center mt-10">
            <a
              href="https://instagram.com/eventsbyjsb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              Follow @eventsbyjsb
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Fullscreen Video Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setLightbox(null)}
        >
          {/* Top bar: label + close */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-[env(safe-area-inset-top,12px)] pb-2 bg-gradient-to-b from-black/80 to-transparent">
            <div className="text-center flex-1 pl-12">
              <p className="font-heading text-base text-white/90 tracking-wider">
                {reels[lightbox]?.label}
              </p>
              <p className="font-body text-xs text-white/50">
                {lightbox + 1} / {reels.length}
              </p>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(lightbox === 0 ? reels.length - 1 : lightbox - 1);
            }}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(lightbox === reels.length - 1 ? 0 : lightbox + 1);
            }}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Video — larger on mobile, phone frame on desktop */}
          <div
            className="relative w-full h-full md:w-[85vw] md:max-w-[400px] md:h-auto md:aspect-[9/16] md:rounded-[2rem] overflow-hidden md:shadow-2xl md:border-2 md:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={lightboxVideoRef}
              key={reels[lightbox]?.src}
              autoPlay
              playsInline
              controls
              loop
              className="w-full h-full object-contain md:object-cover bg-black"
            >
              <source src={reels[lightbox]?.src} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoReelsSection;
