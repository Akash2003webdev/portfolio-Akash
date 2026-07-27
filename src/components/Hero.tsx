import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import heroImage from "@/assets/hero-developer.jpg";
import profilePhoto from "@/assets/profile-photo.png";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // MODIFIED: Added 'text-center' to center all text content on mobile
    <section
      id="hero"
      className="min-h-screen flex items-center pt-20 md:pt-0 relative overflow-hidden z-0 text-center md:text-left"
    >
      <div
        className="absolute inset-0 z-0 backimg"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay to darken the background image (z-10) */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10"></div>

      {/* The main content div sits on top (z-20) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in text-white mx-auto md:mx-0">
            <div className="space-y-2">
              <p className="text-primary font-inter font-medium text-lg">
                Hi, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold leading-tight">
                Hari Akash
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-semibold text-gray-300">
                MERN Stack Developer
              </h2>
              <h3 className="text-xl sm:text-2xl font-outfit font-medium text-primary">
                & Freelance Web Developer
              </h3>
            </div>

            {/* Paragraph */}
            <p className="text-white/90 font-inter text-base sm:text-lg max-w-lg mx-auto md:mx-0">
              I specialize in building clean, scalable web applications and
              helping clients turn their ideas into high-quality digital
              products. I focus on modern technologies, efficient solutions, and
              seamless user experiences.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-semibold shadow-lg hover:shadow-primary/50 transition-all"
              >
                <Mail className="mr-2 h-5 w-5" />
                Hire Me
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-inter font-semibold"
                asChild
              >
                <a href="/resume.pdf" download="Akash Pandi K - Resume.pdf">
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="relative animate-slide-in-right flex flex-col items-center gap-8">
            {/* Profile Photo Container */}
            <div className="relative">
              <div className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 bg-white border-primary shadow-2xl shadow-primary/30">
                <img
                  src={profilePhoto}
                  alt="Hari Akash"
                  // CHANGED: object-cover has been replaced with object-contain
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/30 blur-3xl rounded-full animate-glow"></div>
            </div>

            {/* Developer Badge */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-card/80 backdrop-blur-sm border border-primary/30 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-white font-inter font-medium">
                  Available for Freelance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
