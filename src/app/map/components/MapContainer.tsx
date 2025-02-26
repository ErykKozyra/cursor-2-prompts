"use client";

import { useEffect, useState, useRef } from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

// Warsaw coordinates
const WARSAW_POSITION: [number, number] = [52.2297, 21.0122];
// Poland center coordinates and zoom level for initial view
const POLAND_CENTER: [number, number] = [52.0693, 19.4803];
const POLAND_ZOOM = 6;

interface SearchControlProps {
  position: [number, number];
  setPosition: (position: [number, number]) => void;
  setLocationName: (name: string) => void;
}

// Component to handle map updates when search is performed
function MapUpdater({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 13);
  }, [map, position]);

  return null;
}

// Search control component - remove unused parameter
function SearchControl({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  position,
  setPosition,
  setLocationName,
}: SearchControlProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a location to search");
      inputRef.current?.focus();
      return;
    }

    setIsSearching(true);
    setError("");

    try {
      // Using Nominatim API for geocoding (OpenStreetMap's geocoding service)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=1`
      );

      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setLocationName(display_name);
        // Announce to screen readers that the map has been updated
        const announcement = document.getElementById("map-announcement");
        if (announcement) {
          announcement.textContent = `Map updated to show ${display_name}`;
        }
      } else {
        setError("Location not found. Please try a different search term.");
        inputRef.current?.focus();
      }
    } catch (err) {
      setError("Error searching for location. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="absolute top-4 left-4 right-4 z-[1000] bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
      <div role="search" aria-label="Location search">
        <label htmlFor="location-search" className="sr-only">
          Search for a location
        </label>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              id="location-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a location..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              aria-describedby={error ? "search-error" : undefined}
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-busy={isSearching}
            >
              <span className={isSearching ? "sr-only" : undefined}>
                Search
              </span>
              {isSearching && <span aria-hidden="true">Searching...</span>}
            </button>
          </div>
          {error && (
            <p id="search-error" className="text-red-500 text-sm" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
      {/* Hidden element for screen reader announcements */}
      <div
        id="map-announcement"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      ></div>
    </div>
  );
}

// Remove unused props parameter completely
function MapComponent() {
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState<[number, number]>(WARSAW_POSITION);
  const [locationName, setLocationName] = useState("Warsaw, Poland");

  useEffect(() => {
    // Fix Leaflet icon issue
    import("leaflet").then((LeafletModule) => {
      // Fix any type by using proper type casting
      const iconPrototype = LeafletModule.Icon.Default.prototype as {
        _getIconUrl?: unknown;
      };
      delete iconPrototype._getIconUrl;

      LeafletModule.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });
    });

    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100">
        <p className="text-lg">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <SearchControl
        position={position}
        setPosition={setPosition}
        setLocationName={setLocationName}
      />

      <div
        aria-label="Interactive map showing location"
        role="region"
        className="h-full w-full"
      >
        <LeafletMap
          center={POLAND_CENTER}
          zoom={POLAND_ZOOM}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Modern minimalistic map style */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          <Marker position={position}>
            <Popup>
              <div>
                <h3 className="font-bold">Location</h3>
                <p className="text-sm max-w-[200px] break-words">
                  {locationName}
                </p>
              </div>
            </Popup>
          </Marker>

          <MapUpdater position={position} />
        </LeafletMap>
      </div>

      {/* Keyboard instructions for accessibility */}
      <div className="sr-only">
        <p>
          This map can be navigated using a mouse or touch. To zoom in, use the
          plus button or scroll wheel. To zoom out, use the minus button or
          scroll wheel. To pan, click and drag the map.
        </p>
      </div>
    </div>
  );
}

// Use dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center w-full h-full bg-gray-100"
      aria-live="polite"
    >
      <p className="text-lg">Loading map...</p>
    </div>
  ),
});

export default MapContainer;
