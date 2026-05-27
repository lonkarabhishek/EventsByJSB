import { useRef, useState, useCallback, useEffect } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const FOREST    = "#1B3A2D";
const FOREST_BG = "#0D2018"; /* very dark forest for cinematic section */

const reels = [
  { src: "/videos/reels/reel-1.mp4", poster: "/gallery/mandap-velvet.jpg" },
  { src: "/videos/reels/reel-2.mp4", poster: "/gallery/pampas-arch.jpg" },
  { src: "/videos/reels/reel-3.mp4", poster: "/gallery/venue-night.jpg" },
  { src: "/videos/reels/reel-4.mp4", poster: "/gallery/gold-aisle.jpg" },
  { src: "/videos/reels/reel-5.mp4", poster: "/gallery/engagement-setup.jpg" },
  { src: "/videos/reels/reel-6.mp4", poster: "/gallery/floral-archway.jpg" },
];

interface ReelCardProps {
  reel: (typeof reels)[0];
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

const ReelCard = ({ reel, isActive, onActivate, onDeactivate }: ReelCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!isActive) {
      v.pause();
      v.currentTime = 0;
    }
  }, [isActive]);

  const handlePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    onActivate();
    v.play().catch(() => {});
  }, [onActivate]);

  const handlePause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    onDeactivate();
  }, [onDeactivate]);

  return (
    <div className="relative group overflow-hidden" style={{ aspectRatio: "9/16" }}>
      <video
        ref={videoRef}
        src={reel.src}
        poster={reel.poster}
        muted={muted}
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onEnded={onDeactivate}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
          opacity: isActive ? 0.6 : 1,
        }}
      />

      {/* Play button */}
      {!isActive && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center z-10"
          aria-label="Play reel"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: "rgba(27,58,45,0.9)", backdropFilter: "blur(4px)" }}
          >
            <Play className="w-5 h-5 fill-white text-white ml-0.5" />
          </div>
        </button>
      )}

      {/* Pause overlay */}
      {isActive && (
        <button
          onClick={handlePause}
          className="absolute inset-0 z-10"
          aria-label="Pause"
        />
      )}

      {/* Mute/unmute */}
      {isActive && (
        <button
          onClick={e => { e.stopPropagation(); setMuted(m => !m); }}
          className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted
            ? <VolumeX className="w-3.5 h-3.5" style={{ color: "#9FCFB8" }} />
            : <Volume2 className="w-3.5 h-3.5" style={{ color: "#9FCFB8" }} />}
        </button>
      )}
    </div>
  );
};

const VideoReelsSection = () => {
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <section className="py-16 md:py-32 px-4 md:px-6" style={{ background: FOREST_BG }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 md:mb-20">
          <FadeIn>
            <p className="font-body text-[11px] tracking-[0.45em] uppercase mb-3"
              style={{ color: "#9FCFB8" }}>
              Captured Moments
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading font-light"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: "#FAF8F3" }}>
              Stories in Motion
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-sm font-light mt-4 max-w-md mx-auto"
              style={{ color: "rgba(250,248,243,0.45)" }}>
              Behind every event is a story worth telling. Watch ours.
            </p>
          </FadeIn>
        </div>

        {/* Reel grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {reels.map((reel, i) => (
            <FadeIn key={reel.src} delay={i * 0.06}>
              <ReelCard
                reel={reel}
                isActive={activeIdx === i}
                onActivate={() => setActiveIdx(i)}
                onDeactivate={() => setActiveIdx(prev => prev === i ? -1 : prev)}
              />
            </FadeIn>
          ))}
        </div>

        {/* Instagram CTA */}
        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <a
              href="https://instagram.com/eventsbyjsb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-body text-[11px] tracking-[0.35em] uppercase transition-all duration-300 hover:opacity-70"
              style={{ color: "#9FCFB8" }}
            >
              <span>Follow on Instagram</span>
              <div className="h-px w-10 animate-line-draw" style={{ background: "#9FCFB8" }} />
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default VideoReelsSection;
