import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";
import { Code2, Server, Database, Wrench, Brain } from "lucide-react";

const skillCategories = [
  {
    name: "Frontend",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React']
  },
  {
    name: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    skills: ['Python', 'FastAPI', '.NET']
  },
  {
    name: "Database",
    icon: Database,
    color: "from-orange-500 to-amber-500",
    skills: ['MySQL', 'PostgreSQL', 'MongoDB']
  },
  {
    name: "Tools",
    icon: Wrench,
    color: "from-purple-500 to-pink-500",
    skills: ['Git', 'GitHub', 'Power BI', 'VS Code', 'Catia V5']
  },
  {
    name: "AI/ML",
    icon: Brain,
    color: "from-primary to-accent",
    skills: ['Machine Learning', 'TensorFlow', 'AI', 'Data Analysis', 'Deep Learning', 'Reinforcement Learning']
  }
];

export default function SkillsPage() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">Skills & Technologies</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technical expertise across full-stack development, AI/ML, and data engineering
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Reveal key={category.name} delay={index * 0.1}>
              <motion.div 
                className="group relative glass rounded-2xl border border-border/50 p-6 h-full"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10 blur-xl`} />
                
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-2.5 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {category.name}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="bg-muted/70 hover:bg-primary/20 hover:text-primary transition-all duration-300 text-sm py-1.5 px-3 cursor-default"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Decorative element */}
        <div className="mt-20 text-center">
          <Reveal delay={0.5}>
            <p className="text-muted-foreground text-sm">
              Always learning, always growing
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
