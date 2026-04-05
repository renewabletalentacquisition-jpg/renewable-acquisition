-- Allow anonymous users (frontend) to insert applicants
CREATE POLICY "anon can insert applicants" ON public.applicants
  FOR INSERT WITH CHECK (true);

-- Allow service role to read all applicants (admin dashboard)
CREATE POLICY "service role can read" ON public.applicants
  FOR SELECT USING (true);
