import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";

const images = [
  { src: "/gallery/real/2026-02-18_15-00-14_UTC_1.jpg",  alt: "Wedding celebration",    label: "Wedding Ceremony" },
  { src: "/gallery/real/2026-02-28_14-47-07_UTC.jpg",    alt: "Floral décor",           label: "Floral Design"    },
  { src: "/gallery/real/2026-02-23_15-20-24_UTC_3.jpg",  alt: "Grand stage setup",      label: "Stage Design"     },
  { src: "/gallery/real/2025-04-27_15-30-00_UTC_1.jpg",  alt: "Engagement ceremony",    label: "Engagement"       },
  { src: "/gallery/real/2025-01-30_16-24-11_UTC_1.jpg",  alt: "Wedding mandap",         label: "Royal Mandap"     },
  { src: "/gallery/real/2024-07-30_05-40-32_UTC_1.jpg",  alt: "Evening venue lighting", label: "Venue & Lighting" },
  { src: "/gallery/real/2025-03-29_15-30-00_UTC_1.jpg",  alt: "Celebration decor",      label: "Celebrations"     },
  { src: "/gallery/real/2024-04-08_15-12-47_UTC_1.jpg",  alt: "Destination wedding",    label: "Destination"      },
  { src: "/gallery/real/2026-01-29_13-10-04_UTC_1.jpg",  alt: "Luxury event setup",     label: "Luxury Events"    },
];

const PortfolioSection = () => (
  <section id="portfolio" className="py-20 md:py-32 px-4 md:px-6">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-20 gap-4 md:gap-6">
        <div>
          <FadeIn>
            <p className="font-body text-[11px] tracking-[0.45em] uppercase mb-3"
              style={{ color: "#c9a96e" }}>
              Our Portfolio
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading font-light leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#e8e0d0" }}>
              Celebrations<br />
              <em className="italic" style={{ color: "rgba(232,224,208,0.4)" }}>We've Crafted</em>
            </h2>
          </FadeIn>
        </div>
        <FadeIn delay={0.2}>
          <Link
            to="/gallery"
            className="self-start font-body text-[11px] tracking-[0.35em] uppercase px-6 py-3 transition-all duration-300"
            style={{ border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#c9a96e"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.4)"; }}
          >
            View Full Gallery
          </Link>
        </FadeIn>
      </div>

      {/* ── Mobile: CSS masonry columns ── */}
      <div className="columns-2 gap-2 md:hidden">
        {images.map((img, i) => (
          <FadeIn key={img.label + i} delay={i * 0.05}>
            <div className="relative group overflow-hidden cursor-pointer break-inside-avoid mb-2">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }}
              >
                <p className="font-heading text-white text-sm font-light">{img.label}</p>
                <div className="h-px w-6 mt-1" style={{ background: "#c9a96e" }} />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* ── Desktop: CSS grid with aspect-ratio uniformity ── */}
      <div className="hidden md:columns-3 md:block gap-4">
        {images.map((img, i) => (
          <FadeIn key={img.label + i + "-d"} delay={i * 0.06}>
            <div className="relative group overflow-hidden cursor-pointer break-inside-avoid mb-4">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 55%)" }}
              >
                <p className="font-heading text-white text-xl font-light translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
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

export default PortfolioSection;
