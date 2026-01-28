import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-display font-bold gradient-text">
              Subhash Madhukar
            </span>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Built with <Heart size={14} className="text-primary" /> using React &
              Tailwind CSS
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/subhashbairwa"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/subhash-074737258/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="mailto:smadhukar960@gmail.com"
              whileHover={{ y: -2 }}
              className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={20} />
            </motion.a>
          </div>

          {/* Year */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;