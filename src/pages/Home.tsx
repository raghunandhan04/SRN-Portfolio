import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

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
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 tracking-tight">
            {profile?.full_name || 'Raghunandhan S'}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            {profile?.title || 'Systems Analyst/Developer'}
          </p>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            {profile?.location || 'Chennai, India'} • {profile?.email || ''}
          </p>
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
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
            About Me
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              {profile?.bio || `I'm a recent graduate from Madras Institute of Technology, Anna University, 
              with a BE in Automobile Engineering and a Minor degree in Artificial Intelligence and Machine Learning. 
              Currently working as a Systems Analyst/Developer at Hibiz Solutions, I bring together my engineering 
              background and AI/ML expertise to create innovative solutions.`}
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="font-display text-xl font-semibold mb-4">Education</h3>
                <p className="text-foreground/80">
                  <strong>BE Automobile Engineering</strong><br />
                  Madras Institute of Technology, Anna University
                </p>
                <p className="text-foreground/80 mt-3">
                  <strong>Minor in AI & Machine Learning</strong><br />
                  Madras Institute of Technology
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-4">Current Role</h3>
                <p className="text-foreground/80">
                  <strong>Systems Analyst/Developer</strong><br />
                  Hibiz Solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/projects" className="group p-8 border border-border hover:border-primary transition-all duration-300 rounded-lg">
              <h3 className="font-display text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                Projects
              </h3>
              <p className="text-muted-foreground">
                Explore my latest work and technical projects
              </p>
            </Link>
            <Link to="/skills" className="group p-8 border border-border hover:border-primary transition-all duration-300 rounded-lg">
              <h3 className="font-display text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                Skills
              </h3>
              <p className="text-muted-foreground">
                Technical expertise and competencies
              </p>
            </Link>
            <Link to="/experience" className="group p-8 border border-border hover:border-primary transition-all duration-300 rounded-lg">
              <h3 className="font-display text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                Experience
              </h3>
              <p className="text-muted-foreground">
                Professional background and achievements
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
