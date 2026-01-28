import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Programming",
    skills: ["JavaScript", "Python", "C/C++", "TypeScript"],
    color: "primary",
  },
  {
    title: "Backend & Systems",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Async Programming",
      "Modular Architecture",
      "Real-Time Systems",
    ],
    color: "accent",
  },
  {
    title: "Frontend & UX",
    skills: ["React.js", "Tailwind CSS", "Responsive Design", "UX Optimization"],
    color: "primary",
  },
  {
    title: "Databases",
    skills: ["MongoDB", "PostgreSQL", "MySQL"],
    color: "accent",
  },
  {
    title: "AI & Data",
    skills: [
      "AI Coding Assistants",
      "Prompt Engineering",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "EDA",
      "Data Visualization",
    ],
    color: "primary",
  },
  {
    title: "Cloud & Tools",
    skills: [
      "Git",
      "GitHub",
      "Cloudinary",
      "Vercel",
      "Render",
      "Deployment Automation",
      "Production Debugging",
    ],
    color: "accent",
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-secondary/30">
      {/* Background Elements */}
      <div className="floating-orb w-96 h-96 bg-primary/10 left-1/4 top-0" />
      <div className="floating-orb w-72 h-72 bg-accent/10 right-1/4 bottom-0" />

      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary text-sm font-medium uppercase tracking-widest"
          >
            Technical Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mt-4"
          >
            Skills & <span className="gradient-text">Technologies</span>
          </motion.h2>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
              className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="font-display font-semibold text-xl mb-4 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    category.color === "primary" ? "bg-primary" : "bg-accent"
                  }`}
                />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-3 py-1.5 text-sm rounded-lg cursor-default transition-colors ${
                      category.color === "primary"
                        ? "bg-primary/10 text-primary hover:bg-primary/20"
                        : "bg-accent/10 text-accent hover:bg-accent/20"
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;