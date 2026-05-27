import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/jsb-logo.jpg";

/* Deep forest green footer — gold accents on dark = luxury */
const FOREST_DARK = "#0F2318";
const GOLD        = "#B8966E";

const Footer = () => (
  <footer style={{ background: FOREST_DARK, borderTop: "1px solid rgba(255,255,255,0.06)" }}>

    {/* Main footer grid */}
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

        {/* Brand */}
        <div className="md:col-span-4">
          <Link to="/" className="inline-flex items-center gap-3 mb-5">
            <img
              src={logo}
              alt="JSB Events"
              className="h-11 w-11 rounded-full object-cover"
              style={{ border: "1px solid rgba(184,150,110,0.35)" }}
            />
            <span className="font-heading text-2xl font-light tracking-[0.18em]" style={{ color: "#FAF8F3" }}>
              JSB Events
            </span>
          </Link>
          <p className="font-body text-sm leading-relaxed mb-6 max-w-xs"
            style={{ color: "rgba(250,248,243,0.38)" }}>
            Creating beautiful celebrations with elegance, creativity, and unwavering attention to detail since 2014.
          </p>
          {/* Socials */}
          <div className="flex gap-3">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Facebook,  label: "Facebook"  },
              { Icon: Twitter,   label: "Twitter"   },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300"
                style={{ border: "1px solid rgba(184,150,110,0.2)", color: "rgba(184,150,110,0.5)" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(184,150,110,0.7)";
                  el.style.color = GOLD;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(184,150,110,0.2)";
                  el.style.color = "rgba(184,150,110,0.5)";
                }}
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="md:col-span-2">
          <h4 className="font-body text-[10px] tracking-[0.4em] uppercase mb-5"
            style={{ color: "rgba(184,150,110,0.6)" }}>
            Navigate
          </h4>
          <div className="space-y-3">
            {[
              { label: "Home",     to: "/" },
              { label: "About",    to: "/about" },
              { label: "Services", to: "/services" },
              { label: "Gallery",  to: "/gallery" },
              { label: "Contact",  to: "/contact" },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block font-body text-sm transition-colors duration-300"
                style={{ color: "rgba(250,248,243,0.38)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(250,248,243,0.38)"; }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="md:col-span-3">
          <h4 className="font-body text-[10px] tracking-[0.4em] uppercase mb-5"
            style={{ color: "rgba(184,150,110,0.6)" }}>
            Services
          </h4>
          <div className="space-y-3">
            {[
              "Wedding Planning",
              "Destination Weddings",
              "Engagement Ceremonies",
              "Corporate Events",
              "Private Celebrations",
            ].map(s => (
              <p key={s} className="font-body text-sm"
                style={{ color: "rgba(250,248,243,0.38)" }}>
                {s}
              </p>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="md:col-span-3">
          <h4 className="font-body text-[10px] tracking-[0.4em] uppercase mb-5"
            style={{ color: "rgba(184,150,110,0.6)" }}>
            Contact
          </h4>
          <div className="space-y-4">
            {[
              { Icon: Phone,  text: "+91 99051 68295"     },
              { Icon: Mail,   text: "hello@jsbevents.com" },
              { Icon: MapPin, text: "New Delhi · Global"  },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <Icon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "rgba(184,150,110,0.5)" }} />
                <span className="font-body text-sm" style={{ color: "rgba(250,248,243,0.38)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>

    {/* Bottom bar */}
    <div
      className="px-6 py-5"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-body text-xs" style={{ color: "rgba(250,248,243,0.22)" }}>
          © {new Date().getFullYear()} JSB Events. All rights reserved.
        </p>
        <p className="font-body text-xs" style={{ color: "rgba(184,150,110,0.4)" }}>
          Crafting Timeless Celebrations
        </p>
      </div>
    </div>

  </footer>
);

export default Footer;
