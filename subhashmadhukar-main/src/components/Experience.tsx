import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="floating-orb w-64 h-64 bg-accent/20 -right-32 top-1/2" />

      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary text-sm font-medium uppercase tracking-widest"
          >
            Background
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mt-4"
          >
            Experience & <span className="gradient-text">Responsibility</span>
          </motion.h2>
        </div>

        {/* Experience Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

            {/* Experience Item */}
            <div className="relative pl-16">
              {/* Timeline Dot */}
              <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-primary glow-primary" />

              <div className="glass-card p-8 hover:border-primary/30 transition-all duration-300 group">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Briefcase className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl md:text-2xl">
                      Assistant Head – Intellia '23 Exhibition
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <Calendar size={16} />
                      <span className="text-sm">2023</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  Managed exhibition operations by coordinating teams, participants, and
                  logistics for smooth execution. Demonstrated strong leadership,
                  organizational, and communication skills in a high-pressure environment.
                </p>

                {/* Skills demonstrated */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {["Leadership", "Team Coordination", "Event Management", "Logistics"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm bg-secondary rounded-full text-muted-foreground"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;