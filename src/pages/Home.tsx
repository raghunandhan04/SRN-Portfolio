import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/Reveal";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .single();
    
    if (!error && data) {
      setProfile(data);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 tracking-tight">
              {profile?.full_name || 'Raghunandhan S'}
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 font-light leading-snug max-w-3xl mx-auto">
              { 'Aspiring MS Candidate in AI/ML & Data Science' }
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              {profile?.location || 'Chennai, India'} • {profile?.email || ''}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="text-base px-8">
                <Link to="/contact">
                  Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {profile?.resume_url && (
                <Button size="lg" variant="outline" asChild className="text-base px-8">
                  <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" /> Download Resume
                  </a>
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
              About Me
            </h2>
          </Reveal>
          <div className="prose prose-lg max-w-none">
            <Reveal>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              {profile?.bio || `I'm a recent graduate from Madras Institute of Technology (MIT), Anna University, 
              with a BE in Automobile Engineering and a Minor in Artificial Intelligence and Machine Learning. 
              My current focus is research and graduate studies in AI/ML and Data Science — with projects spanning 
              computer vision, NLP, reinforcement learning, and predictive modeling, and publications in IEEE/Springer venues.`}
              </p>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Reveal>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-4">Education</h3>
                  <p className="text-foreground/80">
                    <strong>BE Automobile Engineering</strong><br />
                    Madras Institute of Technology, Anna University
                  </p>
                  <p className="text-foreground/80 mt-3">
                    <strong>Minor Degree in AI & Machine Learning</strong><br />
                    Madras Institute of Technology, Anna University
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-4">Research Interests</h3>
                  <ul className="list-disc list-inside text-foreground/80 space-y-2">
                    <li>Applied Machine Learning (NLP, CV, Time Series)</li>
                    <li>Reinforcement Learning for optimization</li>
                    <li>Human-centered AI: emotion and engagement modeling</li>
                    <li>Scalable data systems and MLOps</li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Reveal>
              <div className="group relative p-6 rounded-lg bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                <Link to="/projects" className="block h-full">
                  <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    Projects
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Explore my latest work and technical projects
                  </p>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="group relative p-6 rounded-lg bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                <Link to="/skills" className="block h-full">
                  <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    Skills
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Technical expertise and competencies
                  </p>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="group relative p-6 rounded-lg bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                <Link to="/experience" className="block h-full">
                  <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    Experience
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Professional background and achievements
                  </p>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
