// Portfolio website for Raghunandhan S - Dynamic content from database
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, Award, Briefcase, GraduationCap, Trophy, Users, Calendar, MapPin, BookOpen, Plus, FileText, Link } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [expandedPublication, setExpandedPublication] = useState<number | null>(null);
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Dynamic data states
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .maybeSingle();
      
      // Fetch projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      // Fetch skills
      const { data: skillsData } = await supabase
        .from('skills')
        .select('*')
        .order('display_order');
      
      // Fetch certifications
      const { data: certificationsData } = await supabase
        .from('certifications')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      // Fetch social links
      const { data: socialLinksData } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      setProfile(profileData);
      setProjects(projectsData || []);
      setSkills(skillsData || []);
      setCertifications(certificationsData || []);
      setSocialLinks(socialLinksData || []);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    }
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: contactForm
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  // Group skills by category
  const groupedSkills = skills.reduce((acc: any, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  // Fallback data if no skills in database
  const defaultSkills = {
    Frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
    Backend: ['Python', 'FastAPI', '.NET'],
    Database: ['MySQL', 'PostgreSQL'],
    Tools: ['Git', 'GitHub', 'Power BI', 'VS Code', 'Catia V5'],
    'AI/ML': ['Machine Learning', 'TensorFlow', 'Artificial Intelligence', 'Data Analysis', 'Deep Learning']
  };

  const skillsToShow = Object.keys(groupedSkills).length > 0 ? groupedSkills : defaultSkills;
  return <div className="min-h-screen bg-gradient-to-br from-background via-muted to-card text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <h1 className="text-lg sm:text-xl font-bold text-primary">Raghunandhan S</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4 lg:space-x-6">
              {['about', 'skills', 'projects', 'publications', 'education', 'experience', 'contact'].map(section => <button key={section} onClick={() => scrollToSection(section)} className="text-foreground hover:text-primary transition-colors capitalize px-2 py-1 rounded-md hover:bg-muted/50">
                  {section}
                </button>)}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-md hover:bg-muted/50 touch-manipulation" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && <div className="md:hidden pb-4 border-t border-border/50 mt-2 pt-4">
              <div className="flex flex-col space-y-2">
                {['about', 'skills', 'projects', 'publications', 'education', 'experience', 'contact'].map(section => <button key={section} onClick={() => scrollToSection(section)} className="text-left py-3 px-4 text-foreground hover:text-primary hover:bg-muted/50 transition-colors capitalize rounded-md touch-manipulation text-base">
                    {section}
                  </button>)}
              </div>
            </div>}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end pt-20">
        <div className="text-center z-10 px-4 sm:px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wide leading-tight">
            {profile?.full_name || "Raghunandhan S"}
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-foreground/90 leading-relaxed">{profile?.title || "Full Stack Developer & AI/ML Enthusiast"}</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-foreground/80 leading-relaxed">
            {profile?.bio || "Passionate about creating innovative solutions through technology and artificial intelligence. Specializing in full-stack development with expertise in machine learning and data analysis."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto sm:max-w-none">
            <Button 
              onClick={() => scrollToSection('contact')} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground min-h-[48px] px-6 py-3 text-base touch-manipulation"
            >
              Contact Me
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground min-h-[48px] px-6 py-3 text-base touch-manipulation"
                >
                  View Resume
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[85vh] overflow-y-auto mx-4">
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
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown 
            className="w-6 h-6 sm:w-8 sm:h-8 text-foreground/60 animate-bounce cursor-pointer touch-manipulation p-1" 
            onClick={() => scrollToSection('about')} 
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                {profile?.bio || "I am a dedicated Full Stack Developer with a strong background in Automobile Engineering and a passionate pursuit in Artificial Intelligence and Machine Learning. My journey spans from mechanical engineering to software development, bringing a unique perspective to problem-solving. I specialize in creating efficient, scalable solutions using modern technologies like React, Python, and machine learning frameworks."}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Object.entries(skillsToShow).map(([category, skillList]) => <Card key={category} className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-primary text-lg sm:text-xl">{category}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                     {(skillList as string[]).map((skill: string) => <Badge key={skill} variant="secondary" className="bg-secondary hover:bg-accent transition-colors text-xs sm:text-sm py-1 px-2 touch-manipulation">
                        {skill}
                      </Badge>)}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => <Card key={index} className={`bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer touch-manipulation ${expandedProject === index ? 'md:col-span-2 lg:col-span-3' : ''}`} onClick={() => setExpandedProject(expandedProject === index ? null : index)}>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-foreground flex items-start sm:items-center justify-between gap-2 text-base sm:text-lg">
                    <div className="flex items-start sm:items-center gap-2 flex-1 min-w-0">
                      <span className="break-words">{project.title}</span>
                      {project.github_url && <Github 
                        className="w-5 h-5 sm:w-6 sm:h-6 text-primary hover:text-primary/80 transition-colors flex-shrink-0 touch-manipulation p-0.5" 
                        onClick={e => {
                          e.stopPropagation();
                          window.open(project.github_url, '_blank');
                        }} 
                      />}
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform flex-shrink-0 touch-manipulation ${expandedProject === index ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-foreground/80 mb-4 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                    {project.technologies?.map((tech: string, techIndex: number) => <Badge key={techIndex} variant="outline" className="text-xs border-primary/30 text-primary">
                        {tech}
                      </Badge>)}
                  </div>
                  
                  {expandedProject === index && <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex gap-4 mb-4">
                        {project.github_url && <Button variant="outline" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github_url, '_blank');
                        }}>
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </Button>}
                        {project.project_url && <Button variant="outline" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.project_url, '_blank');
                        }}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </Button>}
                      </div>
                    </div>}
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
            {certifications.map((cert, index) => <Card key={index} className="bg-card/50 backdrop-blur-sm border-border">
                <Collapsible open={expandedPublication === index} onOpenChange={() => setExpandedPublication(expandedPublication === index ? null : index)}>
                  <CollapsibleTrigger asChild>
                    <div className="w-full cursor-pointer">
                      <CardHeader className="hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-foreground text-left flex items-center gap-2 mb-2">
                              <Award className="w-5 h-5 text-primary" />
                              {cert.title}
                            </CardTitle>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-foreground/70">
                              <span className="font-medium text-primary">{cert.issuer}</span>
                              {cert.issue_date && <>
                                <span className="hidden sm:inline">•</span>
                                <span>{new Date(cert.issue_date).toLocaleDateString()}</span>
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
                        {cert.description && <p className="text-foreground/80 leading-relaxed">
                          {cert.description}
                        </p>}
                        
                        <div className="flex flex-wrap gap-4 items-center">
                          {cert.credential_url && <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors" onClick={e => e.stopPropagation()}>
                              <ExternalLink className="w-4 h-4" />
                              View Credential
                            </a>}
                          
                          {cert.credential_id && <div className="text-sm text-foreground/70">
                              <span className="font-medium">ID:</span> {cert.credential_id}
                            </div>}
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
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Name</label>
                    <Input 
                      placeholder="Your Name" 
                      className="bg-background/50" 
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="bg-background/50" 
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Message</label>
                    <Textarea 
                      placeholder="Your message..." 
                      className="bg-background/50 min-h-[120px]" 
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="w-32 h-32 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                        <img src="/lovable-uploads/24daf3d3-0097-423b-b311-4034fde00723.png" alt="Instagram QR Code" className="w-full h-full object-cover" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Instagram QR Code</DialogTitle>
                      </DialogHeader>
                      <div className="flex justify-center">
                        <img src="/lovable-uploads/24daf3d3-0097-423b-b311-4034fde00723.png" alt="Instagram QR Code" className="w-80 h-80 object-cover rounded-lg" />
                      </div>
                    </DialogContent>
                  </Dialog>
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