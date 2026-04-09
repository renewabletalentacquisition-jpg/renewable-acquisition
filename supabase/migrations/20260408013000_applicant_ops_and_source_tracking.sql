ALTER TABLE public.applicants
  ADD COLUMN IF NOT EXISTS source text,
  ADD COLUMN IF NOT EXISTS source_detail text,
  ADD COLUMN IF NOT EXISTS heard_about text,
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_content text,
  ADD COLUMN IF NOT EXISTS utm_term text,
  ADD COLUMN IF NOT EXISTS booking_status text DEFAULT 'not_booked',
  ADD COLUMN IF NOT EXISTS applicant_status text DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS priority_bucket text DEFAULT 'standard',
  ADD COLUMN IF NOT EXISTS next_action text,
  ADD COLUMN IF NOT EXISTS last_contact_at timestamptz,
  ADD COLUMN IF NOT EXISTS booked_at timestamptz,
  ADD COLUMN IF NOT EXISTS internal_notes text;

UPDATE public.applicants
SET
  booking_status = COALESCE(booking_status, 'not_booked'),
  applicant_status = COALESCE(applicant_status, 'new'),
  priority_bucket = COALESCE(priority_bucket, CASE
    WHEN outcome = 'qualified' THEN 'speed-to-lead'
    WHEN outcome = 'review' THEN 'review-fast'
    ELSE 'archive'
  END),
  next_action = COALESCE(next_action, CASE
    WHEN outcome = 'qualified' THEN 'Call, text, and email within 15 minutes. Push straight to Calendly.'
    WHEN outcome = 'review' THEN 'Fast manual review. Escalate strong maybes the same morning.'
    ELSE 'No action needed.'
  END);

ALTER TABLE public.applicants
  ALTER COLUMN booking_status SET DEFAULT 'not_booked',
  ALTER COLUMN applicant_status SET DEFAULT 'new',
  ALTER COLUMN priority_bucket SET DEFAULT 'standard';

CREATE INDEX IF NOT EXISTS applicants_priority_bucket_idx ON public.applicants (priority_bucket);
CREATE INDEX IF NOT EXISTS applicants_booking_status_idx ON public.applicants (booking_status);
CREATE INDEX IF NOT EXISTS applicants_source_idx ON public.applicants (source);
CREATE INDEX IF NOT EXISTS applicants_created_at_idx ON public.applicants (created_at DESC);
