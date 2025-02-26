import { supabase } from "./supabase";
import { SavedLocation } from "./types";

export async function getSavedLocations(
  userId: string
): Promise<SavedLocation[]> {
  const { data, error } = await supabase
    .from("saved_locations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching saved locations:", error);
    return [];
  }

  // Map the snake_case database fields to camelCase for the frontend
  return (data || []).map((item) => ({
    id: item.id,
    userId: item.user_id,
    name: item.name,
    latitude: item.latitude,
    longitude: item.longitude,
    description: item.description,
    createdAt: item.created_at,
  }));
}

export async function saveLocation(
  location: Omit<SavedLocation, "id" | "createdAt">
): Promise<SavedLocation | null> {
  // Convert from camelCase to snake_case for the database
  const dbLocation = {
    user_id: location.userId,
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
    description: location.description,
  };

  const { data, error } = await supabase
    .from("saved_locations")
    .insert([dbLocation])
    .select()
    .single();

  if (error) {
    console.error("Error saving location:", error);
    return null;
  }

  // Map back to camelCase for the frontend
  return data
    ? {
        id: data.id,
        userId: data.user_id,
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        description: data.description,
        createdAt: data.created_at,
      }
    : null;
}

export async function deleteLocation(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("saved_locations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting location:", error);
    return false;
  }

  return true;
}
