import { Button } from "@/components/ui/button";
import { Download, Mail, Sparkles, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-developer.jpg";
import profilePhoto from "@/assets/profile-photo.png";
import { motion, Variants } from "framer-motion";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants for staggered rendering typed with Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 md:pt-0 overflow-hidden bg-[#030712] z-0"
    >
      {/* Background Image & Premium Overlays */}
      <div
        className="absolute inset-0 z-0 opacity-100 mix-blend-luminosity"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Deep gradient overlay for better text readability and modern vibe */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#030712]/80 via-[#030712]/90 to-[#030712]"></div>
      
      {/* Subtle glowing orb effect in the background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0"
          >
            {/* Modern Availability Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-300 tracking-wide uppercase">
                Available for Freelance
              </span>
            </motion.div>

            {/* Typography */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-primary font-inter font-medium text-lg flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-5 h-5" /> Hi, I'm
              </h2>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-outfit font-extrabold tracking-tight text-white">
                Hari Akash
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 pb-2">
                MERN Stack Developer
              </h2>
            </motion.div>

            {/* Paragraph */}
            <motion.p variants={itemVariants} className="text-gray-400 font-inter text-lg sm:text-xl leading-relaxed max-w-lg">
              I build clean, scalable web applications, transforming complex ideas into elegant, high-performance digital experiences.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-2">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="group relative overflow-hidden rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-semibold px-8 py-6 transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center">
                  Hire Me
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm font-inter font-semibold px-8 py-6 transition-all hover:scale-105 active:scale-95"
                asChild
              >
                <a href="/resume.pdf" download="Hari Akash - Resume.pdf">
                  <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center items-center lg:ml-auto"
          >
            {/* Animated Background Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] rounded-full border border-dashed border-primary/30"
            />
            
            {/* Profile Photo Container (Floating Animation) */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 z-10"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-1">
                <div className="w-full h-full rounded-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center p-2">
                  <img
                    src={profilePhoto}
                    alt="Hari Akash"
                    className="w-full h-full rounded-full object-contain filter contrast-125 saturate-110"
                  />
                </div>
              </div>
              
              {/* Image Glow */}
              <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 rounded-full"></div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;