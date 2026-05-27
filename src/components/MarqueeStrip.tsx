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
  const repeated = [...words, ...words];

  return (
    <div
      className="overflow-hidden py-4 border-y"
      style={{
        borderColor: "rgba(27,58,45,0.12)",
        background: "#EEE9DF",
      }}
    >
      <div className="animate-marquee">
        {repeated.map((w, i) => (
          <span
            key={i}
            className="font-heading text-sm md:text-base font-light tracking-[0.35em] uppercase mx-8 md:mx-12 whitespace-nowrap"
            style={{ color: i % 2 === 0 ? "rgba(27,58,45,0.7)" : "rgba(27,46,36,0.55)" }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
