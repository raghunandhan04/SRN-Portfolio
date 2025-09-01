import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function EducationPage() {
  return (
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
  );
}
