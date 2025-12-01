import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, BookOpen, Link } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

export default function PublicationsPage() {
    const [expandedPublication, setExpandedPublication] = useState<number | null>(null);

    // Sort: in-progress first, then by date desc
    const parseDate = (d?: string) => {
        if (!d) return 0;
        try {
            // Handle formats like "July 26, 2025" and "July, 2025"
            const normalized = d.replace(/\s+/g, ' ').trim().replace(/,$/, '');
            const date = new Date(normalized);
            if (!isNaN(date.getTime())) return date.getTime();
            // Fallback: try appending day if missing
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

    return (
        <section id="publications" className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Publications
                </h2>
                <div className="space-y-6 mb-8">
                    {sortedPublications.map((publication, index) => (
                        <Reveal key={index} delay={index * 0.05}>
                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <Collapsible open={expandedPublication === index} onOpenChange={() => setExpandedPublication(expandedPublication === index ? null : index)}>
                                <CollapsibleTrigger asChild>
                                    <div className="w-full cursor-pointer">
                                        <CardHeader className="hover:bg-muted/50 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <CardTitle className="text-foreground text-left flex items-center gap-2 mb-2">
                                                        <BookOpen className="w-5 h-5 text-primary" />
                                                        {publication.title}
                                                    </CardTitle>
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-foreground/70">
                                                        <span className="font-medium text-primary">{publication.publisher}</span>
                                                        <span className="hidden sm:inline">•</span>
                                                        <span>{publication.date}</span>
                                                        {publication.status && (
                                                            <>
                                                                <span className="hidden sm:inline">•</span>
                                                                <Badge variant="outline" className="w-fit">
                                                                    {publication.status}
                                                                </Badge>
                                                            </>
                                                        )}
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
                                            <p className="text-foreground/80 leading-relaxed">
                                                {publication.description}
                                            </p>
                                            <div className="flex flex-wrap gap-4 items-center">
                                                {publication.link && (
                                                    <a href={publication.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors" onClick={e => e.stopPropagation()}>
                                                        <Link className="w-4 h-4" />
                                                        View Publication
                                                    </a>
                                                )}
                                                {publication.isbn && (
                                                    <div className="text-sm text-foreground/70">
                                                        <span className="font-medium">ISBN:</span> {publication.isbn}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </CollapsibleContent>
                            </Collapsible>
                        </Card>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
