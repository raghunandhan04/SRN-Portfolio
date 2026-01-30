import { useState, memo, useCallback, useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import { ChevronDown, BookOpen, ExternalLink, Award } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { motion, AnimatePresence } from "framer-motion";

interface Publication {
  title: string;
  publisher: string;
  date: string;
  link?: string;
  conference?: string;
  isbn?: string;
  description: string;
  status?: string;
  award?: string;
}

const publicationsList: Publication[] = [
  {
    title: "Job Scheduling in Big Data Analytics Using Reinforcement Learning",
    publisher: "IEEE + Springer",
    date: "July 26, 2025",
    conference: "AISC 2025",
    description: "This paper explores advanced reinforcement learning techniques for optimizing job scheduling in big data analytics environments, improving efficiency and resource utilization.",
    status: "Publication in Process"
  },
  {
    title: "Personalised Learning Platform Using AI-Based Adaptive Systems",
    publisher: "IEEE",
    date: "June 27, 2025",
    link: "https://ieeexplore.ieee.org/document/11041038",
    description: "We created a custom Learning application that adapts content based on a student's mood, survey data, difficulty level, and motivation. Technologies: Emotion Detection, RL, DL, Sentiment Analysis."
  },
  {
    title: "Deep Learning-Based Tyre Wear Detection and Predictive Maintenance",
    publisher: "ISBN Conference",
    date: "April 28, 2025",
    isbn: "978-81-985702-6-0",
    description: "Presented at AISSEWS 2025. Focused on using Deep Learning and wireless sensor communication for predictive tyre maintenance in vehicles.",
    award: "Best Paper Award"
  },
  {
    title: "Effect of CNG Induction on DI Diesel Engine Performance",
    publisher: "Yanthrika",
    date: "December 26, 2023",
    link: "https://yanthrika.com/eja/index.php/ijvss/article/view/2755",
    description: "Explored how CNG induction influences engine performance and emissions, aimed at eco-friendly fuel alternatives."
  },
  {
    title: "Enhancing Learning Through AI-Based Performance Prediction and Emotion Detection",
    publisher: "Springer",
    date: "July, 2025",
    description: "Focuses on AI-driven performance prediction combined with emotion detection to personalize and enhance learning outcomes.",
    status: "Publication in progress"
  }
];

const PublicationCard = memo(function PublicationCard({
  publication,
  index,
  isExpanded,
  onToggle
}: {
  publication: Publication;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <Reveal delay={Math.min(index * 0.05, 0.2)}>
      <motion.article
        layout
        className="glass rounded-2xl border border-border/50 overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-primary/50"
        onClick={onToggle}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap mb-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {publication.title}
                  </h3>
                  {publication.award && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-xs">
                      <Award className="w-3 h-3 mr-1" aria-hidden="true" />
                      {publication.award}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-primary font-medium">{publication.publisher}</span>
                  <span className="text-muted-foreground" aria-hidden="true">•</span>
                  <time className="text-muted-foreground">{publication.date}</time>
                  {publication.status && (
                    <>
                      <span className="text-muted-foreground" aria-hidden="true">•</span>
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                        {publication.status}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="flex-shrink-0"
              aria-hidden="true"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-border/50 space-y-4">
                  <p className="text-foreground/80 leading-relaxed">
                    {publication.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    {publication.link && (
                      <motion.a
                        href={publication.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ x: 4 }}
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        View Publication
                      </motion.a>
                    )}
                    {publication.isbn && (
                      <span className="text-sm text-muted-foreground">
                        <span className="font-medium">ISBN:</span> {publication.isbn}
                      </span>
                    )}
                    {publication.conference && (
                      <span className="text-sm text-muted-foreground">
                        <span className="font-medium">Conference:</span> {publication.conference}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.article>
    </Reveal>
  );
});

function PublicationsPage() {
  const [expandedPublication, setExpandedPublication] = useState<number | null>(null);

  // Parse date for sorting
  const parseDate = useCallback((d?: string) => {
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
  }, []);

  // Sort: in-progress first, then by date desc
  const sortedPublications = useMemo(() => 
    [...publicationsList].sort((a, b) => {
      const aProgress = (a.status || '').toLowerCase().includes('progress');
      const bProgress = (b.status || '').toLowerCase().includes('progress');
      if (aProgress !== bProgress) return aProgress ? -1 : 1;
      return parseDate(b.date) - parseDate(a.date);
    }), 
  [parseDate]);

  const handleToggle = useCallback((index: number) => {
    setExpandedPublication(prev => prev === index ? null : index);
  }, []);

  const renderedPublications = useMemo(() => 
    sortedPublications.map((publication, index) => (
      <PublicationCard
        key={publication.title}
        publication={publication}
        index={index}
        isExpanded={expandedPublication === index}
        onToggle={() => handleToggle(index)}
      />
    )), 
  [sortedPublications, expandedPublication, handleToggle]);

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" aria-labelledby="publications-heading">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div className="text-center mb-16">
            <h1 id="publications-heading" className="font-display text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">Publications</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Research papers and conference publications in AI/ML and engineering domains
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" aria-hidden="true" />
          </div>
        </Reveal>

        <div className="space-y-4" role="list" aria-label="Publications list">
          {renderedPublications}
        </div>
      </div>
    </section>
  );
}

export default memo(PublicationsPage);
