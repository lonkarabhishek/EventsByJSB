import FadeIn from "@/components/FadeIn";
import aboutImg from "@/assets/about-wedding.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <FadeIn direction="left">
          <div className="img-hover-zoom rounded-lg">
            <img
              src={aboutImg}
              alt="Elegant wedding table setting"
              className="w-full h-[500px] object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </FadeIn>

        <div>
          <FadeIn delay={0.1}>
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
              About Us
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">
              Crafting Moments That Last Forever
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-body text-muted-foreground mb-6">
              We craft unforgettable celebrations with elegance, creativity, and attention to every detail. At JSB Events, we believe every love story deserves a celebration as unique as the couple themselves.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-body text-muted-foreground mb-8">
              With years of experience in luxury wedding and event planning, our team brings together artistry, precision, and passion to create seamless, breathtaking experiences that you and your guests will cherish forever.
            </p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="flex gap-12">
              <div>
                <p className="font-heading text-4xl text-primary font-light">200+</p>
                <p className="text-body text-sm text-muted-foreground mt-1">Events Planned</p>
              </div>
              <div>
                <p className="font-heading text-4xl text-primary font-light">8+</p>
                <p className="text-body text-sm text-muted-foreground mt-1">Years Experience</p>
              </div>
              <div>
                <p className="font-heading text-4xl text-primary font-light">50+</p>
                <p className="text-body text-sm text-muted-foreground mt-1">Destinations</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
