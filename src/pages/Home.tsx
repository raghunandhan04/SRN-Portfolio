import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Download, Sparkles, Code2, BookOpen, Briefcase, Award, Users, Heart, Gamepad2, Book, Dumbbell, Camera, Plane, Trophy, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
      .maybeSingle();
    
    if (!error && data) {
      setProfile(data);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with ambient background */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Ambient gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.05)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <Reveal delay={0}>
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Open to MS opportunities in AI/ML</span>
            </motion.div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight whitespace-nowrap">
              <span className="text-foreground">Hi, I'm </span>
              <span className="text-gradient glow-text">{profile?.full_name || 'Raghunandhan S'}</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-4 font-light leading-relaxed max-w-3xl mx-auto">
              Aspiring <span className="text-foreground font-medium">MS Candidate</span> in 
              <span className="text-gradient font-medium"> AI/ML & Data Science</span>
            </p>
          </Reveal>
          
          <Reveal delay={0.3}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {profile?.location || 'Chennai, India'}
            </p>
          </Reveal>
          
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                asChild 
                className="text-base px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 group"
              >
                <Link to="/contact">
                  Get in Touch 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              {profile?.resume_url && (
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="text-base px-8 py-6 border-border/50 hover:bg-muted/50 hover:border-primary/50 transition-all duration-300 group"
                >
                  <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
                    Download Resume
                  </a>
                </Button>
              )}
            </div>
          </Reveal>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <motion.div className="w-1.5 h-3 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        
        <div className="max-w-5xl mx-auto relative">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">About Me</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
            </div>
          </Reveal>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal delay={0.1}>
              <div className="space-y-6">
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {profile?.bio || `I'm a recent graduate from Madras Institute of Technology (MIT), Anna University, 
                  with a BE in Automobile Engineering and a Minor in Artificial Intelligence and Machine Learning.`}
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  My current focus is research and graduate studies in AI/ML and Data Science — with projects spanning 
                  computer vision, NLP, reinforcement learning, and predictive modeling, and publications in IEEE/Springer venues.
                </p>
              </div>
            </Reveal>
            
            <div className="space-y-6">
              <Reveal delay={0.2}>
                <div className="glass rounded-2xl p-6 hover-lift">
                  <h3 className="font-display text-xl font-semibold mb-4 text-gradient">Education</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-foreground">BE Automobile Engineering</p>
                      <p className="text-sm text-muted-foreground">MIT, Anna University</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Minor in AI & Machine Learning</p>
                      <p className="text-sm text-muted-foreground">MIT, Anna University</p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={0.3}>
                <div className="glass rounded-2xl p-6 hover-lift">
                  <h3 className="font-display text-xl font-semibold mb-4 text-gradient">Research Interests</h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Applied ML (NLP, CV, Time Series)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Reinforcement Learning
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Human-centered AI
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Scalable ML systems
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Extracurricular Activities Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-5xl mx-auto relative">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent mb-6">
                <Award className="w-4 h-4" />
                <span>Leadership & Community</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">Extracurricular Activities</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
            </div>
          </Reveal>

          <div className="space-y-6">
            {[
              {
                role: "General Secretary",
                organization: "The Personality Development Association",
                institution: "MIT, Anna University",
                period: "2023 – 2025",
                location: "Chennai, India",
                icon: Users,
                color: "from-primary to-primary/70"
              },
              {
                role: "Volunteer",
                organization: "The Youth Red Cross",
                institution: "MIT, Anna University",
                period: "2023 – 2025",
                location: "Chennai, India",
                icon: Heart,
                color: "from-red-500 to-red-400"
              },
              {
                role: "Member",
                organization: "The Box Office Club & The Photosociety",
                institution: "MIT, Anna University",
                period: "2022 – 2025",
                location: "Chennai, India",
                icon: Camera,
                color: "from-accent to-accent/70"
              },
              {
                role: "Active Participant",
                organization: "Model United Nations (MUN) Conferences",
                institution: "",
                period: "",
                location: "",
                icon: Trophy,
                color: "from-yellow-500 to-amber-400"
              }
            ].map((activity, index) => (
              <Reveal key={activity.organization} delay={Math.min(index * 0.1, 0.3)}>
                <motion.div
                  className="group relative glass rounded-2xl p-6 sm:p-8 border border-border/50 overflow-hidden"
                  whileHover={{ x: 10, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient accent line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${activity.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                  
                  {/* Hover glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${activity.color} blur-3xl -z-10`} style={{ opacity: 0.05 }} />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activity.color} p-3 flex-shrink-0`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <activity.icon className="w-full h-full text-white" />
                      </motion.div>
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground group-hover:text-gradient transition-all duration-300">
                          {activity.role}
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          {activity.organization}
                          {activity.institution && ` - ${activity.institution}`}
                        </p>
                      </div>
                    </div>
                    
                    {(activity.period || activity.location) && (
                      <div className="text-right text-sm text-muted-foreground ml-16 sm:ml-0">
                        {activity.period && <p className="font-medium text-foreground/80">{activity.period}</p>}
                        {activity.location && <p>{activity.location}</p>}
                      </div>
                    )}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        
        <div className="max-w-5xl mx-auto relative">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
                <Target className="w-4 h-4" />
                <span>Beyond Work</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">Hobbies & Interests</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Badminton", icon: Target, color: "from-green-500 to-emerald-400" },
              { name: "Reading", icon: Book, color: "from-blue-500 to-cyan-400" },
              { name: "Chess", icon: Gamepad2, color: "from-purple-500 to-violet-400" },
              { name: "Fitness", icon: Dumbbell, color: "from-red-500 to-orange-400" },
              { name: "Editing", icon: Camera, color: "from-pink-500 to-rose-400" },
              { name: "Travelling", icon: Plane, color: "from-accent to-teal-400" }
            ].map((hobby, index) => (
              <Reveal key={hobby.name} delay={Math.min(index * 0.08, 0.4)}>
                <motion.div
                  className="group relative"
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative glass rounded-2xl p-6 text-center border border-border/50 overflow-hidden h-full">
                    {/* Animated gradient background on hover */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${hobby.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    
                    {/* Icon container with floating animation */}
                    <motion.div 
                      className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${hobby.color} p-3 mb-4 shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <hobby.icon className="w-full h-full text-white" />
                    </motion.div>
                    
                    <h3 className="font-medium text-foreground group-hover:text-gradient transition-all duration-300">
                      {hobby.name}
                    </h3>
                    
                    {/* Decorative ring on hover */}
                    <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300`} />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-gradient">Explore My Work</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover my projects, skills, and professional journey
              </p>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Projects",
                description: "Technical projects spanning AI/ML, web development, and more",
                icon: Code2,
                path: "/projects",
                color: "from-primary to-primary/50"
              },
              {
                title: "Publications",
                description: "Research papers in IEEE, Springer, and conference proceedings",
                icon: BookOpen,
                path: "/publications",
                color: "from-accent to-accent/50"
              },
              {
                title: "Experience",
                description: "Professional background and industry achievements",
                icon: Briefcase,
                path: "/experience",
                color: "from-primary to-accent"
              }
            ].map((item, index) => (
              <Reveal key={item.title} delay={Math.min(index * 0.08, 0.2)}>
                <Link to={item.path} className="group block">
                  <motion.div 
                    className="relative h-full p-8 rounded-2xl glass border-border/50 overflow-hidden"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Gradient glow on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.color} blur-3xl -z-10`} />
                    
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="w-full h-full text-white" />
                      </div>
                      
                      <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-gradient transition-all duration-300">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                        Explore <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
