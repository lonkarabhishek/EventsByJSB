const words = [
  "Weddings",
  "Celebrations",
  "Destinations",
  "Memories",
  "Elegance",
  "Romance",
  "Crafted with Love",
];

const MarqueeStrip = () => {
  const repeated = [...words, ...words]; // duplicate for seamless loop

  return (
    <div
      className="overflow-hidden py-4 border-y"
      style={{
        borderColor: "rgba(201,169,110,0.2)",
        background: "rgba(201,169,110,0.04)",
      }}
    >
      <div className="animate-marquee">
        {repeated.map((w, i) => (
          <span
            key={i}
            className="font-heading text-sm md:text-base font-light tracking-[0.35em] uppercase mx-8 md:mx-12 whitespace-nowrap"
            style={{ color: i % 2 === 0 ? "rgba(201,169,110,0.7)" : "rgba(232,224,208,0.25)" }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
