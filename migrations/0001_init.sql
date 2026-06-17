-- Harder & Warner — initial schema
-- Apply locally:  npm run db:migrate:local
-- Apply remote:   npm run db:migrate:remote
--
-- One table per interactive surface from the sitemap. The future /admin
-- dashboard reads from these.

-- Contact form
CREATE TABLE IF NOT EXISTS contact_submissions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  message    TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Bulk mulch / stone / topsoil ordering (rebuild of existing tool)
CREATE TABLE IF NOT EXISTS mulch_orders (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name   TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  delivery_address TEXT,
  product         TEXT NOT NULL,        -- e.g. 'hardwood-mulch'
  quantity_yards  REAL NOT NULL,
  delivery_date   TEXT,
  notes           TEXT,
  status          TEXT NOT NULL DEFAULT 'new',  -- new | confirmed | delivered | cancelled
  total_cents     INTEGER,
  created_at      TEXT NOT NULL
);

-- Garden center class registrations
CREATE TABLE IF NOT EXISTS class_registrations (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  class_slug   TEXT NOT NULL,
  class_title  TEXT NOT NULL,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  party_size   INTEGER NOT NULL DEFAULT 1,
  notes        TEXT,
  status       TEXT NOT NULL DEFAULT 'registered',
  created_at   TEXT NOT NULL
);

-- Design & build leads (get-matched + consultation requests)
CREATE TABLE IF NOT EXISTS design_leads (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  source       TEXT NOT NULL,           -- 'get-matched' | 'consultation'
  project_type TEXT,
  budget       TEXT,
  details      TEXT,
  status       TEXT NOT NULL DEFAULT 'new',
  created_at   TEXT NOT NULL
);

-- Tree farm quote requests
CREATE TABLE IF NOT EXISTS tree_quotes (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  species      TEXT,
  quantity     INTEGER,
  details      TEXT,
  status       TEXT NOT NULL DEFAULT 'new',
  created_at   TEXT NOT NULL
);

-- Professional services commercial bid requests
CREATE TABLE IF NOT EXISTS bid_requests (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  company       TEXT,
  contact_name  TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  service_type  TEXT NOT NULL,          -- 'maintenance' | 'snow-ice' | 'both'
  property_address TEXT,
  details       TEXT,
  status        TEXT NOT NULL DEFAULT 'new',
  created_at    TEXT NOT NULL
);

-- Careers applications (interactive form added later)
CREATE TABLE IF NOT EXISTS job_applications (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  position     TEXT,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  message      TEXT,
  resume_key   TEXT,                    -- R2 object key if/when we accept uploads
  status       TEXT NOT NULL DEFAULT 'new',
  created_at   TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_created   ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_mulch_status      ON mulch_orders(status, created_at);
CREATE INDEX IF NOT EXISTS idx_class_slug        ON class_registrations(class_slug);
CREATE INDEX IF NOT EXISTS idx_design_status     ON design_leads(status, created_at);
CREATE INDEX IF NOT EXISTS idx_bid_status        ON bid_requests(status, created_at);
