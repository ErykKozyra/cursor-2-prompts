import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import LearnMoreButton from "./components/LearnMoreButton";
import WelcomeMessage from "./components/WelcomeMessage";

export const metadata: Metadata = {
  title: "NextMap - Interactive Mapping Application",
  description:
    "A modern, accessible mapping application built with Next.js. Explore locations, save favorites, and access them from anywhere.",
  keywords: [
    "map",
    "interactive",
    "accessibility",
    "next.js",
    "react",
    "location",
    "navigation",
  ],
  authors: [{ name: "NextMap Team" }],
  openGraph: {
    title: "NextMap - Interactive Mapping Application",
    description: "A modern, accessible mapping application built with Next.js",
    url: "https://nextmap.example.com",
    siteName: "NextMap",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextMap - Interactive Mapping Application",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-4xl w-full">
        <section aria-labelledby="welcome-heading">
          <h1
            id="welcome-heading"
            className="text-4xl font-bold mb-4 text-gray-900 text-center"
          >
            Welcome to NextMap
          </h1>
          <p className="text-xl mb-8 text-gray-800 text-center">
            A modern, accessible mapping application built with Next.js
          </p>

          {/* Personalized welcome message */}
          <WelcomeMessage />
        </section>

        <section
          aria-labelledby="features-heading"
          className="grid md:grid-cols-2 gap-6 mt-8"
        >
          <h2 id="features-heading" className="sr-only">
            Application Features
          </h2>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">
              Interactive Map
            </h3>
            <p className="text-gray-800 mb-4">
              Explore our interactive map centered on Poland. Search for any
              location worldwide and get detailed information.
            </p>
            <div className="flex justify-between items-center">
              <Link
                href="/map"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Navigate to the interactive map page"
              >
                Explore Map
              </Link>
              <div className="text-blue-600" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">
              Accessibility First
            </h3>
            <p className="text-gray-800 mb-4">
              This application is built with accessibility in mind, following
              WCAG standards to ensure everyone can use it effectively.
            </p>
            <div className="flex justify-between items-center">
              <div>
                <LearnMoreButton topic="Accessibility">
                  <p className="text-gray-800 mb-2">
                    Our application follows the Web Content Accessibility
                    Guidelines (WCAG) 2.1 Level AA to ensure that all users,
                    including those with disabilities, can effectively use our
                    services.
                  </p>
                  <p className="text-gray-800">
                    Key features include keyboard navigation, screen reader
                    support, sufficient color contrast, and responsive design
                    for all devices.
                  </p>
                </LearnMoreButton>
              </div>
              <div className="text-green-600" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="tech-heading" className="mt-12">
          <h2
            id="tech-heading"
            className="text-2xl font-bold mb-4 text-center text-gray-900"
          >
            Built with Modern Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="font-medium text-gray-800">Next.js</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="font-medium text-gray-800">React</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="font-medium text-gray-800">TypeScript</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="font-medium text-gray-800">Tailwind CSS</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="font-medium text-gray-800">Leaflet</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
