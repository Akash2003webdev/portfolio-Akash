import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, Send, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { motion, Variants } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  // Added loading state for a premium user experience
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_h9tpssq", // your EmailJS service ID
        "template_i224e2f", // your EmailJS template ID
        templateParams,
        "O3bzTePxzglEpBwbj" // your EmailJS public key
      )
      .then(() => {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to send message. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      url: "https://github.com/Akash2003webdev",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/akash-pandi-238a73376?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      url: "mailto:hariakash418@gmail.com",
    },
  ];

  // Framer Motion Variants
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
    <section id="contact" className="relative py-24 md:py-32 bg-[#030712] overflow-hidden z-0">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 md:mb-20 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-gray-300 tracking-wide uppercase">
                Let's Talk
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-extrabold text-white mb-6 tracking-tight">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Touch</span>
            </h2>
            
            <p className="text-gray-400 font-inter text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Available for freelance projects, technical consulting, and exciting full-stack opportunities. Let's build something great.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="p-8 md:p-10 bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl relative overflow-hidden rounded-3xl">
                {/* Subtle internal glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-gray-300 font-inter font-medium text-sm">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-black/20 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all h-12 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-gray-300 font-inter font-medium text-sm">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-black/20 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-gray-300 font-inter font-medium text-sm">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, timeline, and goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="bg-black/20 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 resize-none transition-all rounded-xl p-4"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-semibold rounded-xl shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-1 active:translate-y-0 text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Social Links & Info */}
            <motion.div variants={containerVariants} className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10 rounded-3xl shadow-xl hover:border-primary/30 transition-colors duration-500">
                  <h3 className="text-white font-outfit font-bold text-xl mb-6">
                    Connect With Me
                  </h3>
                  <div className="space-y-4">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 p-4 rounded-xl bg-black/20 border border-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all group"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                          {link.icon}
                        </div>
                        <span className="text-gray-300 font-inter font-medium group-hover:text-white transition-colors">
                          {link.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </Card>
              </motion.div>

            </motion.div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;