import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import aboutImg from "@/assets/about-wedding.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 text-center bg-muted">
        <FadeIn>
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">Our Story</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-foreground mb-6">About JSB Events</h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Where elegance meets passion — crafting celebrations that reflect your unique story.
          </p>
        </FadeIn>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <div className="img-hover-zoom rounded-lg">
              <img src={aboutImg} alt="Wedding table" className="w-full h-[500px] object-cover rounded-lg" loading="lazy" />
            </div>
          </FadeIn>
          <div>
            <FadeIn delay={0.1}>
              <h2 className="font-heading text-4xl font-light text-foreground mb-6">Our Journey</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-body text-muted-foreground mb-5">
                Founded with a deep love for celebrations and an eye for detail, JSB Events has grown from a passionate dream into one of the most trusted names in luxury event planning.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-body text-muted-foreground mb-5">
                We believe every celebration is a story waiting to be told. Our team of experienced planners, designers, and coordinators work tirelessly to ensure that your vision comes to life in the most beautiful and seamless way possible.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-body text-muted-foreground">
                From intimate gatherings to grand destination weddings, we bring the same level of dedication, creativity, and professionalism to every event we touch.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="font-heading text-4xl font-light text-foreground text-center mb-16">What We Stand For</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Elegance", desc: "Every detail is curated with refined taste and timeless sophistication." },
              { title: "Personalization", desc: "No two events are the same — we design each celebration around your unique story." },
              { title: "Excellence", desc: "We hold ourselves to the highest standard in every aspect of planning and execution." },
              { title: "Creativity", desc: "We push boundaries to create visually stunning and emotionally impactful experiences." },
              { title: "Reliability", desc: "You can count on us to deliver flawlessly, so you can enjoy every moment stress-free." },
              { title: "Passion", desc: "We genuinely love what we do, and it shows in every celebration we create." },
            ].map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="bg-card p-8 rounded-lg text-center">
                  <h3 className="font-heading text-2xl text-foreground mb-3">{v.title}</h3>
                  <p className="text-body text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Vision */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <FadeIn>
              <h2 className="font-heading text-4xl font-light text-foreground mb-6">Our Vision</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body text-muted-foreground mb-5">
                To be the most sought-after wedding and event planning company, known for transforming dreams into breathtaking realities across the globe.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-body text-muted-foreground mb-8">
                We envision a world where every couple gets the celebration they truly deserve — one that reflects their love, values, and personalities in every single detail.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
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
          <FadeIn direction="right">
            <div className="grid grid-cols-2 gap-4">
              <div className="img-hover-zoom rounded-lg">
                <img src={portfolio3} alt="Reception" className="w-full h-64 object-cover rounded-lg" loading="lazy" />
              </div>
              <div className="img-hover-zoom rounded-lg mt-8">
                <img src={portfolio4} alt="Couple" className="w-full h-64 object-cover rounded-lg" loading="lazy" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
