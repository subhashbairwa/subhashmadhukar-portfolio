import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, Send, ArrowUpRight } from "lucide-react";

const contactLinks = [
  {
    name: "Email",
    value: "smadhukar960@gmail.com",
    href: "mailto:smadhukar960@gmail.com",
    icon: Mail,
    color: "primary",
  },
  {
    name: "GitHub",
    value: "github.com/subhashbairwa",
    href: "https://github.com/subhashbairwa",
    icon: Github,
    color: "accent",
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/subhash-074737258",
    href: "https://www.linkedin.com/in/subhash-074737258/",
    icon: Linkedin,
    color: "primary",
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-secondary/30">
      {/* Background Elements */}
      <div className="floating-orb w-96 h-96 bg-primary/15 left-1/4 -top-48" />
      <div className="floating-orb w-80 h-80 bg-accent/15 right-1/4 -bottom-40" />

      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary text-sm font-medium uppercase tracking-widest"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mt-4"
          >
            Let's <span className="gradient-text">Connect</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto"
          >
            I'm always open to discussing new opportunities, interesting projects, or
            potential collaborations.
          </motion.p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group glass-card p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    link.color === "primary"
                      ? "bg-primary/10 group-hover:bg-primary/20"
                      : "bg-accent/10 group-hover:bg-accent/20"
                  } transition-colors`}
                >
                  <link.icon
                    className={link.color === "primary" ? "text-primary" : "text-accent"}
                    size={24}
                  />
                </div>
                <ArrowUpRight
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                  size={20}
                />
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">{link.name}</h3>
              <p className="text-muted-foreground text-sm truncate">{link.value}</p>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="mailto:smadhukar960@gmail.com"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
          >
            <Send size={20} />
            Send me a message
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;