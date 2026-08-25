/*
# Create reservations table for AFB Taxis

1. New Tables
- `reservations`
  - `id` (uuid, primary key)
  - `first_name` (text, not null) — client's first name
  - `last_name` (text, not null) — client's last name
  - `phone` (text, not null) — client's phone number
  - `email` (text, nullable) — client's email
  - `pickup_date` (date, not null) — date of the trip
  - `pickup_time` (time, not null) — time of the trip
  - `pickup_location` (text, not null) — departure location
  - `dropoff_location` (text, not null) — arrival location
  - `passengers` (int, default 1) — number of passengers
  - `trip_type` (text, default 'aller_simple') — 'aller_simple' or 'aller_retour'
  - `special_needs` (text, nullable) — special requirements (child seat, medical transport, etc.)
  - `message` (text, nullable) — additional message from client
  - `status` (text, default 'nouveau') — 'nouveau', 'confirme', 'termine', 'annule'
  - `admin_notes` (text, nullable) — internal notes for admin
  - `created_at` (timestamptz, default now()) — when the reservation was submitted

2. Security
- Enable RLS on `reservations`.
- INSERT: allow anon + authenticated (public can submit reservations).
- SELECT/UPDATE/DELETE: authenticated only (admin can view and manage reservations).
*/

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  email text,
  pickup_date date NOT NULL,
  pickup_time time NOT NULL,
  pickup_location text NOT NULL,
  dropoff_location text NOT NULL,
  passengers int NOT NULL DEFAULT 1,
  trip_type text NOT NULL DEFAULT 'aller_simple',
  special_needs text,
  message text,
  status text NOT NULL DEFAULT 'nouveau',
  admin_notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Public can insert reservations (no sign-in required to submit a booking)
DROP POLICY IF EXISTS "public_insert_reservations" ON reservations;
CREATE POLICY "public_insert_reservations"
ON reservations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated (admin) can read reservations
DROP POLICY IF EXISTS "admin_select_reservations" ON reservations;
CREATE POLICY "admin_select_reservations"
ON reservations FOR SELECT
TO authenticated
USING (true);

-- Only authenticated (admin) can update reservations
DROP POLICY IF EXISTS "admin_update_reservations" ON reservations;
CREATE POLICY "admin_update_reservations"
ON reservations FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Only authenticated (admin) can delete reservations
DROP POLICY IF EXISTS "admin_delete_reservations" ON reservations;
CREATE POLICY "admin_delete_reservations"
ON reservations FOR DELETE
TO authenticated
USING (true);
