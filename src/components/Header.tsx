import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sections = [
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Publications", path: "/publications" },
  { name: "Certifications", path: "/certifications" },
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
          <span
            className="text-sm font-semibold px-2 py-1 rounded-md"
            style={{
              background: "rgba(128,128,128,0.3)",
              color: "#e53935",
              fontWeight: 600,
            }}
          >
            - Portfolio Website
          </span>
        </NavLink>
        <nav className="hidden md:flex items-center space-x-2">
          {sections.map((section) => {
            const href = section.path;
            return (
              <a
                key={section.name}
                href={href}
                onClick={(e) => {
                  // If this is a hash link and the section exists on the page, smooth scroll. Otherwise allow navigation.
                  if (href.startsWith('#')) {
                    const id = href.substring(1);
                    const el = document.getElementById(id);
                    if (el) {
                      e.preventDefault();
                      const header = document.querySelector('header');
                      const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;
                      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }
                }}
                className={cn(buttonVariants({ variant: "ghost" }), "text-muted-foreground")}
              >
                {section.name}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
