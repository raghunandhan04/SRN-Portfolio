import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, FileText, Loader2, Download } from "lucide-react";
import { motion } from "framer-motion";

interface ResumeViewerProps {
  resumeUrl: string;
  fullName: string;
}

export const ResumeViewer = ({ resumeUrl, fullName }: ResumeViewerProps) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchResume = useCallback(async () => {
    if (blobUrl) return;
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(resumeUrl);
      if (!response.ok) throw new Error("Failed to fetch");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [resumeUrl, blobUrl]);

  const handleOpenChange = (open: boolean) => {
    if (open) fetchResume();
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }} className="w-full sm:w-auto">
          <Button
            size="lg"
            variant="outline"
            className="text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto border-border/50 hover:bg-muted/50 hover:border-primary/50 transition-all duration-300 group"
          >
            <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
            View My Resume
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between gap-4">
            <span>Resume — {fullName}</span>
            <div className="flex items-center gap-3">
              {blobUrl && (
                <a
                  href={blobUrl}
                  download={`${fullName.replace(/\s+/g, '_')}_Resume.pdf`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              )}
              <a
                href={blobUrl || resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                Open in new tab
              </a>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0 rounded-lg overflow-hidden border border-border">
          {loading && (
            <div className="w-full h-full flex items-center justify-center bg-muted/30">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <Loader2 className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
          )}
          {error && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-muted/30 p-6 text-center">
              <FileText className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground">Unable to load resume preview.</p>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Download Resume instead
              </a>
            </div>
          )}
          {blobUrl && !loading && !error && (
            <iframe
              src={`${blobUrl}#toolbar=1&navpanes=0`}
              className="w-full h-full"
              title="Resume PDF"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
