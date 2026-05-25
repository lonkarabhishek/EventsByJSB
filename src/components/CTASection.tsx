import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";

const GOLD = "#c9a96e";

const stats = [
  { value: "200+", label: "Events Crafted" },
  { value: "10+",  label: "Years of Excellence" },
  { value: "50+",  label: "Destinations" },
];

const CTASection = () => (
  <section
    className="relative overflow-hidden py-20 md:py-40 px-4 md:px-6"
    style={{ background: "hsl(24 10% 5%)" }}
  >
    {/* ── Layered atmospheric background ── */}
    {/* Full bleed image with very heavy dark overlay for luxury feel */}
    <div className="absolute inset-0">
      <img
        src="/gallery/gold-aisle.jpg"
        alt=""
        className="w-full h-full object-cover"
        aria-hidden="true"
        loading="lazy"
      />
      {/* Deep dark vignette — keeps it dark luxury, not photo-heavy */}
      <div className="absolute inset-0" style={{ background: "rgba(8,6,4,0.88)" }} />
      {/* Radial gold centre glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Top + bottom gradient edge-fade */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, hsl(24 10% 5%) 0%, transparent 18%, transparent 82%, hsl(24 10% 5%) 100%)",
        }}
      />
    </div>

    {/* ── Gold corner brackets ── */}
    <div className="absolute top-8 left-8 w-12 h-12 hidden md:block pointer-events-none"
      style={{ borderTop: `1px solid ${GOLD}40`, borderLeft: `1px solid ${GOLD}40` }} />
    <div className="absolute bottom-8 right-8 w-12 h-12 hidden md:block pointer-events-none"
      style={{ borderBottom: `1px solid ${GOLD}40`, borderRight: `1px solid ${GOLD}40` }} />
    {/* Inner subtle border */}
    <div
      className="absolute inset-8 hidden md:block pointer-events-none"
      style={{ border: `1px solid ${GOLD}08` }}
    />

    {/* ── Content ── */}
    <div className="relative z-10 max-w-4xl mx-auto text-center">

      {/* Eyebrow */}
      <FadeIn>
        <p className="font-body text-[10px] tracking-[0.6em] uppercase mb-6"
          style={{ color: GOLD }}>
          Begin Your Journey
        </p>
      </FadeIn>

      {/* Gold divider */}
      <FadeIn delay={0.08}>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-14" style={{ background: `${GOLD}35` }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD, opacity: 0.5 }} />
          <div className="h-px w-14" style={{ background: `${GOLD}35` }} />
        </div>
      </FadeIn>

      {/* Main headline */}
      <FadeIn delay={0.14}>
        <h2
          className="font-heading font-light leading-[0.95] mb-8"
          style={{ fontSize: "clamp(2.2rem, 8vw, 7rem)", color: "#fff" }}
        >
          Let's Create Your<br />
          <em className="italic" style={{ color: GOLD }}>Dream Celebration</em>
        </h2>
      </FadeIn>

      {/* Sub-copy */}
      <FadeIn delay={0.22}>
        <p className="font-body text-sm font-light mb-12 max-w-md mx-auto"
          style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.9" }}>
          Every great celebration begins with a conversation.<br className="hidden sm:block" />
          Let's start yours today.
        </p>
      </FadeIn>

      {/* Stats row */}
      <FadeIn delay={0.3}>
        <div className="flex items-center justify-center gap-0 divide-x mb-10 md:mb-14"
          style={{ borderColor: `${GOLD}18` }}>
          {stats.map(s => (
            <div key={s.label} className="px-5 md:px-12 first:pl-0 last:pr-0">
              <p className="font-heading font-light" style={{ fontSize: "clamp(1.6rem,4vw,3rem)", color: GOLD }}>
                {s.value}
              </p>
              <p className="font-body text-[9px] md:text-[10px] tracking-[0.2em] uppercase mt-1"
                style={{ color: "rgba(232,224,208,0.35)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* CTA buttons */}
      <FadeIn delay={0.38}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            to="/contact"
            className="w-full sm:w-auto px-10 py-4 font-body text-[11px] tracking-[0.4em] uppercase transition-all duration-300"
            style={{ background: GOLD, color: "#0c0a08" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#d4b878"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GOLD; }}
          >
            Start Planning Now
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-10 py-4 font-body text-[11px] tracking-[0.4em] uppercase transition-all duration-300"
            style={{ border: `1px solid ${GOLD}45`, color: `${GOLD}CC` }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = GOLD;
              el.style.color = GOLD;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = `${GOLD}45`;
              el.style.color = `${GOLD}CC`;
            }}
          >
            Get in Touch
          </Link>
        </div>

        {/* Response badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5"
          style={{ border: `1px solid ${GOLD}20`, background: `${GOLD}06` }}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-body text-[11px]" style={{ color: "rgba(232,224,208,0.5)" }}>
            We respond in under 10 minutes
          </span>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default CTASection;
