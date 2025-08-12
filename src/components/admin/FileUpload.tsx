import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

interface FileUploadProps {
  bucket: string;
  userId: string;
  currentUrl?: string;
  onUploadComplete: (url: string) => void;
  accept: string;
  label: string;
}

export const FileUpload = ({ bucket, userId, currentUrl, onUploadComplete, accept, label }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      onUploadComplete(data.publicUrl);
      
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    onUploadComplete("");
  };

  return (
    <div>
      <Label htmlFor={`file-${bucket}`}>{label}</Label>
      <div className="flex items-center gap-2 mt-1">
        <Input
          id={`file-${bucket}`}
          type="file"
          accept={accept}
          onChange={uploadFile}
          disabled={uploading}
          className="flex-1"
        />
        {currentUrl && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={removeFile}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      {uploading && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
      {currentUrl && (
        <div className="mt-2">
          <a 
            href={currentUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <Upload className="w-3 h-3" />
            View current file
          </a>
        </div>
      )}
    </div>
  );
};