import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sections = [
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Publications", path: "/publications" },
  { name: "Education", path: "/education" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-14 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold flex items-center gap-2" aria-label="Home">
          <span>Raghunandhan S</span>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
            - Portfolio Website
          </span>
        </NavLink>
        <nav className="hidden md:flex items-center space-x-2">
          {sections.map((section) => (
            <NavLink
              key={section.name}
              to={section.path}
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-muted-foreground",
                  isActive && "text-foreground"
                )
              }
            >
              {section.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
