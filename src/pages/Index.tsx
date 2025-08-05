import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, Award, Briefcase, GraduationCap, Trophy, Users, Calendar, MapPin } from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const skills = {
    Frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
    Backend: ['Python', 'FastAPI', '.NET'],
    Database: ['MySQL', 'PostgreSQL'],
    Tools: ['Git', 'Power BI', 'VS Code'],
    Other: ['Machine Learning', 'TensorFlow', 'Data Analysis']
  };

  const projects = [
    {
      title: "Predictive Maintenance using ML",
      description: "Machine learning model for predictive maintenance in industrial equipment",
      detailedDescription: "Developed a comprehensive machine learning solution for predictive maintenance in industrial settings. The system analyzes sensor data, equipment performance metrics, and historical maintenance records to predict potential failures before they occur. Implemented using advanced algorithms including Random Forest, LSTM neural networks, and ensemble methods to achieve high accuracy in failure prediction.",
      tech: ["Python", "TensorFlow", "Data Analysis"],
      tags: ["ML", "Industrial"]
    },
    {
      title: "DNS Server Project",
      description: "Custom DNS server implementation with advanced routing capabilities",
      detailedDescription: "Built a high-performance DNS server from scratch with advanced routing and caching mechanisms. Features include custom domain resolution, load balancing, security filters, and real-time monitoring. The server handles thousands of concurrent requests with sub-millisecond response times and includes comprehensive logging and analytics.",
      tech: ["Python", "Networking"],
      tags: ["Networking", "Backend"]
    },
    {
      title: ".NET Code Coverage Tool",
      description: "Tool for analyzing and improving code coverage in .NET applications",
      detailedDescription: "Developed a comprehensive code coverage analysis tool for .NET applications that provides detailed insights into test coverage, identifies untested code paths, and generates actionable reports. The tool integrates with popular CI/CD pipelines and provides real-time coverage metrics with customizable thresholds and alerts.",
      tech: [".NET", "C#", "Testing"],
      tags: ["Testing", "DevTools"]
    },
    {
      title: "Cycle Time Reduction Tool",
      description: "Tool to optimize and reduce development cycle times",
      detailedDescription: "Created an automated tool that analyzes development workflows, identifies bottlenecks, and suggests optimizations to reduce cycle times. The tool integrates with project management systems, tracks key metrics, and provides data-driven recommendations for process improvements, resulting in 30% faster delivery times.",
      tech: ["Python", "Data Analysis"],
      tags: ["Optimization", "DevOps"]
    },
    {
      title: "Sentiment Analysis using TensorFlow",
      description: "NLP model for sentiment analysis using deep learning",
      detailedDescription: "Implemented a sophisticated sentiment analysis system using TensorFlow and advanced NLP techniques. The model processes text data from multiple sources, performs real-time sentiment classification, and provides detailed emotional insights. Achieved 94% accuracy on benchmark datasets using transformer architectures and custom preprocessing pipelines.",
      tech: ["Python", "TensorFlow", "NLP"],
      tags: ["ML", "NLP"]
    }
  ];

  const certifications = [
    "AWS Cloud Practitioner - Amazon Web Services",
    "Python for Data Science - Coursera",
    "React Developer Certification - Meta",
    "Machine Learning Fundamentals - edX"
  ];

  const publications = {
    published: [
      {
        title: "Effect of CNG Induction on Engine Performance and Emissions",
        date: "December 2023",
        venue: "International Journal of Automotive Engineering"
      }
    ],
    presented: [
      {
        title: "Personalized Learning Platform Using AI-Based Adaptive Systems",
        venue: "ICITIIT 2025",
        date: "Upcoming"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-card text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-primary">Raghunandhan S</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {['about', 'skills', 'projects', 'education', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-foreground hover:text-primary transition-colors capitalize"
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              {['about', 'skills', 'projects', 'education', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors capitalize"
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end">
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wide">
            Raghunandhan S
          </h1>
          <h2 className="text-2xl md:text-3xl mb-6 text-foreground/90">Full Stack Developer</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-foreground/80 px-4">
            Passionate about creating innovative solutions through technology. 
            Specializing in full-stack development with expertise in machine learning and data analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
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
          <ChevronDown 
            className="w-6 h-6 text-foreground/60 animate-bounce cursor-pointer"
            onClick={() => scrollToSection('about')}
          />
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
                I am a dedicated Full Stack Developer with a strong background in Automobile Engineering and a passion for technology innovation. 
                My journey spans from mechanical engineering to software development, bringing a unique perspective to problem-solving. 
                I specialize in creating efficient, scalable solutions using modern technologies like React, Python, and machine learning frameworks.
                
                Currently focused on developing impactful applications that bridge the gap between traditional engineering and cutting-edge technology.
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
            {Object.entries(skills).map(([category, skillList]) => (
              <Card key={category} className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-primary">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-secondary hover:bg-accent transition-colors">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
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
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className={`bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer ${
                  expandedProject === index ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
                onClick={() => setExpandedProject(expandedProject === index ? null : index)}
              >
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center justify-between">
                    {project.title}
                    <ChevronDown className={`w-5 h-5 transition-transform ${expandedProject === index ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-4">
                    {expandedProject === index ? project.detailedDescription : project.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-primary mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} className="bg-primary/20 text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {expandedProject !== index && (
                    <p className="text-xs text-foreground/60 mt-3">Click to expand for details</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-muted/30">
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
                    <p className="text-foreground/70">2020 - 2024 • CGPA: 8.2</p>
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
                    <p className="text-foreground/70">2020 - 2024 • CGPA: 9.1</p>
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
                    <p className="text-foreground/70">2018 - 2020</p>
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
                    <p className="text-foreground/70">2016 - 2018</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Briefcase className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Full Stack Developer</h3>
                    <p className="text-primary">Current Role</p>
                    <p className="text-foreground/70">2024 - Present</p>
                    <p className="text-foreground/80 mt-2">
                      Developing end-to-end web applications using modern technologies. 
                      Focus on creating scalable solutions and optimizing user experiences.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Briefcase className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Intern - Software Development</h3>
                    <p className="text-primary">HCL Technologies</p>
                    <p className="text-foreground/70">Summer 2023</p>
                    <p className="text-foreground/80 mt-2">
                      Worked on enterprise-level applications and gained experience in software development lifecycle.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Briefcase className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Technical Intern</h3>
                    <p className="text-primary">Ashok Leyland</p>
                    <p className="text-foreground/70">Winter 2022</p>
                    <p className="text-foreground/80 mt-2">
                      Gained hands-on experience in automotive engineering and industrial processes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/30">
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
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">QR Code Contact</h3>
                  <div className="w-32 h-32 bg-background/50 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                    <p className="text-xs text-foreground/60 text-center">QR Code<br/>Placeholder</p>
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
    </div>
  );
};

export default Index;