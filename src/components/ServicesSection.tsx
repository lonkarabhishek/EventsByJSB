import FadeIn from "@/components/FadeIn";

const FOREST = "#1B3A2D";
const IVORY  = "#FAF8F3";

const services = [
  {
    number: "01",
    title: "Planning & Decor",
    description:
      "Meticulous planning and bespoke décor that transforms every venue into a living masterpiece, from colour palette to final petal.",
    tags: ["Venue Styling", "Floral Design", "Lighting"],
  },
  {
    number: "02",
    title: "Hospitality & Logistics",
    description:
      "Seamless coordination of travel, accommodations, and hospitality, so every guest feels like the guest of honour.",
    tags: ["Guest Management", "Travel", "Accommodations"],
  },
  {
    number: "03",
    title: "Entertainment",
    description:
      "Live performances, curated DJ sets, and interactive experiences that keep every moment alive and every guest enthralled.",
    tags: ["Live Music", "DJ Curation", "Experiences"],
  },
  {
    number: "04",
    title: "Culinary Experiences",
    description:
      "From intimate family dinners to grand receptions, menus curated for taste, occasion, and unforgettable dining memories.",
    tags: ["Catering", "Bar Service", "Custom Menus"],
  },
];

const ServicesSection = () => (
  <section id="services" className="py-16 md:py-32 px-4 md:px-6" style={{ background: IVORY }}>
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-12 md:mb-20 max-w-xl">
        <FadeIn>
          <p className="font-body text-[11px] tracking-[0.45em] uppercase mb-4"
            style={{ color: FOREST }}>
            Our Services
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-heading font-light leading-tight"
            style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)", color: "#1B2E24" }}>
            Everything Your<br />
            <em className="italic" style={{ color: "rgba(27,46,36,0.68)" }}>
              Celebration Deserves
            </em>
          </h2>
        </FadeIn>
      </div>

      {/* Service rows */}
      <div className="divide-y" style={{ borderColor: "rgba(27,58,45,0.1)" }}>
        {services.map((s, i) => (
          <FadeIn key={s.number} delay={i * 0.08}>
            <div
              className="group py-6 md:py-10 grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr_auto] gap-3 md:gap-8 items-start cursor-default transition-all duration-500 hover:pl-2"
            >
              {/* Number */}
              <span
                className="font-heading text-4xl md:text-6xl font-light transition-colors duration-500 group-hover:text-[#1B3A2D]"
                style={{ color: "rgba(27,46,36,0.1)", lineHeight: 1 }}
              >
                {s.number}
              </span>

              {/* Content */}
              <div className="space-y-3">
                <h3
                  className="font-heading font-light transition-colors duration-500 group-hover:text-[#1B3A2D]"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#1B2E24" }}
                >
                  {s.title}
                </h3>
                <p className="font-body text-sm leading-relaxed max-w-lg"
                  style={{ color: "rgba(27,46,36,0.80)" }}>
                  {s.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {s.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-body text-[10px] tracking-[0.25em] uppercase px-3 py-1"
                      style={{
                        color: "rgba(27,58,45,0.6)",
                        border: "1px solid rgba(27,58,45,0.18)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div
                className="hidden md:flex items-center self-center transition-all duration-500 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1"
                style={{ color: FOREST }}
              >
                <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
                  <path d="M0 6H26M22 1L27 6L22 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Locations strip */}
      <FadeIn delay={0.4}>
        <div className="mt-16 md:mt-20 pt-8 md:pt-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-10"
          style={{ borderTop: "1px solid rgba(27,58,45,0.12)" }}>
          <p className="font-body text-[10px] tracking-[0.45em] uppercase"
            style={{ color: "rgba(27,58,45,0.5)" }}>
            Serving
          </p>
          <div className="flex flex-wrap gap-6 md:gap-10">
            {["Patna", "Delhi", "Jaipur", "Udaipur", "Kolkata", "Global"].map((city, i) => (
              <span
                key={city}
                className="font-heading text-lg md:text-xl font-light"
                style={{ color: i === 5 ? FOREST : "rgba(27,46,36,0.82)" }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>

    </div>
  </section>
);

export default ServicesSection;
