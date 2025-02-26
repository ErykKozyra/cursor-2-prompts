-- Create saved_locations table
CREATE TABLE IF NOT EXISTS saved_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index for faster queries by user_id
CREATE INDEX IF NOT EXISTS saved_locations_user_id_idx ON saved_locations(user_id);

-- Set up Row Level Security (RLS)
ALTER TABLE saved_locations ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can only view their own saved locations
CREATE POLICY "Users can view their own saved locations"
  ON saved_locations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own saved locations
CREATE POLICY "Users can insert their own saved locations"
  ON saved_locations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own saved locations
CREATE POLICY "Users can update their own saved locations"
  ON saved_locations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can only delete their own saved locations
CREATE POLICY "Users can delete their own saved locations"
  ON saved_locations
  FOR DELETE
  USING (auth.uid() = user_id); 