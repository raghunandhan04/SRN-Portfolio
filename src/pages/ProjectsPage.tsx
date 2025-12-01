import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Github, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const projects = [{
    title: "E-commerce Website for Apparel Store",
    description: "A modern responsive e-commerce web app built using TypeScript and React.",
    detailedDescription: "Developed a comprehensive e-commerce platform for an apparel store featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Built with modern React patterns, TypeScript for type safety, and responsive design for optimal user experience across all devices.",
    tech: ["TypeScript", "React", "E-commerce"],
    tags: ["Frontend", "E-commerce"],
    link: "https://github.com/raghunandhan04/E-commerce-Website-for-Apparel-Store",
    hasGitHub: true
  }, {
    title: "Deep Learning based Smart Battery Thermal Management System (BTMS) for EV Batteries\n(Final Year Project)",
    description: "Machine learning model for predictive maintenance in industrial equipment",
    detailedDescription: "Developed a comprehensive machine learning solution for predictive maintenance in industrial settings. The system analyzes sensor data, equipment performance metrics, and historical maintenance records to predict potential failures before they occur. Implemented using advanced algorithms including Random Forest, LSTM neural networks, and ensemble methods to achieve high accuracy in failure prediction.",
    tech: ["Python", "TensorFlow", "Data Analysis", "Deep Learning", "CNN", "Matlab", "Fluke Thermal Imaging", "Ansys"],
    tags: ["ML", "Industrial"],
    organization: "Madras Institute of Technology, Anna University"
  }, {
    title: "DNS Server Project",
    description: "Custom DNS server implementation with advanced routing capabilities",
    detailedDescription: "Built a high-performance DNS server from scratch with advanced routing and caching mechanisms. Features include custom domain resolution, load balancing, security filters, and real-time monitoring. The server handles thousands of concurrent requests with sub-millisecond response times and includes comprehensive logging and analytics.",
    tech: ["Python", "Networking"],
    tags: ["Networking", "Backend"],
    organization: "HCL Technologies"
  }, {
    title: ".NET Code Coverage Tool",
    description: "Tool for analyzing and improving code coverage in .NET applications",
    detailedDescription: "Developed a comprehensive code coverage analysis tool for .NET applications that provides detailed insights into test coverage, identifies untested code paths, and generates actionable reports. The tool integrates with popular CI/CD pipelines and provides real-time coverage metrics with customizable thresholds and alerts.",
    tech: [".NET", "C#", "Testing"],
    tags: ["Testing", "DevTools"],
    organization: "HCL Technologies"
  }, {
    title: "Cycle Time Reduction Tool",
    description: "Tool to optimize and reduce development cycle times",
    detailedDescription: "Created an automated tool that analyzes development workflows, identifies bottlenecks, and suggests optimizations to reduce cycle times. The tool integrates with project management systems, tracks key metrics, and provides data-driven recommendations for process improvements, resulting in 30% faster delivery times.",
    tech: ["Python", "Data Analysis"],
    tags: ["Optimization", "DevOps"],
    organization: "Ashok Leyland"
  }, {
    title: "Sentiment Analysis using TensorFlow",
    description: "NLP model for sentiment analysis using deep learning",
    detailedDescription: "Implemented a sophisticated sentiment analysis system using TensorFlow and advanced NLP techniques. The model processes text data from multiple sources, performs real-time sentiment classification, and provides detailed emotional insights. Achieved 94% accuracy on benchmark datasets using transformer architectures and custom preprocessing pipelines.",
    tech: ["Python", "TensorFlow", "NLP"],
    tags: ["ML", "NLP"]
    },
    // Added from resume
    {
        title: "Strategic Evaluation of AI-Powered No-Code/Low-Code Platforms",
        description: "Exploration of modern AI-assisted no/low-code platforms and developer tools",
        detailedDescription: "Evaluated AI-powered no/low-code platforms (Lovable, Rocket, Bolt, Windsurf, Cursor) for rapid prototyping and enterprise feasibility. Assessed developer experience, extensibility, CI/CD integration, and security considerations, delivering recommendations tailored to project constraints and team skill sets.",
        tech: ["Lovable", "Rocket", "Bolt", "Windsurf", "Cursor"],
        tags: ["Evaluation", "AI Tools"],
        organization: "Hibiz Solutions"
    },
    {
        title: "Multilingual Website Development with Custom CMS for Product/Solution Hosting",
        description: "Full-stack multilingual CMS platform with real-time content updates",
        detailedDescription: "Built a multilingual CMS platform to host and manage product/solution content for an AI application portfolio. Developed custom user-friendly admin dashboards enabling non-technical staff to perform real-time content updates across supported languages. Implemented role-based access control and content moderation workflows.",
        tech: ["TypeScript", "React", "HTML", "CSS"],
        tags: ["Full-Stack", "CMS"],
        organization: "Hibiz Solutions"
    },
    {
        title: "Development of an AI Tool for Comparing and Validating Engineering CAD Drawings",
        description: "AI-enabled tool for CAD compliance checking",
        detailedDescription: "Created an AI-enabled tool that compares and validates compliance of engineering CAD drawings using OCR and computer vision. Automated extraction and matching of drawing annotations to specifications, reducing manual validation time and errors.",
        tech: ["Python", "OCR", "Computer Vision", "Tesseract"],
        tags: ["AI", "CAD"],
        organization: "ZF Global Engineering Centre — COE Team"
    },
    {
        title: "Cycle Time Calculation and Reduction Tool",
        description: "Manufacturing process optimization toolkit",
        detailedDescription: "Developed a comprehensive tool for calculating and reducing cycle times in automotive manufacturing processes. Combined RFID-based tracking with data analysis to identify bottlenecks and quantify improvements.",
        tech: ["RFID", "Excel", "Data Analysis"],
        tags: ["Manufacturing", "Optimization"],
        organization: "Ashok Leyland, Ennore"
    }
];

export default function ProjectsPage() {
    const [expandedProject, setExpandedProject] = useState<number | null>(null);
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

    const handleExpandToggle = (index: number) => {
        const willExpand = expandedProject !== index;
        setExpandedProject(willExpand ? index : null);
        // After state updates, scroll the card into view with offset for fixed nav
        setTimeout(() => {
            const el = cardRefs.current[index];
            if (!el) return;
            const navHeight = 80; // adjust if your header height differs
            const rect = el.getBoundingClientRect();
            const offsetTop = rect.top + window.pageYOffset - navHeight - 12; // small padding
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }, 0);
    };

    return (
        <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Featured Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {projects.map((project, index) => (
                        <Reveal key={index} delay={index * 0.05}>
                            <Card
                                                    key={index}
                                                    ref={(el) => { cardRefs.current[index] = el; }}
                                                    className={`bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer touch-manipulation ${expandedProject === index ? 'md:col-span-2 lg:col-span-3' : ''}`}
                                                    onClick={() => handleExpandToggle(index)}
                                                >
                            <CardHeader className="pb-3 sm:pb-4">
                                <CardTitle className="text-foreground flex items-start sm:items-center justify-between gap-2 text-base sm:text-lg">
                                    <div className="flex items-start sm:items-center gap-2 flex-1 min-w-0">
                                        <span className="break-words">{project.title}</span>
                                        {project.hasGitHub && <Github
                                            className="w-5 h-5 sm:w-6 sm:h-6 text-primary hover:text-primary/80 transition-colors flex-shrink-0 touch-manipulation p-0.5"
                                            onClick={e => {
                                                e.stopPropagation();
                                                window.open(project.link, '_blank');
                                            }}
                                        />}
                                    </div>
                                    <ChevronDown className={`w-5 h-5 transition-transform flex-shrink-0 touch-manipulation ${expandedProject === index ? 'rotate-180' : ''}`} />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-foreground/80 mb-4 text-sm sm:text-base leading-relaxed">
                                    {expandedProject === index ? project.detailedDescription : project.description}
                                </p>
                                {project.organization && <div className="mb-4">
                                    <p className="text-sm font-semibold text-primary mb-1">Organization:</p>
                                    <p className="text-sm text-foreground/70">{project.organization}</p>
                                </div>}
                                {project.link && expandedProject === index && <div className="mb-4">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors touch-manipulation py-1" onClick={e => e.stopPropagation()}>
                                        <ExternalLink className="w-4 h-4" />
                                        View Repository
                                    </a>
                                </div>}
                                <div className="mb-4">
                                    <p className="text-sm font-semibold text-primary mb-2">Tech Stack:</p>
                                    <div className="flex flex-wrap gap-1 sm:gap-2">
                                        {project.tech.map(tech => <Badge key={tech} variant="outline" className="text-xs py-1 px-2">
                                            {tech}
                                        </Badge>)}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                                    {project.tags.map(tag => <Badge key={tag} className="bg-primary/20 text-primary text-xs py-1 px-2">
                                        {tag}
                                    </Badge>)}
                                </div>
                                {expandedProject !== index && <p className="text-xs text-foreground/60">
                                    {project.hasGitHub ? 'Tap to expand details or GitHub icon to view repository' : 'Tap to expand for details'}
                                </p>}
                            </CardContent>
                            </Card>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
