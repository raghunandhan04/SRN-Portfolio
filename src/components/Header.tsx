import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sections = [
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Experience", path: "/experience" },
  { name: "Education", path: "/education" },
  { name: "Certifications", path: "/certifications" },
  { name: "Publications", path: "/publications" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink 
            to="/" 
            className="font-display text-xl sm:text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Raghunandhan S
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {sections.map((section) => (
              <NavLink
                key={section.name}
                to={section.path}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )
                }
              >
                {section.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {sections.map((section) => (
              <NavLink
                key={section.name}
                to={section.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3 text-base font-medium transition-colors hover:text-primary rounded-md",
                    isActive ? "text-primary bg-primary/5" : "text-foreground"
                  )
                }
              >
                {section.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
