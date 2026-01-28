import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Rocket, Zap, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "End-to-end application development with modern technologies",
  },
  {
    icon: Rocket,
    title: "Production Systems",
    description: "Building scalable, real-world applications",
  },
  {
    icon: Zap,
    title: "Real-Time Features",
    description: "Live updates, WebSockets, and instant communication",
  },
  {
    icon: Users,
    title: "User Experience",
    description: "Crafting premium, intuitive interfaces",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="floating-orb w-64 h-64 bg-accent/30 -right-32 top-1/2" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-primary text-sm font-medium uppercase tracking-widest"
            >
              About Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mt-4"
            >
              Passionate about{" "}
              <span className="gradient-text">building</span>
            </motion.h2>
          </div>

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 md:p-12 mb-16"
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
              Final year{" "}
              <span className="text-foreground font-medium">B.Tech Chemical Engineering</span> student at{" "}
              <span className="text-foreground font-medium">IIT Jodhpur</span>, passionate about{" "}
              <span className="text-foreground font-medium">full-stack development</span> and{" "}
              <span className="text-foreground font-medium">building scalable solutions</span>.
              Focused on problem-solving through coding and crafting{" "}
              <span className="text-foreground font-medium">high-quality applications</span>.
              Strong foundation in full-stack development, system design, and DSA.
            </p>
          </motion.div>

          {/* Highlight Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group glass-card p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;