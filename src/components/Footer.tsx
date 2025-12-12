import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/raghunandhan04/" },
  { name: "GitHub", icon: Github, url: "https://github.com/raghunandhan04" },
  { name: "Email", icon: Mail, url: "mailto:raghunandhan04@gmail.com" },
];

const quickLinks = [
  { name: "Projects", path: "/projects" },
  { name: "Publications", path: "/publications" },
  { name: "Contact", path: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="font-display text-xl font-bold text-gradient">
              Raghunandhan S
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Aspiring MS Candidate in AI/ML & Data Science. Passionate about research and building intelligent systems.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {currentYear} Raghunandhan S. Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> in Chennai
            </p>
            <p className="text-xs text-muted-foreground/60">
              Open to MS opportunities in AI/ML
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
