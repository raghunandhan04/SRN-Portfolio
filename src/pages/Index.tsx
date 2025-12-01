import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, Award, Briefcase, GraduationCap, BookOpen, Calendar, MessageCircle } from "lucide-react";
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
  const [profile, setProfile] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch profile data
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .limit(1)
        .single();

      // Fetch skills data
      const { data: skillsData } = await supabase
        .from("skills")
        .select("*")
        .eq("is_featured", true)
        .order("display_order");

      // Fetch projects data
      const { data: projectsData } = await supabase
        .from("projects")
        .select("*")
        .eq("is_active", true)
        .order("display_order");

      // Fetch certifications data
      const { data: certificationsData } = await supabase
        .from("certifications")
        .select("*")
        .eq("is_active", true)
        .order("display_order")
        .limit(6);

      setProfile(profileData);
      setSkills(skillsData || []);
      setProjects(projectsData || []);
      setCertifications(certificationsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate the offset for fixed navigation
      const navHeight = 80; // Approximate height of fixed navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
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

  // Static publications data (can be moved to database later)
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
  }, {
    title: "Enhancing Learning Through AI-Based Performance Prediction and Emotion Detection",
    publisher: "Springer",
    date: "July, 2025",
    description: "Paper presented in July 2025. Focuses on AI-driven performance prediction combined with emotion detection to personalize and enhance learning outcomes.",
    status: "Publication in progress"
  }];

  // Sort publications: in-progress first, then by date desc
  const parseDate = (d?: string) => {
    if (!d) return 0;
    try {
      const normalized = d.replace(/\s+/g, ' ').trim().replace(/,$/, '');
      const date = new Date(normalized);
      if (!isNaN(date.getTime())) return date.getTime();
      const withDay = normalized.match(/^[A-Za-z]+,\s*\d{4}$/) ? normalized.replace(',', ' 1,') : normalized;
      const fallback = new Date(withDay);
      return isNaN(fallback.getTime()) ? 0 : fallback.getTime();
    } catch {
      return 0;
    }
  };

  const sortedPublications = [...publicationsList].sort((a, b) => {
    const aProgress = (a.status || '').toLowerCase().includes('progress');
    const bProgress = (b.status || '').toLowerCase().includes('progress');
    if (aProgress !== bProgress) return aProgress ? -1 : 1;
    const aDate = parseDate(a.date);
    const bDate = parseDate(b.date);
    return bDate - aDate;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-card text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <h1 className="text-lg sm:text-xl font-bold text-primary">{profile?.full_name || "Raghunandhan S"}</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4 lg:space-x-6">
              {['about', 'skills', 'projects', 'certifications', 'publications', 'education', 'experience', 'contact'].map(section => (
                <button 
                  key={section} 
                  onClick={() => scrollToSection(section)} 
                  className="text-foreground hover:text-primary transition-colors capitalize px-2 py-1 rounded-md hover:bg-muted/50"
                >
                  {section}
                </button>
              ))}
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
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-border/50 mt-2 pt-4">
              <div className="flex flex-col space-y-2">
                {['about', 'skills', 'projects', 'certifications', 'publications', 'education', 'experience', 'contact'].map(section => (
                  <button 
                    key={section} 
                    onClick={() => scrollToSection(section)} 
                    className="text-left py-3 px-4 text-foreground hover:text-primary hover:bg-muted/50 transition-colors capitalize rounded-md touch-manipulation text-base"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end pt-20">
        <div className="text-center z-10 px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wide leading-tight">
            {profile?.full_name || "Raghunandhan S"}
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-foreground/90 leading-relaxed">
            {profile?.title || "Full Stack Developer & AI/ML Enthusiast"}
          </h2>
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
                  <DialogTitle>Resume - {profile?.full_name || "Raghunandhan S"}</DialogTitle>
                </DialogHeader>
                <div className="p-4 bg-card rounded-lg">
                  {profile?.resume_url ? (
                    <iframe 
                      src={profile.resume_url} 
                      className="w-full h-96" 
                      title="Resume"
                    />
                  ) : (
                    <p className="text-muted-foreground">Resume content will be displayed here...</p>
                  )}
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
                {profile?.bio || `I am a dedicated Full Stack Developer with a strong background in Automobile Engineering and a passionate pursuit in Artificial Intelligence and Machine Learning. 
                My journey spans from mechanical engineering to software development, bringing a unique perspective to problem-solving. 
                I specialize in creating efficient, scalable solutions using modern technologies like React, Python, and machine learning frameworks.
                Currently focused on developing impactful applications that bridge the gap between traditional engineering and cutting-edge AI/ML technologies.`}
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
            {skills.reduce((acc: any[], skill: any) => {
              const existingCategory = acc.find(item => item.category === skill.category);
              if (existingCategory) {
                existingCategory.skills.push(skill.name);
              } else {
                acc.push({ category: skill.category, skills: [skill.name] });
              }
              return acc;
            }, []).map(({ category, skills: skillList }: any) => (
              <Card key={category} className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-primary text-lg sm:text-xl">{category}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill: string) => (
                      <Badge key={skill} variant="secondary" className="bg-secondary hover:bg-accent transition-colors text-xs sm:text-sm py-1 px-2 touch-manipulation">
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
      <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <Card key={project.id} className={`bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer touch-manipulation ${expandedProject === index ? 'md:col-span-2 lg:col-span-3' : ''}`} onClick={() => setExpandedProject(expandedProject === index ? null : index)}>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-foreground flex items-start sm:items-center justify-between gap-2 text-base sm:text-lg">
                    <div className="flex items-start sm:items-center gap-2 flex-1 min-w-0">
                      <span className="break-words">{project.title}</span>
                      {project.github_url && (
                        <Github 
                          className="w-5 h-5 sm:w-6 sm:h-6 text-primary hover:text-primary/80 transition-colors flex-shrink-0 touch-manipulation p-0.5" 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.github_url, '_blank');
                          }} 
                        />
                      )}
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
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id} className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  {cert.image_url && (
                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                      <img 
                        src={cert.image_url} 
                        alt={cert.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <CardTitle className="text-lg leading-tight">{cert.title}</CardTitle>
                  <p className="text-primary font-medium">{cert.issuer}</p>
                </CardHeader>
                <CardContent>
                  {cert.description && (
                    <p className="text-muted-foreground mb-4 text-sm">{cert.description}</p>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    {cert.issue_date && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Issued: {new Date(cert.issue_date).toLocaleDateString()}
                      </div>
                    )}
                    {cert.expiry_date && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Expires: {new Date(cert.expiry_date).toLocaleDateString()}
                      </div>
                    )}
                    {cert.credential_id && (
                      <div className="text-sm text-muted-foreground">
                        ID: {cert.credential_id}
                      </div>
                    )}
                  </div>

                  {cert.credential_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(cert.credential_url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Credential
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {certifications.length === 0 && (
            <div className="text-center py-12">
              <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No certifications available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Publications & Research
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {sortedPublications.map((publication, index) => (
              <Card key={index} className={`bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer touch-manipulation ${expandedPublication === index ? 'lg:col-span-2' : ''}`} onClick={() => setExpandedPublication(expandedPublication === index ? null : index)}>
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-foreground text-base sm:text-lg leading-tight mb-1 sm:mb-2 break-words">
                        {publication.title}
                      </CardTitle>
                      <p className="text-primary font-medium text-sm sm:text-base">{publication.publisher}</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">{publication.date}</p>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3">
                      {publication.description}
                    </p>
                    {publication.conference && (
                      <Badge variant="secondary" className="text-xs">
                        {publication.conference}
                      </Badge>
                    )}
                    {publication.status && (
                      <Badge variant="outline" className="text-xs">
                        {publication.status}
                      </Badge>
                    )}
                    {expandedPublication === index && (
                      <Collapsible open={true}>
                        <CollapsibleContent>
                          <div className="pt-3 sm:pt-4 border-t border-border/50 space-y-3 sm:space-y-4">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                              {publication.link && (
                                <Button 
                                  size="sm" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(publication.link, '_blank');
                                  }} 
                                  className="touch-manipulation"
                                >
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  View Publication
                                </Button>
                              )}
                              {publication.isbn && (
                                <Badge variant="secondary" className="w-fit text-xs">
                                  ISBN: {publication.isbn}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
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
                    <p className="text-foreground/70">2021 - 2025 • CGPA: 8.06</p>
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
                    <p className="text-foreground/70">2023 - 2025 • CGPA: 9.0</p>
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
                    <p className="text-primary">Chinmaya Vidyalaya - CBSE</p>
                    <p className="text-foreground/70">2018 - 2020 • Percentage: 95.2%</p>
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
                    <p className="text-primary">Chinmaya Vidyalaya - CBSE</p>
                    <p className="text-foreground/70">2016 - 2018 • Percentage: 94.4%</p>
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
                        <p className="text-foreground/70">June 2025 - November 2025 • Perungudi, Chennai</p>
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
      <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
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
                  <div className="flex items-center space-x-4">
                    <MessageCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <h3 className="font-semibold text-foreground">WhatsApp</h3>
                      <a 
                        href="https://wa.me/919962181553" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-foreground/80 hover:text-primary transition-colors"
                      >
                        +91 9962181553
                      </a>
                    </div>
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
