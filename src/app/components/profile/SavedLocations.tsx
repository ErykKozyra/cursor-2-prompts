"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { getSavedLocations, deleteLocation } from "@/lib/locationService";
import { SavedLocation } from "@/lib/types";
import toast from "react-hot-toast";

export default function SavedLocations() {
  const { user } = useAuth();
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    async function loadLocations() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const userLocations = await getSavedLocations(user.id);
        setLocations(userLocations);
      } catch (err) {
        console.error("Error loading saved locations:", err);
        setError(
          "Failed to load your saved locations. Please try again later."
        );
        toast.error(
          "Failed to load your saved locations. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadLocations();
  }, [user]);

  const handleDeleteLocation = async (
    locationId: string,
    locationName: string
  ) => {
    if (!user) return;

    setIsDeleting(locationId);

    try {
      const success = await deleteLocation(locationId);

      if (success) {
        // Remove the deleted location from the state
        setLocations(locations.filter((loc) => loc.id !== locationId));
        toast.success(`"${locationName}" has been deleted`);
      } else {
        setError("Failed to delete location. Please try again.");
        toast.error("Failed to delete location. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting location:", err);
      setError("An error occurred while deleting the location.");
      toast.error("An error occurred while deleting the location.");
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-4" aria-live="polite" aria-busy="true">
        <span className="sr-only">Loading your saved locations...</span>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4" role="alert">
        <p className="text-red-700 font-medium">{error}</p>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="py-4">
        <p className="text-gray-900">
          You haven&apos;t saved any locations yet.
        </p>
        <Link
          href="/map"
          className="mt-2 inline-block text-blue-700 hover:text-blue-900 hover:underline font-medium"
          aria-label="Go to the map to save your favorite places"
        >
          Go to the map to save your favorite places
        </Link>
      </div>
    );
  }

  return (
    <section className="py-4" aria-labelledby="saved-locations-heading">
      <h3
        id="saved-locations-heading"
        className="text-lg font-medium text-gray-900 mb-4"
      >
        Your Saved Locations
      </h3>
      <div className="space-y-4">
        {locations.map((location) => (
          <div
            key={location.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
              <div>
                <h4 className="font-medium text-gray-900">{location.name}</h4>
                <p className="text-sm text-gray-900 mt-1">
                  Lat: {location.latitude.toFixed(6)}, Lng:{" "}
                  {location.longitude.toFixed(6)}
                </p>
                {location.description && (
                  <p className="text-sm text-gray-900 mt-2">
                    {location.description}
                  </p>
                )}
                <p className="text-xs text-gray-700 mt-2">
                  Saved on {new Date(location.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-4">
                <Link
                  href={`/map?lat=${location.latitude}&lng=${
                    location.longitude
                  }&name=${encodeURIComponent(location.name)}`}
                  className="text-blue-700 hover:text-blue-900 hover:underline text-sm font-medium"
                  aria-label={`View ${location.name} on map`}
                >
                  View on Map
                </Link>
                <button
                  onClick={() =>
                    handleDeleteLocation(location.id, location.name)
                  }
                  disabled={isDeleting === location.id}
                  className="text-red-700 hover:text-red-900 hover:underline text-sm font-medium disabled:text-red-400"
                  aria-busy={isDeleting === location.id}
                  aria-label={`Delete ${location.name}`}
                >
                  {isDeleting === location.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
