import type { Metadata, Viewport } from "next";

// Add viewport export for Next.js 15+
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Interactive Map | NextMap",
  description:
    "Explore our interactive map, search for locations worldwide, and save your favorite places.",
  keywords: [
    "map",
    "interactive",
    "location search",
    "saved locations",
    "navigation",
  ],
  openGraph: {
    title: "Interactive Map | NextMap",
    description:
      "Explore our interactive map, search for locations worldwide, and save your favorite places.",
    url: "https://nextmap.example.com/map",
    siteName: "NextMap",
    images: [
      {
        url: "/og-map.png",
        width: 1200,
        height: 630,
        alt: "NextMap Interactive Map",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
