import { Card } from "@/components/ui/card";
import { Code2, Database, Globe, GitBranch, Smartphone, Cloud, Layers } from "lucide-react";
import { motion, Variants } from "framer-motion";

const Skills = () => {
  // Upgraded skills list reflecting a modern, high-end full-stack profile
  const skills = [
    {
      icon: <Globe className="h-7 w-7" />,
      name: "React & Next.js",
      description: "Server-side rendering, modern hooks & component architecture.",
    },
    {
      icon: <Layers className="h-7 w-7" />,
      name: "Tailwind CSS",
      description: "Utility-first responsive styling, animations & clean UI.",
    },
    {
      icon: <Cloud className="h-7 w-7" />,
      name: "Node.js & Express",
      description: "RESTful APIs, middleware & scalable backend services.",
    },
    {
      icon: <Database className="h-7 w-7" />,
      name: "MongoDB & Supabase",
      description: "NoSQL, relational schema layouts & real-time sync engines.",
    },
    {
      icon: <Smartphone className="h-7 w-7" />,
      name: "Flutter",
      description: "Cross-platform mobile application engineering & UI design.",
    },
    {
      icon: <Code2 className="h-7 w-7" />,
      name: "JavaScript / ES6+",
      description: "Asynchronous programming & dynamic DOM manipulation.",
    },
    {
      icon: <GitBranch className="h-7 w-7" />,
      name: "Git & GitHub",
      description: "Version control, branching strategies & collaborative workflows.",
    },
    {
      icon: <Cloud className="h-7 w-7" />,
      name: "API Architecture",
      description: "System design, edge functions & third-party integrations.",
    },
    {
      icon: <Smartphone className="h-7 w-7" />,
      name: "Responsive Design",
      description: "Mobile-first layouts ensuring cross-browser compatibility.",
    },
  ];

  // Framer Motion Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-[#030712] overflow-hidden z-0">
      
      {/* Subtle Background Glows for Depth */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 md:mb-24 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-gray-300 tracking-wide uppercase">
                My Expertise
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-extrabold text-white mb-6 tracking-tight">
              Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Technologies</span>
            </h2>
            
            <p className="text-gray-400 font-inter text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              A comprehensive, modern toolkit designed for building scalable, high-performance full-stack applications.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {skills.map((skill, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group relative h-full p-8 bg-white/5 backdrop-blur-md border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden">
                  
                  {/* Hover Gradient Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  
                  <div className="flex flex-col space-y-5">
                    {/* Icon Container with Glow */}
                    <div className="relative w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
                      {skill.icon}
                      <div className="absolute inset-0 bg-primary/40 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Text Content */}
                    <div>
                      <h3 className="text-white font-outfit font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-gray-400 font-inter text-base leading-relaxed group-hover:text-gray-300 transition-colors">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Skills;