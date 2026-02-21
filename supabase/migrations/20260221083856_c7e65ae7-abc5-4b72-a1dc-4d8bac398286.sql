
-- Make resumes bucket public so PDFs can be viewed
UPDATE storage.buckets SET public = true WHERE id = 'resumes';

-- Add storage policy for public read access
CREATE POLICY "Public can view resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

-- Allow authenticated users to upload resumes
CREATE POLICY "Authenticated users can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes' AND auth.uid() IS NOT NULL);

-- Allow authenticated users to delete their resumes
CREATE POLICY "Authenticated users can delete resumes"
ON storage.objects FOR DELETE
USING (bucket_id = 'resumes' AND auth.uid() IS NOT NULL);
