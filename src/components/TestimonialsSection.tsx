import { Star } from "lucide-react";
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
