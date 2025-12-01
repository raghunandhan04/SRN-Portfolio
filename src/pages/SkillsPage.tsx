import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skills = {
  Frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
  Backend: ['Python', 'FastAPI', '.NET'],
  Database: ['MySQL', 'PostgreSQL', 'MongoDB'],
  Tools: ['Git', 'GitHub', 'Power BI', 'VS Code', 'Catia V5'],
  'AI/ML': ['Machine Learning', 'TensorFlow', 'Artificial Intelligence', 'Data Analysis', 'Deep Learning', 'Reinforcement Learning']
};

export default function SkillsPage() {
  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Object.entries(skills).map(([category, skillList]) => (
            <Card key={category} className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-primary text-lg sm:text-xl">{category}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {skillList.map(skill => (
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
  );
}
