import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", eventType: "", message: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We'll be in touch within 24 hours.");
    setForm({ name: "", email: "", phone: "", date: "", eventType: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-6 text-center bg-muted">
        <FadeIn>
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">Get In Touch</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-foreground mb-6">Contact Us</h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear about your upcoming celebration. Let's start a conversation.
          </p>
        </FadeIn>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-16">
          {/* Form */}
          <div className="md:col-span-3">
            <FadeIn>
              <h2 className="font-heading text-3xl font-light text-foreground mb-2">Send Us a Message</h2>
              <p className="text-body text-sm text-muted-foreground mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input type="text" placeholder="Your Name *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-5 py-3.5 bg-muted border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
                  <input type="email" placeholder="Email Address *" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-5 py-3.5 bg-muted border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-5 py-3.5 bg-muted border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-5 py-3.5 bg-muted border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
                </div>
                <select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} className="w-full px-5 py-3.5 bg-muted border border-border rounded-lg font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all">
                  <option value="">Select Event Type</option>
                  <option value="wedding">Wedding</option>
                  <option value="destination">Destination Wedding</option>
                  <option value="engagement">Engagement</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="private">Private Celebration</option>
                </select>
                <textarea placeholder="Tell us about your dream event... *" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-5 py-3.5 bg-muted border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none" />
                <button type="submit" className="w-full sm:w-auto px-10 py-3.5 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary/90 transition-colors duration-300">
                  Send Inquiry
                </button>
              </form>
            </FadeIn>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2">
            <FadeIn direction="right">
              <div className="bg-muted rounded-lg p-8 space-y-8">
                <h3 className="font-heading text-2xl text-foreground">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-body text-sm font-medium text-foreground">Phone</p>
                      <p className="text-body text-sm text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-body text-sm font-medium text-foreground">Email</p>
                      <p className="text-body text-sm text-muted-foreground">hello@jsbevents.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-body text-sm font-medium text-foreground">Office</p>
                      <p className="text-body text-sm text-muted-foreground">Mumbai, Maharashtra, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-body text-sm font-medium text-foreground">Working Hours</p>
                      <p className="text-body text-sm text-muted-foreground">Mon – Sat: 10 AM – 7 PM</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="font-heading text-lg text-foreground mb-3">Follow Us</h4>
                  <p className="text-body text-sm text-muted-foreground">
                    Stay connected with us on social media for inspiration, behind-the-scenes content, and more.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
