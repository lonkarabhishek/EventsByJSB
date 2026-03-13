import { useEffect, useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

const initialTransform: Record<string, string> = {
  up: "translate3d(0, 30px, 0)",
  down: "translate3d(0, -30px, 0)",
  left: "translate3d(30px, 0, 0)",
  right: "translate3d(-30px, 0, 0)",
};

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translate3d(0, 0, 0)";
          observer.unobserve(el);
        }
      },
      { rootMargin: "-50px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: initialTransform[direction],
        transition: `opacity 0.6s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay}s, transform 0.6s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
