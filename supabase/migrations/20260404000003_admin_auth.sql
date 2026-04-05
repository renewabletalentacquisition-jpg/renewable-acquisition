-- Allow authenticated users (admins) to read all applicants
CREATE POLICY "authenticated users can read all applicants" ON public.applicants
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update applicant status
CREATE POLICY "authenticated users can update applicants" ON public.applicants
  FOR UPDATE USING (auth.role() = 'authenticated');
