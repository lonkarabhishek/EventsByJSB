import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import heroImg from "@/assets/hero-wedding.jpg";
import aboutImg from "@/assets/about-wedding.jpg";
import { X } from "lucide-react";

const categories = ["All", "Weddings", "Destinations", "Receptions", "Decor"];

const images = [
  { src: portfolio1, alt: "Mandap ceremony", category: "Weddings" },
  { src: portfolio2, alt: "Floral centerpiece", category: "Decor" },
  { src: portfolio3, alt: "Grand reception", category: "Receptions" },
  { src: portfolio4, alt: "Couple portrait", category: "Weddings" },
  { src: portfolio5, alt: "Beach destination wedding", category: "Destinations" },
  { src: portfolio6, alt: "Engagement setup", category: "Decor" },
  { src: heroImg, alt: "Wedding ceremony arch", category: "Weddings" },
  { src: aboutImg, alt: "Reception table setting", category: "Receptions" },
];

const GalleryPage = () => {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? images : images.filter((img) => img.category === active);

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-6 text-center bg-muted">
        <FadeIn>
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">Our Work</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-foreground mb-6">Gallery</h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            A curated collection of our most cherished celebrations and events.
          </p>
        </FadeIn>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-full font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                active === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding bg-background pt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((img, i) => (
            <FadeIn key={`${img.alt}-${active}`} delay={i * 0.06}>
              <div
                className="img-hover-zoom rounded-lg cursor-pointer"
                onClick={() => setLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-80 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground"
          >
            <X size={32} />
          </button>
          <img
            src={filtered[lightbox]?.src}
            alt={filtered[lightbox]?.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;
