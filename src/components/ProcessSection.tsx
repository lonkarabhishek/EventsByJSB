import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";

const FOREST = "#1B3A2D";
const IVORY  = "#FAF8F3";

const steps = [
  {
    number: "01",
    title: "Share Your Vision",
    desc: "Tell us about your dream celebration: event date, location, guest count, and every detail that matters to you.",
    image: "/gallery/process-vision.jpg",
  },
  {
    number: "02",
    title: "Get a Personalised Plan",
    desc: "We craft a bespoke proposal with curated designs, handpicked venues, trusted vendors, and detailed timelines.",
    image: "/gallery/process-plan.jpg",
  },
  {
    number: "03",
    title: "We Handle Everything",
    desc: "From vendor coordination to on-site setup, we manage every detail so you stay fully present in the moment.",
    image: "/gallery/process-setup.jpg",
  },
  {
    number: "04",
    title: "Celebrate!",
    desc: "Your dream event comes to life, flawlessly orchestrated, beautifully executed, absolutely unforgettable.",
    image: "/gallery/process-celebrate.jpg",
  },
];

const ProcessSection = () => (
  <section
    id="process"
    className="py-16 md:py-32 px-4 md:px-6"
    style={{ background: IVORY }}
  >
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-12 md:mb-20">
        <FadeIn>
          <p className="font-body text-[11px] tracking-[0.45em] uppercase mb-3"
            style={{ color: FOREST }}>
            Our Process
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-heading font-light"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: "#1B2E24" }}>
            How We Work
          </h2>
        </FadeIn>
      </div>

      {/* Steps */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-0 md:gap-x-16">
        {steps.map((step, i) => (
          <FadeIn key={step.number} delay={i * 0.1}>

            {/* Step row */}
            <div
              className="flex gap-5 md:gap-7 py-8 md:py-10"
              style={{
                borderTop: "1px solid rgba(27,58,45,0.1)",
                borderBottom: i === steps.length - 1 || i === steps.length - 2
                  ? "1px solid rgba(27,58,45,0.1)"
                  : "none",
              }}
            >
              {/* Left: number + line */}
              <div className="flex flex-col items-center flex-shrink-0 pt-1">
                <div
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    border: `1px solid ${FOREST}`,
                    background: "rgba(27,58,45,0.06)",
                  }}
                >
                  <span className="font-body text-[10px] tracking-[0.05em]" style={{ color: FOREST }}>
                    {step.number}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="w-px flex-1 mt-3 min-h-[2rem] md:hidden"
                    style={{ background: `linear-gradient(to bottom, rgba(27,58,45,0.35), transparent)` }}
                  />
                )}
              </div>

              {/* Center: text */}
              <div className="flex-1 min-w-0">
                <h3
                  className="font-heading font-light leading-tight mb-2 md:mb-3"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "#1B2E24" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "rgba(27,46,36,0.52)" }}
                >
                  {step.desc}
                </p>
              </div>

              {/* Right: image thumbnail */}
              <div
                className="flex-shrink-0 self-start overflow-hidden"
                style={{
                  width: "clamp(72px, 20vw, 110px)",
                  aspectRatio: "3/4",
                  border: "1px solid rgba(27,58,45,0.12)",
                }}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* CTA */}
      <FadeIn delay={0.5}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12 md:mt-16 pt-10 md:pt-12"
          style={{ borderTop: "1px solid rgba(27,58,45,0.1)" }}>
          <div>
            <p className="font-body text-sm font-light" style={{ color: "rgba(27,46,36,0.48)" }}>
              Ready to get started?
            </p>
          </div>
          <Link
            to="/contact"
            className="font-body text-[11px] tracking-[0.4em] uppercase px-8 py-3.5 transition-all duration-300"
            style={{ background: FOREST, color: "#FAF8F3" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#2E6348"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = FOREST; }}
          >
            Start Your Journey
          </Link>
        </div>
      </FadeIn>

    </div>
  </section>
);

export default ProcessSection;
