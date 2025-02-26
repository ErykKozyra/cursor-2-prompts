import type { Metadata, Viewport } from "next";

// Add viewport export for Next.js 15+
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Your Profile | NextMap",
  description: "View and manage your profile and saved locations on NextMap.",
  keywords: ["profile", "saved locations", "user account", "map locations"],
  openGraph: {
    title: "Your Profile | NextMap",
    description: "View and manage your profile and saved locations on NextMap.",
    url: "https://nextmap.example.com/profile",
    siteName: "NextMap",
    images: [
      {
        url: "/og-profile.png",
        width: 1200,
        height: 630,
        alt: "NextMap User Profile",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
