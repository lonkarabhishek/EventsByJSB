import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/jsb-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="JSB Events" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-heading text-xl font-light text-primary-foreground tracking-wider">JSB Events</span>
            </Link>
            <p className="text-sm text-primary-foreground/60 font-body font-light leading-relaxed">
              Creating beautiful celebrations with elegance, creativity, and love.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg text-primary-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Gallery", to: "/gallery" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors font-body">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading text-lg text-primary-foreground mb-4">Services</h4>
            <div className="space-y-2">
              {["Wedding Planning", "Destination Weddings", "Engagement Ceremonies", "Corporate Events", "Private Celebrations"].map((s) => (
                <p key={s} className="text-sm text-primary-foreground/60 font-body">{s}</p>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading text-lg text-primary-foreground mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-primary-foreground/60 transition-colors">
                  <Icon className="w-4 h-4 text-primary-foreground/60" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-sm text-primary-foreground/40 font-body">© {new Date().getFullYear()} JSB Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
