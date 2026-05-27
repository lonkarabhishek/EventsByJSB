import FadeIn from "@/components/FadeIn";

const FOREST = "#1B3A2D";
const IVORY  = "#FAF8F3";
const CREAM  = "#EEE9DF";

const stats = [
  { value: "200+", label: "Events Planned" },
  { value: "10+",  label: "Years Experience" },
  { value: "50+",  label: "Destinations" },
];

const AboutSection = () => (
  <section
    id="about"
    className="py-16 md:py-32 px-4 md:px-6"
    style={{ background: IVORY }}
  >
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center">

        {/* Image side */}
        <FadeIn direction="left">
          <div className="relative">
            {/* Forest accent frame */}
            <div
              className="absolute -top-4 -left-4 w-2/3 h-2/3 -z-0 hidden md:block"
              style={{ border: "1px solid rgba(27,58,45,0.18)" }}
            />
            <img
              src="/gallery/green-aisle.jpg"
              alt="JSB Events elegant celebration"
              loading="lazy"
              className="relative z-10 w-full object-cover"
              style={{ height: "clamp(260px, 60vw, 560px)" }}
            />
            {/* Floating stat card */}
            <div
              className="absolute bottom-8 -right-6 z-20 px-7 py-5 hidden md:block"
              style={{ background: "rgba(250,248,243,0.97)", border: "1px solid rgba(27,58,45,0.2)", backdropFilter: "blur(12px)" }}
            >
              <p className="font-heading text-4xl font-light" style={{ color: FOREST }}>200+</p>
              <p className="font-body text-xs tracking-[0.25em] uppercase mt-1" style={{ color: "rgba(27,46,36,0.72)" }}>
                Dreams Crafted
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Text side */}
        <div>
          <FadeIn delay={0.1}>
            <p className="font-body text-[11px] tracking-[0.45em] uppercase mb-4"
              style={{ color: FOREST }}>
              About JSB Events
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="font-heading font-light leading-tight mb-6"
              style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.6rem)", color: "#1B2E24" }}>
              A Decade of<br />
              <em className="italic" style={{ color: "rgba(27,46,36,0.68)" }}>
                Flawless Celebrations
              </em>
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="font-body text-sm leading-relaxed mb-5"
              style={{ color: "rgba(27,46,36,0.82)" }}>
              Founded in 2014 in New Delhi by Jagdeep Singh Bagga, JSB Events has become a trusted name in crafting unforgettable experiences. With a passion for excellence, we've grown across Patna, Jaipur, Udaipur, Kolkata and beyond.
            </p>
          </FadeIn>

          <FadeIn delay={0.38}>
            <p className="font-body text-sm leading-relaxed mb-10"
              style={{ color: "rgba(27,46,36,0.82)" }}>
              We are your reliable expert for destination weddings and milestone celebrations. Our in-house team manages every detail: vendor coordination, bespoke décor, catering, entertainment, ensuring a seamless, stress-free experience from the first conversation to the last dance.
            </p>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.48}>
            <div className="flex gap-0 divide-x" style={{ borderColor: "rgba(27,58,45,0.15)" }}>
              {stats.map(s => (
                <div key={s.label} className="pr-8 pl-0 first:pl-0 last:pr-0 [&:not(:first-child)]:pl-8">
                  <p className="font-heading text-3xl md:text-4xl font-light" style={{ color: FOREST }}>
                    {s.value}
                  </p>
                  <p className="font-body text-[11px] tracking-[0.2em] uppercase mt-1" style={{ color: "rgba(27,46,36,0.68)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Signature */}
          <FadeIn delay={0.55}>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 max-w-[48px]" style={{ background: "rgba(27,58,45,0.25)" }} />
              <p className="font-heading text-lg italic" style={{ color: "rgba(27,58,45,0.6)" }}>
                Jagdeep Singh Bagga
              </p>
            </div>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase mt-1 pl-14 md:ml-16" style={{ color: "rgba(27,46,36,0.60)" }}>
              Founder &amp; Lead Planner
            </p>
          </FadeIn>
        </div>

      </div>
    </div>
  </section>
);

export default AboutSection;
