import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, FileText, Loader2 } from "lucide-react";

interface ResumeViewerProps {
  resumeUrl: string;
  fullName: string;
}

export const ResumeViewer = ({ resumeUrl, fullName }: ResumeViewerProps) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchResume = useCallback(async () => {
    if (blobUrl) return; // Already fetched
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
    if (open) {
      fetchResume();
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground min-h-[48px] px-6 py-3 text-base touch-manipulation"
        >
          <FileText className="w-5 h-5 mr-2" />
          View My Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between gap-4">
            <span>Resume — {fullName}</span>
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
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0 rounded-lg overflow-hidden border border-border">
          {loading && (
            <div className="w-full h-full flex items-center justify-center bg-muted/30">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
