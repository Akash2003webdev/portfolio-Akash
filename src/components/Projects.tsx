import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Github, Loader2, FolderGit2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion, Variants } from "framer-motion";

type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tech: string[];
  live_url: string | null;
  github_url: string | null;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data) {
        setProjects(data as Project[]);
      }
      setLoading(false);
    };

    loadProjects();
  }, []);

  // Framer Motion Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
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
    <section id="projects" className="relative py-24 md:py-32 bg-[#030712] overflow-hidden z-0">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

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
              <FolderGit2 className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-gray-300 tracking-wide uppercase">
                Portfolio
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-extrabold text-white mb-6 tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Projects</span>
            </h2>
            
            <p className="text-gray-400 font-inter text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              A curated showcase of my recent full-stack builds, highlighting technical architecture and user-centric design.
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col items-center justify-center py-20 space-y-4"
            >
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-gray-400 font-inter font-medium animate-pulse">Fetching projects...</p>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && projects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-center py-20 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-2xl mx-auto"
            >
              <FolderGit2 className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
              <h3 className="text-white font-outfit text-xl font-semibold mb-2">No Projects Found</h3>
              <p className="text-gray-400 font-inter">New case studies are currently being deployed. Check back soon.</p>
            </motion.div>
          )}

          {/* Projects Grid */}
          {!loading && projects.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12"
            >
              {projects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <Card className="group flex flex-col h-full overflow-hidden bg-white/5 backdrop-blur-lg border-white/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 rounded-3xl">
                    
                    {/* Project Image */}
                    {project.image_url ? (
                      <div className="relative overflow-hidden aspect-video w-full bg-[#0a0a0a]">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
                        />
                        {/* Premium gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                      </div>
                    ) : (
                      // Fallback if no image is provided
                      <div className="relative overflow-hidden aspect-video w-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                        <FolderGit2 className="w-16 h-16 text-white/20" />
                      </div>
                    )}

                    {/* Project Content */}
                    <div className="flex flex-col flex-grow p-8">
                      <h3 className="text-white font-outfit font-bold text-2xl mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-gray-400 font-inter text-base leading-relaxed mb-6 flex-grow">
                        {project.description}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1.5 text-xs font-inter font-medium bg-white/5 text-gray-300 rounded-full border border-white/10 backdrop-blur-sm group-hover:border-primary/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4 mt-auto">
                        {project.live_url && (
                          <Button
                            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-semibold px-6 transition-all hover:scale-105 active:scale-95"
                            asChild
                          >
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.github_url && (
                          <Button
                            variant="outline"
                            className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm font-inter font-semibold px-6 transition-all hover:scale-105 active:scale-95"
                            asChild
                          >
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="mr-2 h-4 w-4" />
                              Source Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;