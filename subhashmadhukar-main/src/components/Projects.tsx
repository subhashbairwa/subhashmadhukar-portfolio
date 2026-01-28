import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Fullstack E-commerce Platform",
    description:
      "Production-ready full-stack e-commerce system with authentication, payments, admin dashboard, inventory management, and real-time order tracking.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe", "Cloudinary"],
    liveDemo: "https://e-commercer-website-user-z7s5.vercel.app/",
    github: "https://github.com/subhashbairwa/E-commercer-website",
    gradient: "from-primary/20 to-accent/20",
  },
  {
    title: "Language Exchange Platform",
    description:
      "Real-time video calling, chat, and multilingual translation platform enabling global communication.",
    tech: ["React.js", "Zustand", "TanStack Query", "Node.js", "MongoDB", "Streamify API"],
    liveDemo: "https://video-app-usercom.vercel.app/",
    github: "https://github.com/subhashbairwa/Streamify-videoCallApp",
    gradient: "from-accent/20 to-primary/20",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="floating-orb w-80 h-80 bg-primary/20 -left-40 top-1/3" />
      <div className="floating-orb w-64 h-64 bg-accent/20 right-0 bottom-20" />

      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary text-sm font-medium uppercase tracking-widest"
          >
            Featured Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mt-4"
          >
            Production-Grade{" "}
            <span className="gradient-text">Projects</span>
          </motion.h2>
        </div>

        {/* Project Cards */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="group relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
              />
              <div className="relative glass-card p-8 md:p-10 hover:border-primary/30 transition-all duration-500">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl md:text-3xl font-display font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex gap-3">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github size={20} />
                        </a>
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-secondary rounded-full text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Live Demo Link */}
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                    >
                      View Live Demo
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;