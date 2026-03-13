import { Star, Play } from "lucide-react";
import { useRef, useState } from "react";
import FadeIn from "@/components/FadeIn";

const testimonials = [
  {
    name: "Priya & Arjun",
    text: "JSB Events turned our dream wedding into reality. Every detail was perfect — from the flowers to the timeline. We couldn't have asked for a more seamless experience.",
    rating: 5,
  },
  {
    name: "Sarah & James",
    text: "Our destination wedding in Udaipur was absolutely magical. The team handled everything with such grace and professionalism. Truly unforgettable.",
    rating: 5,
  },
  {
    name: "Meera & Rohan",
    text: "From the initial consultation to the last dance, JSB Events made us feel like the most important couple in the world. Pure perfection.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
              Testimonials
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              Words From Our Couples
            </h2>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div className="bg-card border border-border p-8 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-body text-muted-foreground mb-6 italic">
                  "{t.text}"
                </p>
                <p className="font-heading text-lg text-foreground">{t.name}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Video Testimonial — featured phone-frame layout */}
        <FadeIn delay={0.4}>
          <div className="mt-20 grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            {/* Text side */}
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
                Watch Their Story
              </p>
              <h3 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-6">
                Hear From Our Happy Couples
              </h3>
              <p className="text-body text-muted-foreground mb-8">
                Nothing speaks louder than the joy of our couples. Watch this heartfelt testimonial and see why families trust JSB Events for their most precious celebrations.
              </p>
              <div className="flex items-center gap-8 justify-center md:justify-start">
                <div>
                  <p className="font-heading text-3xl text-primary font-light">200+</p>
                  <p className="text-body text-xs text-muted-foreground mt-1">Happy Couples</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <p className="font-heading text-3xl text-primary font-light">5.0</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Video phone frame */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-[280px] sm:w-[300px] aspect-[9/16] rounded-[2.5rem] border-[4px] border-foreground/15 bg-foreground overflow-hidden shadow-2xl">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-foreground rounded-full z-20" />
                <video
                  ref={videoRef}
                  preload="metadata"
                  playsInline
                  controls={isPlaying}
                  poster="/gallery/venue-night.jpg"
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src="/videos/testimonial.mp4" type="video/mp4" />
                </video>
                {/* Play button overlay */}
                {!isPlaying && (
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-foreground/30 transition-colors duration-300 hover:bg-foreground/20 cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
                      <Play className="w-7 h-7 text-foreground fill-foreground ml-1" />
                    </div>
                  </button>
                )}
                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-foreground/60 to-transparent z-10 pointer-events-none" />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default TestimonialsSection;
