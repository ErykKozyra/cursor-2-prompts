import type { Metadata, Viewport } from "next";

// Add viewport export for Next.js 15+
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Authentication | NextMap",
  description: "Sign in or create an account to access all features of NextMap",
  keywords: ["login", "sign up", "authentication", "account", "register"],
  openGraph: {
    title: "Authentication | NextMap",
    description:
      "Sign in or create an account to access all features of NextMap",
    url: "https://nextmap.example.com/auth",
    siteName: "NextMap",
    images: [
      {
        url: "/og-auth.png",
        width: 1200,
        height: 630,
        alt: "NextMap Authentication",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
