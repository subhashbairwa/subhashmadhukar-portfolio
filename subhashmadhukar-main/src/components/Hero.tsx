import { motion } from "framer-motion";
import { ArrowDown, Github, FileText, Eye, Code } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Building real-world, production-grade applications with scalable backend systems, real-time features, and premium UI experiences.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      
      {/* Floating Orbs */}
      <div className="floating-orb w-96 h-96 bg-primary top-20 -left-48 animate-float" />
      <div className="floating-orb w-80 h-80 bg-accent bottom-20 -right-40 animate-float-delayed" />
      <div className="floating-orb w-64 h-64 bg-primary/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Profile Photo - Left Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-64 h-64 md:w-72 md:h-72 flex-shrink-0"
            >
              {/* Colorful Border Gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary p-1">
                <img
                  src="/profile-portfolio.jpeg"
                  alt="Subhash Madhukar"
                  className="w-full h-full rounded-full object-cover bg-secondary"
                />
              </div>
            </motion.div>

            {/* Content - Right Side */}
            <div className="flex-1 text-center md:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8"
              >
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Available for opportunities</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4"
              >
                <span className="gradient-text">Subhash</span>
                <br />
                <span className="text-foreground">Madhukar</span>
              </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-6"
          >
            Entry-Level Product Engineer | Full Stack Developer
          </motion.p>

          {/* Typing Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {displayedText}
              <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center md:justify-start gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
            >
              <Eye size={18} />
              View Projects
            </a>
            <a
              href="https://github.com/subhashbairwa"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:scale-105"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href="https://drive.google.com/file/d/1jzujBiTZ7aeFfGXcdIPa5EPHDBeLwE-3/view?usp=sharing"
              className="group inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full font-medium text-foreground transition-all duration-300 hover:border-accent/50 hover:scale-105"
            >
              <FileText size={18} />
              Download Resume
            </a>
            <a
              href="https://leetcode.com/u/subhashMadhukar/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:scale-105"
            >
              <Code size={18} />
              LeetCode
            </a>
          </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;