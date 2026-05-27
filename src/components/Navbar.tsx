import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/jsb-logo.jpg";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery",  href: "/gallery" },
];

const FOREST = "#1B3A2D";

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = !scrolled && isHome;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: transparent
          ? "transparent"
          : "rgba(250, 248, 243, 0.96)",
        backdropFilter: transparent ? "none" : "blur(14px)",
        borderBottom: transparent ? "none" : "1px solid rgba(27,58,45,0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:py-5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="JSB Events"
            className="h-10 w-10 rounded-full object-cover"
            style={{ border: `1px solid ${transparent ? "rgba(255,255,255,0.3)" : "rgba(27,58,45,0.2)"}` }}
          />
          <span
            className="font-heading text-xl md:text-2xl font-light tracking-[0.18em] transition-colors duration-300"
            style={{ color: transparent ? "#fff" : FOREST, letterSpacing: "0.2em" }}
          >
            JSB Events
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const active = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className="font-body text-[11px] tracking-[0.3em] uppercase transition-all duration-300"
                style={{
                  color: active
                    ? transparent ? "#9FCFB8" : FOREST
                    : transparent
                    ? "rgba(255,255,255,0.65)"
                    : "rgba(27,46,36,0.55)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = transparent ? "#9FCFB8" : FOREST;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = active
                    ? transparent ? "#9FCFB8" : FOREST
                    : transparent
                    ? "rgba(255,255,255,0.65)"
                    : "rgba(27,46,36,0.55)";
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/contact"
            className="font-body text-[11px] tracking-[0.3em] uppercase px-6 py-2.5 transition-all duration-300"
            style={{
              border: `1px solid ${transparent ? "rgba(255,255,255,0.5)" : FOREST}`,
              color: transparent ? "#fff" : FOREST,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = FOREST;
              el.style.color = "#FAF8F3";
              el.style.borderColor = FOREST;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color = transparent ? "#fff" : FOREST;
              el.style.borderColor = transparent ? "rgba(255,255,255,0.5)" : FOREST;
            }}
          >
            Book Now
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden transition-colors"
          style={{ color: transparent ? "#fff" : FOREST }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            background: "rgba(250,248,243,0.98)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(27,58,45,0.1)",
          }}
        >
          <div className="flex flex-col items-center gap-7 py-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-body text-[11px] tracking-[0.35em] uppercase transition-colors"
                style={{
                  color: location.pathname === link.href ? FOREST : "rgba(27,46,36,0.5)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="font-body text-[11px] tracking-[0.35em] uppercase px-8 py-3 mt-2"
              style={{ border: `1px solid ${FOREST}`, color: FOREST }}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
