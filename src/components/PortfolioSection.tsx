import FadeIn from "@/components/FadeIn";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const images = [
  { src: portfolio1, alt: "Mandap ceremony setup", label: "Royal Wedding" },
  { src: portfolio2, alt: "Floral centerpiece", label: "Floral Design" },
  { src: portfolio3, alt: "Reception venue", label: "Grand Reception" },
  { src: portfolio4, alt: "Couple portrait", label: "Couple Moments" },
  { src: portfolio5, alt: "Beach wedding", label: "Destination Wedding" },
  { src: portfolio6, alt: "Engagement ceremony", label: "Engagement" },
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
      </div>
    </section>
  );
};

export default PortfolioSection;
