import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle } from "lucide-react";

// ✅ Get your FREE access key at https://web3forms.com (just enter your email)
const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", eventType: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Inquiry from ${form.name} — JSB Events`,
          from_name: "JSB Events Website",
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          event_date: form.date || "Not specified",
          event_type: form.eventType || "Not specified",
          message: form.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", date: "", eventType: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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

            {status === "success" ? (
              <FadeIn>
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-heading text-2xl text-foreground mb-2">Message Sent!</h3>
                  <p className="text-body text-sm text-muted-foreground mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </FadeIn>
            ) : (
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

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-500 text-sm font-body">
                      <AlertCircle className="w-4 h-4" />
                      Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto px-10 py-3.5 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary/90 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              </FadeIn>
            )}
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
                      <a href="tel:+919999999999" className="text-body text-sm text-muted-foreground hover:text-primary transition-colors">+91 99999 99999</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-body text-sm font-medium text-foreground">Email</p>
                      <a href="mailto:hello@jsbevents.com" className="text-body text-sm text-muted-foreground hover:text-primary transition-colors">hello@jsbevents.com</a>
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
                  <div className="flex gap-4">
                    <a href="https://instagram.com/eventsbyjsb" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </a>
                  </div>
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
