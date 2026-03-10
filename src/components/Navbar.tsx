import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/jsb-logo.jpg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = !scrolled && isHome ? "text-primary-foreground" : "text-foreground";
  const textHover = !scrolled && isHome ? "hover:text-primary-foreground/70" : "hover:text-primary";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="JSB Events" className="h-12 w-12 rounded-full object-cover" />
          <span className={`font-heading text-2xl font-light tracking-wider transition-colors duration-300 ${scrolled || !isHome ? "text-foreground" : "text-primary-foreground"}`}>
            JSB Events
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-body font-light tracking-widest uppercase transition-colors duration-300 ${
                location.pathname === link.href
                  ? (scrolled || !isHome ? "text-primary" : "text-primary-foreground")
                  : (scrolled || !isHome ? "text-foreground/70 hover:text-primary" : "text-primary-foreground/70 hover:text-primary-foreground")
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-body tracking-widest uppercase rounded-full hover:bg-primary/90 transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden transition-colors ${scrolled || !isHome ? "text-foreground" : "text-primary-foreground"}`}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-sm border-t border-border">
          <div className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-body font-light tracking-widest uppercase ${
                  location.pathname === link.href ? "text-primary" : "text-foreground/70 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-2.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase rounded-full"
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
