"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAuth } from "@/app/context/AuthContext";
import { saveLocation } from "@/lib/locationService";
import { Map } from "leaflet";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface Location {
  lat: number;
  lng: number;
  name?: string;
}

// Component to handle map events
function MapEvents({
  onLocationClick,
}: {
  onLocationClick: (location: Location) => void;
}) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      onLocationClick({ lat, lng });
    },
  });
  return null;
}

export default function MapComponent() {
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [locationName, setLocationName] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setError] = useState("");
  const mapRef = useRef<Map | null>(null);
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fix Leaflet icon issue for Next.js
  useEffect(() => {
    // This code will only run in the browser
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  // Default center on Warsaw, Poland
  const defaultCenter: [number, number] = [52.2297, 21.0122];

  // Check for URL parameters
  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const name = searchParams.get("name");

    if (lat && lng) {
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);

      if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
        const location = {
          lat: parsedLat,
          lng: parsedLng,
          name: name || "Saved Location",
        };

        setSelectedLocation(location);
        setLocationName(location.name);

        // Center map on the location from URL params
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.setView([location.lat, location.lng], 13);
          }
        }, 100);
      }
    }
  }, [searchParams]);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setLocationName("");
    setLocationDescription("");
    setSaveSuccess(false);
    setError("");

    // Announce to screen readers that a location has been selected
    const announcement = document.getElementById("map-announcement");
    if (announcement) {
      announcement.textContent = "Location selected. Fetching details...";
    }

    // Reverse geocode to get location name
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.display_name) {
          const name = data.display_name.split(",")[0] || "New Location";
          setLocationName(name);

          // Update announcement for screen readers
          if (announcement) {
            announcement.textContent = `Location selected: ${name}`;
          }
        } else {
          setLocationName("New Location");

          // Update announcement for screen readers
          if (announcement) {
            announcement.textContent = "New location selected";
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching location name:", error);
        setLocationName("New Location");

        // Update announcement for screen readers
        if (announcement) {
          announcement.textContent = "New location selected";
        }
      });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Announce to screen readers that search is in progress
    const announcement = document.getElementById("map-announcement");
    if (announcement) {
      announcement.textContent = `Searching for ${searchQuery}...`;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const location = {
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          name: display_name,
        };

        setSelectedLocation(location);
        const simpleName = display_name.split(",")[0] || "New Location";
        setLocationName(simpleName);

        // Center map on the found location
        if (mapRef.current) {
          mapRef.current.setView([location.lat, location.lng], 13);
        }

        // Update announcement for screen readers
        if (announcement) {
          announcement.textContent = `Found location: ${simpleName}`;
        }
      } else {
        toast.error("No locations found. Try a different search term.");

        // Update announcement for screen readers
        if (announcement) {
          announcement.textContent =
            "No locations found. Try a different search term.";
        }
      }
    } catch (error) {
      console.error("Error searching for location:", error);
      toast.error("Error searching for location. Please try again.");

      // Update announcement for screen readers
      if (announcement) {
        announcement.textContent =
          "Error searching for location. Please try again.";
      }
    }
  };

  const handleSaveLocation = async () => {
    if (!isAuthenticated || !user || !selectedLocation) return;

    setIsSaving(true);
    setSaveSuccess(false);
    setError("");

    // Announce to screen readers that saving is in progress
    const announcement = document.getElementById("map-announcement");
    if (announcement) {
      announcement.textContent = "Saving location...";
    }

    try {
      const locationData = {
        userId: user.id,
        name: locationName || "New Location",
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        description: locationDescription || undefined,
      };

      const savedLocation = await saveLocation(locationData);

      if (savedLocation) {
        setSaveSuccess(true);
        setLocationName("");
        setLocationDescription("");
        setSelectedLocation(null);
        toast.success("Location saved successfully!");

        // Update announcement for screen readers
        if (announcement) {
          announcement.textContent = "Location saved successfully!";
        }
      } else {
        setError("Failed to save location. Please try again.");
        toast.error("Failed to save location. Please try again.");

        // Update announcement for screen readers
        if (announcement) {
          announcement.textContent =
            "Failed to save location. Please try again.";
        }
      }
    } catch (error) {
      console.error("Error saving location:", error);
      setError("An error occurred while saving the location.");
      toast.error("An error occurred while saving the location.");

      // Update announcement for screen readers
      if (announcement) {
        announcement.textContent =
          "An error occurred while saving the location.";
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Hidden element for screen reader announcements */}
      <div
        id="map-announcement"
        className="sr-only"
        aria-live="polite"
        role="status"
      >
        Interactive map loaded. Use the search box to find locations or click on
        the map to select a point.
      </div>

      <div className="p-4 bg-white border-b border-gray-200">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-2"
        >
          <label htmlFor="location-search" className="sr-only">
            Search for a location
          </label>
          <input
            id="location-search"
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            aria-label="Search for a location"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Search"
          >
            Search
          </button>
        </form>
      </div>

      <div className="relative h-[500px]" aria-label="Interactive map">
        <MapContainer
          center={defaultCenter}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
          whenReady={() => {
            console.log("Map is ready");
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapEvents onLocationClick={handleLocationClick} />

          {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {locationName || "Selected Location"}
                  </h3>
                  <p className="text-sm text-gray-900 mb-2">
                    Lat: {selectedLocation.lat.toFixed(6)}, Lng:{" "}
                    {selectedLocation.lng.toFixed(6)}
                  </p>

                  {isAuthenticated ? (
                    <div className="mt-3">
                      <label htmlFor="location-name" className="sr-only">
                        Location name
                      </label>
                      <input
                        id="location-name"
                        type="text"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        placeholder="Location name"
                        className="w-full px-3 py-1 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                        aria-label="Location name"
                      />
                      <label htmlFor="location-description" className="sr-only">
                        Location description
                      </label>
                      <textarea
                        id="location-description"
                        value={locationDescription}
                        onChange={(e) => setLocationDescription(e.target.value)}
                        placeholder="Add a description (optional)"
                        className="w-full px-3 py-1 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                        rows={2}
                        aria-label="Location description"
                      />
                      <button
                        onClick={handleSaveLocation}
                        disabled={isSaving}
                        className="w-full px-3 py-1 bg-blue-700 text-white rounded-md text-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
                        aria-busy={isSaving}
                      >
                        {isSaving ? "Saving..." : "Save Location"}
                      </button>

                      {saveSuccess && (
                        <p
                          className="mt-2 text-sm text-green-700 font-medium"
                          role="status"
                        >
                          Location saved successfully!
                        </p>
                      )}

                      {saveError && (
                        <p
                          className="mt-2 text-sm text-red-700 font-medium"
                          role="alert"
                        >
                          {saveError}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-blue-800 font-medium">
                      Sign in to save this location
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
