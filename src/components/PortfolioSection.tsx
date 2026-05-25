import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";

// Mix of real new images + existing named gallery images
const images = [
  { src: "/gallery/real/2026-02-18_15-00-14_UTC_1.jpg",  alt: "Wedding celebration",     label: "Wedding Ceremony",  size: "tall" },
  { src: "/gallery/real/2025-12-17_13-53-28_UTC_1.jpg",  alt: "Floral décor",            label: "Floral Design",     size: "short" },
  { src: "/gallery/real/2026-02-23_15-20-24_UTC_3.jpg",  alt: "Grand stage setup",       label: "Stage Design",      size: "short" },
  { src: "/gallery/real/2025-04-27_15-30-00_UTC_1.jpg",  alt: "Engagement ceremony",     label: "Engagement",        size: "tall" },
  { src: "/gallery/real/2025-01-30_16-24-11_UTC_1.jpg",  alt: "Wedding mandap",          label: "Royal Mandap",      size: "short" },
  { src: "/gallery/real/2024-07-30_05-40-32_UTC_1.jpg",  alt: "Evening venue lighting",  label: "Venue & Lighting",  size: "wide" },
  { src: "/gallery/real/2025-03-29_15-30-00_UTC_1.jpg",  alt: "Celebration decor",       label: "Celebrations",      size: "short" },
  { src: "/gallery/real/2024-04-08_15-12-47_UTC_1.jpg",  alt: "Destination wedding",     label: "Destination",       size: "short" },
  { src: "/gallery/real/2026-01-29_13-10-04_UTC_1.jpg",  alt: "Luxury event",            label: "Luxury Events",     size: "short" },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-20 gap-6">
          <div>
            <FadeIn>
              <p className="font-body text-[11px] tracking-[0.45em] uppercase mb-3" style={{ color: "#c9a96e" }}>
                Our Portfolio
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-heading font-light leading-tight"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#e8e0d0" }}>
                Celebrations<br />
                <em className="italic" style={{ color: "rgba(232,224,208,0.4)" }}>We've Crafted</em>
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <Link
              to="/gallery"
              className="self-start md:self-auto font-body text-[11px] tracking-[0.35em] uppercase px-7 py-3 transition-all duration-300"
              style={{ border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#c9a96e"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.4)"; }}
            >
              View Full Gallery
            </Link>
          </FadeIn>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, i) => (
            <FadeIn key={img.label + i} delay={i * 0.06}>
              <div
                className="relative group overflow-hidden cursor-pointer"
                style={{
                  gridRow:    img.size === "tall" ? "span 2" : "span 1",
                  gridColumn: img.size === "wide" ? "span 2" : "span 1",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    minHeight: img.size === "tall" ? "480px" : "220px",
                    maxHeight: img.size === "tall" ? "620px" : "300px",
                  }}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 55%)" }}
                >
                  <p className="font-heading text-white text-lg md:text-xl font-light translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    {img.label}
                  </p>
                  <div className="h-px w-8 mt-2 group-hover:w-14 transition-all duration-500" style={{ background: "#c9a96e" }} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;
