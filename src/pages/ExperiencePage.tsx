import { useState, memo, useCallback, useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import { Briefcase, ChevronDown, MapPin, Calendar } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { motion, AnimatePresence } from "framer-motion";

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  projects?: { name: string; desc: string }[];
}

const experiences: Experience[] = [
  {
    id: 'hibiz',
    title: "Systems Analyst/Developer",
    company: "Hibiz Solutions",
    period: "June 2025 - November 2025",
    location: "Perungudi, Chennai",
    description: "Developing and maintaining enterprise-level applications, analyzing system requirements, and implementing efficient solutions using modern technologies and frameworks.",
    technologies: []
  },
  {
    id: 'zf-gec',
    title: "Project Intern",
    company: "ZF GEC (Global Engineering Center) - COE Team",
    period: "Feb 2025 - May 2025",
    location: "DLF, Porur, Chennai",
    description: "AI-enabled tool for comparing and validating the compliance of CAD drawings",
    technologies: ['Python', 'NLP', 'Computer Vision', 'HTML', 'CSS', 'OCR', 'pytesseract']
  },
  {
    id: 'hcl',
    title: "Intern - Software Development",
    company: "HCL Technologies",
    period: "July 2024 - Aug 2024",
    location: "Ambattur, Chennai",
    description: "Developed code coverage analysis tool for .NET applications and built a dynamic DNS server solution.",
    technologies: ['.NET SDK', 'Coverlet', 'Python', 'DNS Server', 'Flask', 'Django'],
    projects: [
      { name: "Code Coverage Tool", desc: "Comprehensive code coverage analysis for .NET applications" },
      { name: "Dynamic DNS Server", desc: "DNS server solution to address application downtime issues" }
    ]
  },
  {
    id: 'ashok',
    title: "Internship Trainee",
    company: "Ashok Leyland",
    period: "June 2023 - July 2023",
    location: "Ennore, Chennai",
    description: "Cycle Time Calculation and Reduction tool - Developed a comprehensive tool for calculating and optimizing cycle times in automotive manufacturing processes.",
    technologies: ['Ms Excel', 'RFID', 'Cycle Time Calculation']
  }
];

const ExperienceCard = memo(function ExperienceCard({ 
  exp, 
  index,
  isExpanded,
  onToggle
}: { 
  exp: Experience; 
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <Reveal delay={Math.min(index * 0.08, 0.25)}>
      <motion.article
        className="relative md:ml-16"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Timeline dot */}
        <div 
          className="absolute -left-[52px] top-6 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent hidden md:block ring-4 ring-background" 
          aria-hidden="true"
        />

        <div 
          className="glass rounded-2xl border border-border/50 overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-primary/50"
          onClick={onToggle}
          onKeyDown={(e) => e.key === 'Enter' && onToggle()}
          tabIndex={0}
          role="button"
          aria-expanded={isExpanded}
          aria-controls={`exp-details-${exp.id}`}
        >
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-primary font-medium mb-2">{exp.company}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <time>{exp.period}</time>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex-shrink-0"
                aria-hidden="true"
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  id={`exp-details-${exp.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-border/50 space-y-4">
                    <p className="text-foreground/80 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    {exp.projects && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Projects:</h4>
                        {exp.projects.map((project) => (
                          <div key={project.name} className="pl-4 border-l-2 border-primary/30">
                            <p className="font-medium text-foreground">{project.name}</p>
                            <p className="text-sm text-muted-foreground">{project.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {exp.technologies.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                          {exp.technologies.map((tech) => (
                            <Badge 
                              key={tech} 
                              variant="secondary" 
                              className="bg-primary/10 text-primary hover:bg-primary/20"
                              role="listitem"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
});

function ExperiencePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  const renderedExperiences = useMemo(() => 
    experiences.map((exp, index) => (
      <ExperienceCard 
        key={exp.id} 
        exp={exp} 
        index={index}
        isExpanded={expandedId === exp.id}
        onToggle={() => handleToggle(exp.id)}
      />
    )), 
  [expandedId, handleToggle]);

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" aria-labelledby="experience-heading">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div className="text-center mb-16">
            <h1 id="experience-heading" className="font-display text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">Experience</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional journey across software development and engineering
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" aria-hidden="true" />
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative" role="list" aria-label="Experience timeline">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 hidden md:block" aria-hidden="true" />

          <div className="space-y-6">
            {renderedExperiences}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ExperiencePage);
