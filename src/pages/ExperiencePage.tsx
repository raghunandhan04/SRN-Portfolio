import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Briefcase, ChevronDown, MapPin, Calendar } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
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

export default function ExperiencePage() {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">Experience</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional journey across software development and engineering
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 hidden md:block" />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Reveal key={exp.id} delay={index * 0.1}>
                <motion.div
                  className="relative md:ml-16"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[52px] top-6 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent hidden md:block ring-4 ring-background" />

                  <div 
                    className="glass rounded-2xl border border-border/50 overflow-hidden cursor-pointer"
                    onClick={() => setExpandedExperience(expandedExperience === exp.id ? null : exp.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                              {exp.title}
                            </h3>
                            <p className="text-primary font-medium mb-2">{exp.company}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {exp.period}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {exp.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedExperience === exp.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {expandedExperience === exp.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
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
                                  <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                      <Badge 
                                        key={tech} 
                                        variant="secondary" 
                                        className="bg-primary/10 text-primary hover:bg-primary/20"
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
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
