"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("../components/map/MapComponent"), {
  ssr: false,
  loading: () => (
    <div
      className="flex justify-center items-center h-[500px] bg-gray-100"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"
        aria-hidden="true"
      ></div>
      <span className="sr-only">Loading map component...</span>
    </div>
  ),
});

// Metadata should be in a separate layout.tsx file or in a server component
// export const metadata = {
//   title: "Interactive Map | NextMap",
//   description:
//     "Interactive map of Poland with search functionality for any location worldwide",
// };

export default function MapPage() {
  const { isAuthenticated } = useAuth();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    // Show auth prompt after a delay if user is not authenticated
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setShowAuthPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Interactive Map</h1>

      <div
        className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-200"
        aria-label="Map container"
      >
        <MapComponent />
      </div>

      {showAuthPrompt && !isAuthenticated && (
        <div
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
          role="alert"
        >
          <p className="text-blue-900 mb-2 font-medium">
            Sign in to save your favorite locations and access them from
            anywhere.
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Sign in or create an account to save locations"
          >
            Sign in or create an account
          </Link>
        </div>
      )}

      <section
        className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        aria-labelledby="about-map-heading"
      >
        <h2
          id="about-map-heading"
          className="text-xl font-semibold text-gray-900 mb-4"
        >
          About This Map
        </h2>
        <p className="text-gray-900 mb-4">
          This interactive map allows you to explore locations around the world.
          You can search for specific places, view details, and save your
          favorite locations.
        </p>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Features:</h3>
        <ul className="list-disc pl-5 text-gray-900 space-y-2 mb-4">
          <li>Search for any location worldwide</li>
          <li>Click on the map to get location details</li>
          <li>Save your favorite locations (requires sign in)</li>
          <li>View your saved locations in your profile</li>
        </ul>
        <p className="text-gray-900">
          The map is centered on Poland by default, but you can navigate to any
          location by using the search box or dragging the map.
        </p>
      </section>
    </main>
  );
}
