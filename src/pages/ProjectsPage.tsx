import { useRef, useState, memo, useCallback, useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Github, ExternalLink, Folder } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

interface Project {
  title: string;
  subtitle?: string;
  description: string;
  detailedDescription: string;
  tech: string[];
  tags: string[];
  link?: string;
  hasGitHub?: boolean;
  organization?: string;
}

const projects: Project[] = [
  {
    title: "E-commerce Website for Apparel Store",
    description: "A modern responsive e-commerce web app built using TypeScript and React.",
    detailedDescription: "Developed a comprehensive e-commerce platform for an apparel store featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Built with modern React patterns, TypeScript for type safety, and responsive design for optimal user experience across all devices.",
    tech: ["TypeScript", "React", "E-commerce"],
    tags: ["Frontend", "E-commerce"],
    link: "https://github.com/raghunandhan04/E-commerce-Website-for-Apparel-Store",
    hasGitHub: true
  },
  {
    title: "Deep Learning based Smart BTMS for EV Batteries",
    subtitle: "Final Year Project",
    description: "Machine learning model for predictive maintenance in industrial equipment",
    detailedDescription: "Developed a comprehensive machine learning solution for predictive maintenance in industrial settings. The system analyzes sensor data, equipment performance metrics, and historical maintenance records to predict potential failures before they occur. Implemented using advanced algorithms including Random Forest, LSTM neural networks, and ensemble methods to achieve high accuracy in failure prediction.",
    tech: ["Python", "TensorFlow", "Deep Learning", "CNN", "Matlab", "Ansys"],
    tags: ["ML", "Industrial"],
    organization: "Madras Institute of Technology, Anna University"
  },
  {
    title: "DNS Server Project",
    description: "Custom DNS server implementation with advanced routing capabilities",
    detailedDescription: "Built a high-performance DNS server from scratch with advanced routing and caching mechanisms. Features include custom domain resolution, load balancing, security filters, and real-time monitoring.",
    tech: ["Python", "Networking"],
    tags: ["Networking", "Backend"],
    organization: "HCL Technologies"
  },
  {
    title: ".NET Code Coverage Tool",
    description: "Tool for analyzing and improving code coverage in .NET applications",
    detailedDescription: "Developed a comprehensive code coverage analysis tool for .NET applications that provides detailed insights into test coverage, identifies untested code paths, and generates actionable reports.",
    tech: [".NET", "C#", "Testing"],
    tags: ["Testing", "DevTools"],
    organization: "HCL Technologies"
  },
  {
    title: "Cycle Time Reduction Tool",
    description: "Tool to optimize and reduce development cycle times",
    detailedDescription: "Created an automated tool that analyzes development workflows, identifies bottlenecks, and suggests optimizations to reduce cycle times. Combined RFID-based tracking with data analysis.",
    tech: ["Python", "Data Analysis", "RFID"],
    tags: ["Optimization", "DevOps"],
    organization: "Ashok Leyland"
  },
  {
    title: "Sentiment Analysis using TensorFlow",
    description: "NLP model for sentiment analysis using deep learning",
    detailedDescription: "Implemented a sophisticated sentiment analysis system using TensorFlow and advanced NLP techniques. Achieved 94% accuracy on benchmark datasets using transformer architectures.",
    tech: ["Python", "TensorFlow", "NLP"],
    tags: ["ML", "NLP"]
  },
  {
    title: "AI-Powered No-Code/Low-Code Platform Evaluation",
    description: "Exploration of modern AI-assisted no/low-code platforms",
    detailedDescription: "Evaluated AI-powered no/low-code platforms (Lovable, Rocket, Bolt, Windsurf, Cursor) for rapid prototyping and enterprise feasibility. Assessed developer experience, extensibility, and security considerations.",
    tech: ["Lovable", "Rocket", "Bolt", "Windsurf", "Cursor"],
    tags: ["Evaluation", "AI Tools"],
    organization: "Hibiz Solutions"
  },
  {
    title: "Multilingual CMS Platform",
    description: "Full-stack multilingual CMS with real-time content updates",
    detailedDescription: "Built a multilingual CMS platform to host and manage product/solution content. Developed custom admin dashboards enabling non-technical staff to perform real-time content updates.",
    tech: ["TypeScript", "React", "HTML", "CSS"],
    tags: ["Full-Stack", "CMS"],
    organization: "Hibiz Solutions"
  },
  {
    title: "AI Tool for CAD Drawing Validation",
    description: "AI-enabled tool for CAD compliance checking",
    detailedDescription: "Created an AI-enabled tool that compares and validates compliance of engineering CAD drawings using OCR and computer vision. Automated extraction and matching of drawing annotations.",
    tech: ["Python", "OCR", "Computer Vision", "Tesseract"],
    tags: ["AI", "CAD"],
    organization: "ZF Global Engineering Centre"
  }
];

const ProjectCard = memo(function ProjectCard({ 
  project, 
  index,
  isExpanded,
  onToggle,
  cardRef
}: { 
  project: Project; 
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const handleGitHubClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.link) window.open(project.link, '_blank');
  }, [project.link]);

  return (
    <Reveal delay={Math.min(index * 0.03, 0.15)}>
      <article
        ref={cardRef}
        className="group relative glass rounded-2xl border border-border/50 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-primary/50"
        onClick={onToggle}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
      >
        {/* Gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
        
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Folder className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-gradient transition-all duration-300 line-clamp-2">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-sm text-primary mt-1">{project.subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {project.hasGitHub && (
                <button
                  className="p-2 rounded-lg bg-muted/50 hover:bg-primary/20 transition-colors hover:scale-110 active:scale-95"
                  onClick={handleGitHubClick}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github className="w-4 h-4" />
                </button>
              )}
              <div
                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <p className="text-foreground/70 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Expanded content */}
          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-foreground/70 text-sm leading-relaxed mb-4">
              {project.detailedDescription}
            </p>
            
            {project.organization && (
              <p className="text-sm text-muted-foreground mb-4">
                <span className="text-primary font-medium">Organization:</span> {project.organization}
              </p>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-4"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                View Repository
              </a>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies">
              {project.tech.slice(0, isExpanded ? undefined : 4).map((tech) => (
                <Badge 
                  key={tech} 
                  variant="outline" 
                  className="text-xs bg-muted/50 border-border/50 hover:border-primary/50 transition-colors"
                  role="listitem"
                >
                  {tech}
                </Badge>
              ))}
              {!isExpanded && project.tech.length > 4 && (
                <Badge variant="outline" className="text-xs bg-muted/50 border-border/50">
                  +{project.tech.length - 4}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Tags">
              {project.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  className="text-xs bg-primary/10 text-primary border-0"
                  role="listitem"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {!isExpanded && (
            <p className="text-xs text-muted-foreground mt-4">
              Click to expand
            </p>
          )}
        </div>
      </article>
    </Reveal>
  );
});

function ProjectsPage() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleExpandToggle = useCallback((index: number) => {
    const willExpand = expandedProject !== index;
    setExpandedProject(willExpand ? index : null);
    
    if (willExpand) {
      setTimeout(() => {
        const el = cardRefs.current[index];
        if (!el) return;
        const navHeight = 80;
        const rect = el.getBoundingClientRect();
        const offsetTop = rect.top + window.pageYOffset - navHeight - 12;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }, 0);
    }
  }, [expandedProject]);

  const renderedProjects = useMemo(() => 
    projects.map((project, index) => (
      <ProjectCard 
        key={project.title}
        project={project} 
        index={index}
        isExpanded={expandedProject === index}
        onToggle={() => handleExpandToggle(index)}
        cardRef={(el) => { cardRefs.current[index] = el; }}
      />
    )), 
  [expandedProject, handleExpandToggle]);

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" aria-labelledby="projects-heading">
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-16">
            <h1 id="projects-heading" className="font-display text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">Featured Projects</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of my work spanning AI/ML, web development, and industrial applications
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" aria-hidden="true" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderedProjects}
        </div>
      </div>
    </section>
  );
}

export default memo(ProjectsPage);
