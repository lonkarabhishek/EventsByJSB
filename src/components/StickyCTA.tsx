import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const threshold = isHome ? window.innerHeight : 300;
    const onScroll = () => {
      const shouldShow = window.scrollY > threshold;
      if (shouldShow !== visibleRef.current) {
        visibleRef.current = shouldShow;
        setVisible(shouldShow);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-foreground/95 backdrop-blur-sm border-t border-primary-foreground/10 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="hidden sm:block font-heading text-lg text-primary-foreground font-light">
            Ready to plan your dream celebration?
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/contact"
              className="flex-1 sm:flex-none text-center px-6 py-2.5 bg-gold text-foreground font-body text-xs tracking-widest uppercase rounded-full hover:bg-gold/90 transition-colors duration-300"
            >
              Start Planning Now
            </Link>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none text-center px-6 py-2.5 border border-primary-foreground/40 text-primary-foreground font-body text-xs tracking-widest uppercase rounded-full hover:bg-primary-foreground/10 transition-colors duration-300"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
