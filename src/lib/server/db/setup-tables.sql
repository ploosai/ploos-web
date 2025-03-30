-- Create waitlist_signups table if it doesn't exist
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create contact_submissions table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  responded BOOLEAN DEFAULT FALSE,
  response_notes TEXT
);

-- Create indices
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_signups (email);
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions (email);
CREATE INDEX IF NOT EXISTS idx_contact_responded ON contact_submissions (responded); 