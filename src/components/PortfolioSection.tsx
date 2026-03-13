import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";

const images = [
  { src: "/gallery/mandap-velvet.jpg", alt: "Luxurious mandap with velvet seating and chandeliers", label: "Royal Mandap" },
  { src: "/gallery/pampas-arch.jpg", alt: "Elegant pampas grass arch ceremony setup", label: "Ceremony Arch" },
  { src: "/gallery/venue-night.jpg", alt: "Outdoor night venue with illuminated arched backdrop", label: "Night Venue" },
  { src: "/gallery/gold-aisle.jpg", alt: "Gold and silver themed wedding aisle", label: "Golden Aisle" },
  { src: "/gallery/engagement-setup.jpg", alt: "Romantic engagement ceremony setup", label: "Engagement" },
  { src: "/gallery/floral-archway.jpg", alt: "Grand floral archway entrance", label: "Floral Design" },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
              Our Portfolio
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              Celebrations We've Crafted
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <FadeIn key={img.label} delay={i * 0.08}>
              <div className="img-hover-zoom rounded-lg relative group cursor-pointer">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-80 object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-500 rounded-lg flex items-end justify-start p-6">
                  <p className="text-primary-foreground font-heading text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                    {img.label}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              View Full Gallery
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default PortfolioSection;
