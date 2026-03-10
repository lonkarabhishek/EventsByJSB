import { MessageCircle, Palette, CheckCircle, Sparkles } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const steps = [
  { icon: MessageCircle, title: "Consultation", desc: "We listen to your vision, understand your style, and discuss your dream celebration." },
  { icon: Palette, title: "Planning & Design", desc: "Our team crafts a bespoke plan with curated designs, vendors, and timelines." },
  { icon: CheckCircle, title: "Execution", desc: "We manage every detail on the day so you can be fully present in the moment." },
  { icon: Sparkles, title: "Celebration", desc: "Your dream event comes to life — flawlessly orchestrated and unforgettable." },
];

const ProcessSection = () => {
  return (
    <section id="process" className="section-padding bg-muted">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
              Our Process
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              How We Work
            </h2>
          </FadeIn>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.15}>
              <div className="text-center relative">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-heading text-sm text-primary mb-2 tracking-widest">
                  0{i + 1}
                </p>
                <h3 className="font-heading text-xl text-foreground mb-3">{step.title}</h3>
                <p className="text-body text-sm text-muted-foreground">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-border" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
