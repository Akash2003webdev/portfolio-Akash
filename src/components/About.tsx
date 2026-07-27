import { Code2, Lightbulb, Zap, Target, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";

const About = () => {
  const highlights = [
    {
      icon: <Code2 className="h-7 w-7" />,
      title: "MERN Stack Developer",
      description: "Full-stack expertise in MongoDB, Express, React, and Node.js.",
    },
    {
      icon: <Target className="h-7 w-7" />,
      title: "Clean Code Enthusiast",
      description: "Writing maintainable, secure, and highly scalable code solutions.",
    },
    {
      icon: <Lightbulb className="h-7 w-7" />,
      title: "Problem Solver",
      description: "Delivering creative, efficient approaches to complex technical architecture.",
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: "Rapid Adapter",
      description: "Quickly mastering new technologies, frameworks, and deployment strategies.",
    },
  ];

  // Framer Motion Variants for smooth scroll animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#030712] overflow-hidden z-0">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 md:mb-20 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl">
              <User className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-gray-300 tracking-wide uppercase">
                Discover
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-extrabold text-white mb-6 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Me</span>
            </h2>
          </motion.div>

          {/* Content Wrapper */}
          <div className="space-y-16">
            
            {/* Bio Section */}
            <motion.div 
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="relative p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
                {/* Decorative quote marks */}
                <span className="absolute top-4 left-6 text-6xl text-primary/20 font-serif leading-none hover:text-primary/40 transition-colors pointer-events-none">"</span>
                
                <p className="relative z-10 text-gray-300 font-inter text-lg md:text-xl leading-relaxed mb-6">
                  I am a dedicated MERN Stack Developer with a strong focus on engineering clean, scalable, and modern web applications. I specialize in bridging the gap between complex backend logic and seamless, user-friendly frontend interfaces.
                </p>
                <p className="relative z-10 text-gray-400 font-inter text-base md:text-lg leading-relaxed">
                  Whether developing from scratch or optimizing existing platforms, my goal is to turn innovative ideas into highly functional digital products that deliver real value to users and clients globally.
                </p>
              </div>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {highlights.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="group h-full p-8 bg-white/5 backdrop-blur-md border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden relative">
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    
                    <div className="flex flex-col h-full">
                      <div className="relative w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6 shadow-inner">
                        {item.icon}
                        <div className="absolute inset-0 bg-primary/40 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <h3 className="text-white font-outfit font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 font-inter text-sm md:text-base leading-relaxed mt-auto group-hover:text-gray-300 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;