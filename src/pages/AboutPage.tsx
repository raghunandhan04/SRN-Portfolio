import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          About Me
        </h2>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
              I am a dedicated Full Stack Developer with a strong background in Automobile Engineering and a passionate pursuit in Artificial Intelligence and Machine Learning.
              My journey spans from mechanical engineering to software development, bringing a unique perspective to problem-solving.
              I specialize in creating efficient, scalable solutions using modern technologies like React, Python, and machine learning frameworks.
              <br /><br />
              Currently focused on developing impactful applications that bridge the gap between traditional engineering and cutting-edge AI/ML technologies.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
