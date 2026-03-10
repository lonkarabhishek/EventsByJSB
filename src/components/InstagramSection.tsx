import FadeIn from "@/components/FadeIn";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import { Instagram } from "lucide-react";

const posts = [portfolio1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6];

const InstagramSection = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <FadeIn>
            <Instagram className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
              @jsbevents
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              Follow Our Journey
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {posts.map((src, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="img-hover-zoom rounded-md aspect-square">
                <img
                  src={src}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover rounded-md"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="text-center mt-10">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              <Instagram className="w-4 h-4" />
              Follow Us on Instagram
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default InstagramSection;
