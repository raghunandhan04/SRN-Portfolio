import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, ChevronDown } from "lucide-react";

export default function ExperiencePage() {
    const [expandedExperience, setExpandedExperience] = useState<string | null>(null);

    return (
        <section id="experience" className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Experience
                </h2>
                <div className="space-y-6">
                    <Card className="bg-card/50 backdrop-blur-sm border-border cursor-pointer hover:bg-card/70 transition-colors" onClick={() => setExpandedExperience(expandedExperience === 'hibiz' ? null : 'hibiz')}>
                        <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                                <Briefcase className="w-6 h-6 text-primary mt-1" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold text-foreground">Systems Analyst/Developer</h3>
                                            <p className="text-primary">Hibiz Solutions</p>
                                            <p className="text-foreground/70">June 2025 - Present • Perungudi, Chennai</p>
                                        </div>
                                        <ChevronDown className={`w-5 h-5 text-foreground/60 transition-transform ${expandedExperience === 'hibiz' ? 'rotate-180' : ''}`} />
                                    </div>
                                    {expandedExperience === 'hibiz' && <div className="mt-4 space-y-3 pt-4 border-t border-border">
                                        <div>
                                            <h4 className="font-semibold text-foreground/90 mb-2">Role Details</h4>
                                            <p className="text-foreground/80">
                                                Developing and maintaining enterprise-level applications, analyzing system requirements,
                                                and implementing efficient solutions using modern technologies and frameworks.
                                            </p>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm border-border cursor-pointer hover:bg-card/70 transition-colors" onClick={() => setExpandedExperience(expandedExperience === 'zf-gec' ? null : 'zf-gec')}>
                        <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                                <Briefcase className="w-6 h-6 text-primary mt-1" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold text-foreground">Project Intern</h3>
                                            <p className="text-primary">ZF GEC (Global Engineering Center) - COE Team</p>
                                            <p className="text-foreground/70">Feb 2025 - May 2025 • DLF, Porur, Chennai</p>
                                        </div>
                                        <ChevronDown className={`w-5 h-5 text-foreground/60 transition-transform ${expandedExperience === 'zf-gec' ? 'rotate-180' : ''}`} />
                                    </div>
                                    {expandedExperience === 'zf-gec' && <div className="mt-4 space-y-3 pt-4 border-t border-border">
                                        <div>
                                            <h4 className="font-semibold text-foreground/90 mb-2">Project Details</h4>
                                            <p className="text-foreground/80">
                                                AI-enabled tool for comparing and validating the compliance of CAD drawings
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground/90 mb-2">Technologies Used</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {['Python', 'NLP', 'Computer Vision', 'HTML', 'CSS', 'OCR', 'pytesseract'].map(tech => <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                                    {tech}
                                                </Badge>)}
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm border-border cursor-pointer hover:bg-card/70 transition-colors" onClick={() => setExpandedExperience(expandedExperience === 'hcl' ? null : 'hcl')}>
                        <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                                <Briefcase className="w-6 h-6 text-primary mt-1" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold text-foreground">Intern - Software Development</h3>
                                            <p className="text-primary">HCL Technologies</p>
                                            <p className="text-foreground/70">July 2024 - Aug 2024  • Ambattur, Chennai</p>
                                        </div>
                                        <ChevronDown className={`w-5 h-5 text-foreground/60 transition-transform ${expandedExperience === 'hcl' ? 'rotate-180' : ''}`} />
                                    </div>
                                    {expandedExperience === 'hcl' && <div className="mt-4 space-y-3 pt-4 border-t border-border">
                                        <div>
                                            <h4 className="font-semibold text-foreground/90 mb-2">Project 1: Code Coverage Tool</h4>
                                            <p className="text-foreground/80">Developed a comprehensive code coverage analysis tool for .NET applications.</p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {['.NET SDK', 'Coverlet', 'Report Generator'].map(tech => <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                                    {tech}
                                                </Badge>)}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-foreground/90 mb-2">Project 2: Dynamic DNS Server</h4>
                                            <p className="text-foreground/80">Built a dynamic DNS server solution to address application downtime issues.</p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {['Python', 'DNS Server', 'Flask', 'Django'].map(tech => <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                                    {tech}
                                                </Badge>)}
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm border-border cursor-pointer hover:bg-card/70 transition-colors" onClick={() => setExpandedExperience(expandedExperience === 'ashok' ? null : 'ashok')}>
                        <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                                <Briefcase className="w-6 h-6 text-primary mt-1" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold text-foreground">Internship Trainee</h3>
                                            <p className="text-primary">Ashok Leyland</p>
                                            <p className="text-foreground/70">June 2023 - July 2023 • Ennore, Chennai</p>
                                        </div>
                                        <ChevronDown className={`w-5 h-5 text-foreground/60 transition-transform ${expandedExperience === 'ashok' ? 'rotate-180' : ''}`} />
                                    </div>
                                    {expandedExperience === 'ashok' && <div className="mt-4 space-y-3 pt-4 border-t border-border">
                                        <div>
                                            <h4 className="font-semibold text-foreground/90 mb-2">Project Details</h4>
                                            <p className="text-foreground/80">
                                                Cycle Time Calculation and Reduction tool - Developed a comprehensive tool for calculating and optimizing cycle times in automotive manufacturing processes.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground/90 mb-2">Technologies Used</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {['Ms Excel', 'RFID', 'Cycle Time Calculation'].map(tech => <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                                    {tech}
                                                </Badge>)}
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
