import { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages, galleryCategories } from "@/data/galleryData";

const IMAGES_PER_PAGE = 24;

const GalleryPage = () => {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);

  const filtered = useMemo(
    () => active === "All" ? galleryImages : galleryImages.filter((img) => img.category === active),
    [active]
  );

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const hasMore = visibleCount < filtered.length;

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(IMAGES_PER_PAGE);
  }, [active]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox(Math.max(0, lightbox - 1));
      if (e.key === "ArrowRight") setLightbox(Math.min(filtered.length - 1, lightbox + 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, filtered.length]);

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
            A curated collection of our most cherished celebrations and events — {galleryImages.length} moments of magic.
          </p>
        </FadeIn>
      </section>

      {/* Filters — sticky */}
      <section className="py-6 px-6 bg-background sticky top-0 z-30 border-b border-border/50 backdrop-blur-sm bg-background/95">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 md:gap-3">
          {galleryCategories.map((cat) => {
            const count = cat === "All" ? galleryImages.length : galleryImages.filter(i => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 md:px-6 py-2 rounded-full font-body text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {cat} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="section-padding bg-background pt-8">
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {visible.map((img, i) => (
            <div key={`${img.src}-${active}`} className="break-inside-avoid">
              <FadeIn delay={Math.min(i * 0.03, 0.5)}>
                <div
                  className="img-hover-zoom rounded-lg cursor-pointer group relative"
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover rounded-lg"
                    loading="lazy"
                  />
                  {/* Hover overlay with caption */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 rounded-lg flex items-end">
                    <p className="text-primary-foreground text-sm font-body px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                      {img.alt}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((c) => c + IMAGES_PER_PAGE)}
              className="px-8 py-3.5 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary/90 transition-colors duration-300"
            >
              Load More ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {!hasMore && filtered.length > IMAGES_PER_PAGE && (
          <p className="text-center text-muted-foreground font-body text-sm mt-12">
            Showing all {filtered.length} images
          </p>
        )}
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-6 animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground z-20"
          >
            <X size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(Math.max(0, lightbox - 1));
            }}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground z-20"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(Math.min(filtered.length - 1, lightbox + 1));
            }}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground z-20"
          >
            <ChevronRight size={40} />
          </button>
          <img
            src={filtered[lightbox]?.src}
            alt={filtered[lightbox]?.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          {/* Caption bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center max-w-lg">
            <p className="text-primary-foreground/80 font-body text-sm mb-1">
              {filtered[lightbox]?.alt}
            </p>
            <p className="text-primary-foreground/40 font-body text-xs">
              {lightbox + 1} / {filtered.length} — {filtered[lightbox]?.category}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;
