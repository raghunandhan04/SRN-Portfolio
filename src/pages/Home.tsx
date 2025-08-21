import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const sections = [
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Publications", path: "/publications" },
  { name: "Education", path: "/education" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gradient-to-br from-background via-muted to-card">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5 [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
      <div className="relative z-10 -mt-6 md:-mt-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wide leading-none">
          RAGHUNANDHAN S
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Welcome to my digital space. I'm a passionate developer and innovator. Explore my work and get in touch.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {sections.map((section) => (
            <Link
              key={section.name}
              to={section.path}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full h-24 text-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-primary/10 hover:text-primary"
              )}
            >
              {section.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
