import { useEffect, useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;   // px — default 52
  scale?: boolean;     // start slightly smaller — default true
  className?: string;
}

const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
  distance = 52,
  scale = true,
  className = "",
}: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity    = "1";
          el.style.transform  = "translate3d(0, 0, 0) scale(1)";
          observer.unobserve(el);
        }
      },
      { rootMargin: "-32px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tx = direction === "left"  ? `translate3d(${distance}px, 0, 0)` :
             direction === "right" ? `translate3d(-${distance}px, 0, 0)` :
             direction === "down"  ? `translate3d(0, -${distance}px, 0)` :
             direction === "none"  ? "translate3d(0, 0, 0)" :
                                     `translate3d(0, ${distance}px, 0)`;

  const initialTransform = scale && direction !== "none"
    ? `${tx} scale(0.96)`
    : tx;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: initialTransform,
        /* Spring-like easing — fast settle, natural overshoot feel */
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
                     transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
