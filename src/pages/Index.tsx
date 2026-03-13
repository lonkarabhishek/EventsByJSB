import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import VideoReelsSection from "@/components/InstagramSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <div className="relative z-10 bg-background">
        <PortfolioSection />
        <VideoReelsSection />
        <ServicesSection />
        <TestimonialsSection />
        <ProcessSection />
        <AboutSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
