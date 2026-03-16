import { useRef, useState, useEffect } from "react";

const steps = [
  {
    number: "01",
    title: "Share Your Vision",
    desc: "Tell us about your dream celebration — event date, budget, location, venue style, guest count, and every detail that matters to you.",
    image: "/gallery/process-vision.jpg",
  },
  {
    number: "02",
    title: "Get a Personalised Plan",
    desc: "Our team crafts a bespoke proposal with curated designs, handpicked venues, trusted vendors, and detailed timelines — tailored to your taste.",
    image: "/gallery/process-plan.jpg",
  },
  {
    number: "03",
    title: "We Handle Everything",
    desc: "From vendor coordination to on-site setup and breakdown, we manage every detail so you can be fully present in the moment.",
    image: "/gallery/process-setup.jpg",
  },
  {
    number: "04",
    title: "Celebrate!",
    desc: "Your dream event comes to life — flawlessly orchestrated, beautifully executed, and absolutely unforgettable. Just enjoy.",
    image: "/gallery/process-celebrate.jpg",
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // How far through the section (0 → 1)
      const scrolled = -rect.top / (sectionHeight - viewportHeight);
      const p = Math.max(0, Math.min(1, scrolled));
      setProgress(p);

      // Map to step index
      const step = Math.min(steps.length - 1, Math.floor(p * steps.length));
      setActiveStep(step);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Progress along the vertical line (0 to 100%)
  const lineProgress = Math.min(100, progress * 100 * (steps.length / (steps.length - 0.5)));

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ height: `${(steps.length + 1) * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport-height container */}
      <div className="sticky top-0 h-screen flex items-start pt-20 md:pt-24 overflow-hidden bg-background pb-16">

        {/* Mobile fullscreen background images */}
        <div className="absolute inset-0 md:hidden">
          {steps.map((step, i) => (
            <img
              key={i}
              src={step.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out"
              style={{ opacity: i === activeStep ? 1 : 0 }}
              loading="lazy"
            />
          ))}
          {/* Softer overlay for text readability */}
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/40 to-foreground/30" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <p className="text-primary-foreground/70 md:text-primary font-body text-xs md:text-sm tracking-[0.3em] uppercase mb-2 md:mb-3">
              Our Process
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-primary-foreground md:text-foreground">
              How We Work
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-16 items-center">
            {/* Left: Steps timeline */}
            <div className="relative pl-14 md:pl-16">
              {/* Vertical dashed line (background) */}
              <div className="absolute left-[18px] md:left-[22px] top-2 bottom-2 w-px border-l-2 border-dashed border-primary-foreground/20 md:border-primary/20" />

              {/* Vertical progress fill */}
              <div
                className="absolute left-[18px] md:left-[22px] top-2 w-[2px] bg-primary transition-all duration-700 ease-out rounded-full"
                style={{ height: `${lineProgress}%` }}
              />

              {steps.map((step, i) => {
                const isActive = i === activeStep;
                const isPast = i < activeStep;

                return (
                  <div
                    key={i}
                    className="relative mb-6 md:mb-10 last:mb-0 cursor-pointer"
                    onClick={() => {
                      // Scroll to make this step active
                      if (!sectionRef.current) return;
                      const rect = sectionRef.current.getBoundingClientRect();
                      const sectionTop = window.scrollY + rect.top;
                      const sectionHeight = sectionRef.current.offsetHeight;
                      const vh = window.innerHeight;
                      const targetProgress = i / steps.length;
                      const targetScroll = sectionTop + targetProgress * (sectionHeight - vh);
                      window.scrollTo({ top: targetScroll, behavior: "smooth" });
                    }}
                  >
                    {/* Number circle */}
                    <div
                      className={`absolute -left-14 md:-left-16 top-0 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center font-body text-xs md:text-sm font-semibold transition-all duration-500 ${
                        isActive
                          ? "bg-primary text-primary-foreground scale-105"
                          : isPast
                            ? "bg-primary/60 text-primary-foreground"
                            : "bg-primary-foreground/10 md:bg-background border border-primary-foreground/20 md:border-border text-primary-foreground/50 md:text-muted-foreground"
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Title + Description */}
                    <div
                      className={`transition-all duration-500 ${
                        isActive ? "opacity-100" : isPast ? "opacity-50" : "opacity-30"
                      }`}
                    >
                      <h3
                        className={`font-heading text-primary-foreground md:text-foreground transition-all duration-500 leading-tight ${
                          isActive ? "text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-3" : "text-lg md:text-xl mb-1"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-out ${
                          isActive ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-body text-base md:text-base text-primary-foreground/70 md:text-muted-foreground max-w-md leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Image with decorative ring — desktop only */}
            <div className="relative hidden md:flex items-center justify-center">
              {/* Decorative ring — subtle */}
              <div
                className="absolute w-[105%] aspect-square rounded-full border border-border transition-transform duration-1000 ease-out"
                style={{ transform: `rotate(${progress * 90}deg)` }}
              />

              {/* Image container */}
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                {steps.map((step, i) => (
                  <img
                    key={i}
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
                    style={{
                      opacity: i === activeStep ? 1 : 0,
                      transform: i === activeStep ? "scale(1)" : "scale(1.08)",
                    }}
                    loading="lazy"
                  />
                ))}

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />

                {/* Step counter badge */}
                <div className="absolute bottom-5 right-5 bg-background/80 backdrop-blur-md rounded-full px-4 py-2">
                  <span className="text-foreground font-heading text-xl">{activeStep + 1}</span>
                  <span className="text-muted-foreground font-body text-sm"> / {steps.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA below steps */}
          <div
            className={`text-center mt-6 md:mt-10 transition-all duration-500 ${
              activeStep === steps.length - 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="/contact"
              className="inline-block px-8 py-3.5 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary/90 transition-colors duration-300"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
