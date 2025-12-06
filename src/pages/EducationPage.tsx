import { GraduationCap, Award, Calendar } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";

const educationData = [
  {
    degree: "BE Automobile Engineering",
    institution: "Madras Institute of Technology (MIT), Anna University",
    period: "2021 - 2025",
    score: "CGPA: 8.06",
    highlight: true
  },
  {
    degree: "Minor Degree in Artificial Intelligence and Machine Learning",
    institution: "Madras Institute of Technology (MIT), Anna University",
    period: "2023 - 2025",
    score: "CGPA: 9.0",
    highlight: true
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Chinmaya Vidyalaya - CBSE",
    period: "2018 - 2020",
    score: "Percentage: 95.2%"
  },
  {
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "Chinmaya Vidyalaya - CBSE",
    period: "2016 - 2018",
    score: "Percentage: 94.4%"
  }
];

export default function EducationPage() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">Education</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Academic background in engineering and artificial intelligence
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 hidden md:block" />

          <div className="space-y-6">
            {educationData.map((edu, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <motion.div
                  className="relative md:ml-16"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-[52px] top-6 w-4 h-4 rounded-full hidden md:block ring-4 ring-background ${
                    edu.highlight 
                      ? 'bg-gradient-to-r from-primary to-accent' 
                      : 'bg-muted-foreground/50'
                  }`} />

                  <div className={`glass rounded-2xl border overflow-hidden ${
                    edu.highlight 
                      ? 'border-primary/30' 
                      : 'border-border/50'
                  }`}>
                    {/* Gradient accent for highlighted items */}
                    {edu.highlight && (
                      <div className="h-1 bg-gradient-to-r from-primary to-accent" />
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          edu.highlight 
                            ? 'bg-gradient-to-br from-primary/20 to-accent/20' 
                            : 'bg-muted/50'
                        }`}>
                          <GraduationCap className={`w-6 h-6 ${
                            edu.highlight ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                            {edu.degree}
                          </h3>
                          <p className="text-primary font-medium mb-3">{edu.institution}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="flex items-center gap-1.5 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {edu.period}
                            </span>
                            <span className="flex items-center gap-1.5 text-foreground font-medium">
                              <Award className="w-4 h-4 text-primary" />
                              {edu.score}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
