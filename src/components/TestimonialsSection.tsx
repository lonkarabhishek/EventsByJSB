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
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <FadeIn>
            <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-4">
              Testimonials
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              Words From Our Couples
            </h2>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div className="bg-card border border-border p-8 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-body text-sm text-muted-foreground mb-6 italic leading-relaxed">
                  "{t.text}"
                </p>
                <p className="font-heading text-lg text-foreground">{t.name}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Video Testimonial */}
        <FadeIn delay={0.4}>
          <div className="mt-24 grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-4">
                Watch Their Story
              </p>
              <h3 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-6">
                Hear From Our Happy Couples
              </h3>
              <p className="text-body text-sm text-muted-foreground mb-8 leading-relaxed">
                Nothing speaks louder than the joy of our couples. Watch this heartfelt testimonial and see why families trust JSB Events for their most precious celebrations.
              </p>
              <div className="flex items-center gap-8 justify-center md:justify-start">
                <div>
                  <p className="font-heading text-3xl text-foreground font-light">200+</p>
                  <p className="text-body text-xs text-muted-foreground mt-1">Happy Couples</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="font-heading text-3xl text-foreground font-light">5.0</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-[260px] sm:w-[280px] aspect-[9/16] rounded-[2rem] border border-border bg-muted overflow-hidden shadow-lg">
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
                {!isPlaying && (
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-foreground/20 transition-colors duration-300 hover:bg-foreground/10 cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center shadow-md">
                      <Play className="w-6 h-6 text-foreground fill-foreground ml-0.5" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default TestimonialsSection;
