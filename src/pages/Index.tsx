// Portfolio website for Raghunandhan S - Fixed duplicate publications variable
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, Award, Briefcase, GraduationCap, Trophy, Users, Calendar, MapPin, BookOpen, Plus, FileText, Link } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [expandedPublication, setExpandedPublication] = useState<number | null>(null);
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };
  const skills = {
    Frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
    Backend: ['Python', 'FastAPI', '.NET'],
    Database: ['MySQL', 'PostgreSQL'],
    Tools: ['Git', 'GitHub', 'Power BI', 'VS Code', 'Catia V5'],
    'AI/ML': ['Machine Learning', 'TensorFlow', 'Artificial Intelligence', 'Data Analysis', 'Deep Learning']
  };
  const projects = [{
    title: "E-commerce Website for Apparel Store",
    description: "A modern responsive e-commerce web app built using TypeScript and React.",
    detailedDescription: "Developed a comprehensive e-commerce platform for an apparel store featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Built with modern React patterns, TypeScript for type safety, and responsive design for optimal user experience across all devices.",
    tech: ["TypeScript", "React", "E-commerce"],
    tags: ["Frontend", "E-commerce"],
    link: "https://github.com/raghunandhan04/E-commerce-Website-for-Apparel-Store",
    hasGitHub: true
  }, {
    title: "Predictive Maintenance using ML",
    description: "Machine learning model for predictive maintenance in industrial equipment",
    detailedDescription: "Developed a comprehensive machine learning solution for predictive maintenance in industrial settings. The system analyzes sensor data, equipment performance metrics, and historical maintenance records to predict potential failures before they occur. Implemented using advanced algorithms including Random Forest, LSTM neural networks, and ensemble methods to achieve high accuracy in failure prediction.",
    tech: ["Python", "TensorFlow", "Data Analysis"],
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
  }];
  const publicationsList = [{
    title: "Job Scheduling in Big Data Analytics Using Reinforcement Learning",
    publisher: "IEEE + Index Springer",
    date: "July 26, 2025",
    conference: "Artificial Intelligence and Sustainable Computing (AISC 2025, July 24-26, 2025)",
    description: "Presented at AISC 2025 conference. This paper explores advanced reinforcement learning techniques for optimizing job scheduling in big data analytics environments, improving efficiency and resource utilization.",
    status: "Publication in Process"
  }, {
    title: "Personalised Learning Platform Using AI-Based Adaptive Systems",
    publisher: "IEEE",
    date: "June 27, 2025",
    link: "https://ieeexplore.ieee.org/document/11041038",
    description: "We created a custom Learning application that adapts content based on a student's mood, survey data, difficulty level, and motivation. Technologies used: Emotion Detection, RL, DL, Sentiment Analysis, Linear Regression, etc."
  }, {
    title: "Deep Learning-Based Tyre Wear Detection and Predictive Maintenance Using Wireless Sensor Communication in Automobiles",
    publisher: "ISBN Conference Proceedings",
    date: "April 28, 2025",
    isbn: "978-81-985702-6-0",
    description: "Presented at AISSEWS 2025, won Best Paper Award. Focused on using Deep Learning and wireless sensor communication for predictive tyre maintenance in vehicles."
  }, {
    title: "Effect of CNG Induction on the Performance and Emission Characteristics of a DI Diesel Engine Fuelled with Biodiesel Ethanol Blends",
    publisher: "Yanthrika",
    date: "December 26, 2023",
    link: "https://yanthrika.com/eja/index.php/ijvss/article/view/2755",
    description: "Presented at National Conference. Explored how CNG induction influences engine performance and emissions, aimed at eco-friendly fuel alternatives."
  }];
  const certifications = ["AWS Cloud Practitioner - Amazon Web Services", "Python for Data Science - Coursera", "React Developer Certification - Meta", "Machine Learning Fundamentals - edX"];
  return <div className="min-h-screen bg-gradient-to-br from-background via-muted to-card text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-primary">Raghunandhan S</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {['about', 'skills', 'projects', 'publications', 'education', 'experience', 'contact'].map(section => <button key={section} onClick={() => scrollToSection(section)} className="text-foreground hover:text-primary transition-colors capitalize">
                  {section}
                </button>)}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && <div className="md:hidden pb-4">
              {['about', 'skills', 'projects', 'publications', 'education', 'experience', 'contact'].map(section => <button key={section} onClick={() => scrollToSection(section)} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors capitalize">
                  {section}
                </button>)}
            </div>}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end">
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wide">
            Raghunandhan S
          </h1>
          <h2 className="text-2xl md:text-3xl mb-6 text-foreground/90">Full Stack Developer & AI/ML Enthusiast</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-foreground/80 px-4">
            Passionate about creating innovative solutions through technology and artificial intelligence. 
            Specializing in full-stack development with expertise in machine learning and data analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button onClick={() => scrollToSection('contact')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Contact Me
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View Resume
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Resume - Raghunandhan S</DialogTitle>
                </DialogHeader>
                <div className="p-4 bg-card rounded-lg">
                  <p className="text-muted-foreground">Resume content will be displayed here...</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-6 h-6 text-foreground/60 animate-bounce cursor-pointer" onClick={() => scrollToSection('about')} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-foreground/90">
                I am a dedicated Full Stack Developer with a strong background in Automobile Engineering and a passionate pursuit in Artificial Intelligence and Machine Learning. 
                My journey spans from mechanical engineering to software development, bringing a unique perspective to problem-solving. 
                I specialize in creating efficient, scalable solutions using modern technologies like React, Python, and machine learning frameworks.
                
                Currently focused on developing impactful applications that bridge the gap between traditional engineering and cutting-edge AI/ML technologies.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList]) => <Card key={category} className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-primary">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map(skill => <Badge key={skill} variant="secondary" className="bg-secondary hover:bg-accent transition-colors">
                        {skill}
                      </Badge>)}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => <Card key={index} className={`bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer ${expandedProject === index ? 'md:col-span-2 lg:col-span-3' : ''}`} onClick={() => setExpandedProject(expandedProject === index ? null : index)}>
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {project.title}
                      {project.hasGitHub && <Github className="w-6 h-6 text-primary hover:text-primary/80 transition-colors" onClick={e => {
                    e.stopPropagation();
                    window.open(project.link, '_blank');
                  }} />}
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${expandedProject === index ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-4">
                    {expandedProject === index ? project.detailedDescription : project.description}
                  </p>
                  {project.organization && <div className="mb-4">
                      <p className="text-sm font-semibold text-primary mb-1">Organization:</p>
                      <p className="text-sm text-foreground/70">{project.organization}</p>
                    </div>}
                  {project.link && expandedProject === index && <div className="mb-4">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors" onClick={e => e.stopPropagation()}>
                        <ExternalLink className="w-4 h-4" />
                        View Repository
                      </a>
                    </div>}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-primary mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map(tech => <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} className="bg-primary/20 text-primary">
                        {tag}
                      </Badge>)}
                  </div>
                  {expandedProject !== index && <p className="text-xs text-foreground/60 mt-3">
                      {project.hasGitHub ? 'Click to expand details or GitHub icon to view repository' : 'Click to expand for details'}
                    </p>}
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Publications
          </h2>
          
          <div className="space-y-6 mb-8">
            {publicationsList.map((publication, index) => <Card key={index} className="bg-card/50 backdrop-blur-sm border-border">
                <Collapsible open={expandedPublication === index} onOpenChange={() => setExpandedPublication(expandedPublication === index ? null : index)}>
                  <CollapsibleTrigger asChild>
                    <div className="w-full cursor-pointer">
                      <CardHeader className="hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-foreground text-left flex items-center gap-2 mb-2">
                              <BookOpen className="w-5 h-5 text-primary" />
                              {publication.title}
                            </CardTitle>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-foreground/70">
                              <span className="font-medium text-primary">{publication.publisher}</span>
                              <span className="hidden sm:inline">•</span>
                              <span>{publication.date}</span>
                              {publication.status && <>
                                  <span className="hidden sm:inline">•</span>
                                  <Badge variant="outline" className="w-fit">
                                    {publication.status}
                                  </Badge>
                                </>}
                            </div>
                          </div>
                          <ChevronDown className={`w-5 h-5 transition-transform flex-shrink-0 ml-4 ${expandedPublication === index ? 'rotate-180' : ''}`} />
                        </div>
                      </CardHeader>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <p className="text-foreground/80 leading-relaxed">
                          {publication.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 items-center">
                          {publication.link && <a href={publication.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors" onClick={e => e.stopPropagation()}>
                              <Link className="w-4 h-4" />
                              View Publication
                            </a>}
                          
                          {publication.isbn && <div className="text-sm text-foreground/70">
                              <span className="font-medium">ISBN:</span> {publication.isbn}
                            </div>}
                          
                          <Button variant="outline" size="sm" className="ml-auto" onClick={e => {
                        e.stopPropagation();
                        // Handle file upload functionality
                      }}>
                            <FileText className="w-4 h-4 mr-2" />
                            Upload PDF
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>)}
          </div>
          
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Education
          </h2>
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <GraduationCap className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">BE Automobile Engineering</h3>
                    <p className="text-primary">Madras Institute of Technology (MIT), Anna University</p>
                    <p className="text-foreground/70">2021 - 2025 • CGPA: 8.2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <GraduationCap className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Minor Degree in Artificial Intelligence and Machine Learning</h3>
                    <p className="text-primary">Madras Institute of Technology (MIT), Anna University</p>
                    <p className="text-foreground/70">2023 - 2025 • CGPA: 9.1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <GraduationCap className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Higher Secondary Certificate (HSC)</h3>
                    <p className="text-primary">Chinmaya Vidyalaya</p>
                    <p className="text-foreground/70">2018 - 2020 • Percentage: 95.4%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <GraduationCap className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Secondary School Leaving Certificate (SSLC)</h3>
                    <p className="text-primary">Chinmaya Vidyalaya</p>
                    <p className="text-foreground/70">2016 - 2018 • Percentage: 94.8%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-muted/30">
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

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get In Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Name</label>
                  <Input placeholder="Your Name" className="bg-background/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
                  <Input type="email" placeholder="your.email@example.com" className="bg-background/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Message</label>
                  <Textarea placeholder="Your message..." className="bg-background/50 min-h-[120px]" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-foreground/80">raghunandhan04@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Connect With Me</h3>
                   <div className="flex flex-col sm:flex-row gap-4">
                     <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2" onClick={() => window.open('https://www.linkedin.com/in/raghunandhan04/', '_blank')}>
                       <Linkedin className="w-4 h-4" />
                       <span className="sm:hidden md:inline">LinkedIn</span>
                     </Button>
                     <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2" onClick={() => window.open('https://github.com/raghunandhan04', '_blank')}>
                       <Github className="w-4 h-4" />
                       <span className="sm:hidden md:inline">GitHub</span>
                     </Button>
                   </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">QR Code Contact</h3>
                  <div className="w-32 h-32 bg-background/50 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                    <p className="text-xs text-foreground/60 text-center">QR Code<br />Placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-background/50">
        <div className="container mx-auto text-center">
          <p className="text-foreground/60">
            © 2024 Raghunandhan S. All rights reserved.
          </p>
        </div>
      </footer>
    </div>;
};
export default Index;