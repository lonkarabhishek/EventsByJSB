import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import PortfolioSection from "@/components/PortfolioSection";
import VideoReelsSection from "@/components/InstagramSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />

    <div className="relative z-10 bg-background">
      <MarqueeStrip />
      <PortfolioSection />
      <VideoReelsSection />
      <ServicesSection />
      <TestimonialsSection />
      <ProcessSection />
      <AboutSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  </div>
);

export default Index;
