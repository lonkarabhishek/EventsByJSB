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
              About JSB Events
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">
              Our Journey
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-body text-muted-foreground mb-6">
              Founded in 2014 in Patna, Bihar by Jagdeep Singh Bagga, JSB Events has become a trusted name in crafting unforgettable experiences. With a passion for excellence, we've expanded our expertise to cities like Delhi, Jaipur, Udaipur, and Kolkata, making every event truly exceptional.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-body text-muted-foreground mb-8">
              We are your reliable expert for planning destination weddings and milestone celebrations. With expertise in destination weddings across India, we handle every detail seamlessly. Our in-house team manages everything — from vendor coordination and catering to bespoke décor design — ensuring a stress-free and stunning experience from start to finish.
            </p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="flex gap-12">
              <div>
                <p className="font-heading text-4xl text-primary font-light">200+</p>
                <p className="text-body text-sm text-muted-foreground mt-1">Events Planned</p>
              </div>
              <div>
                <p className="font-heading text-4xl text-primary font-light">10+</p>
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
