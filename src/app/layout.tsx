import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { AuthProvider } from "./context/AuthContext";
import ToastProvider from "./components/ui/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Separate viewport export as required by Next.js 15+
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    template: "%s | NextMap",
    default: "NextMap - Interactive Map Application",
  },
  description:
    "Explore and save locations worldwide with our interactive map application",
  keywords: [
    "map",
    "interactive",
    "location",
    "navigation",
    "next.js",
    "react",
  ],
  authors: [{ name: "NextMap Team" }],
  creator: "NextMap Team",
  publisher: "NextMap",
  metadataBase: new URL("https://nextmap.example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextmap.example.com",
    siteName: "NextMap",
    title: "NextMap - Interactive Map Application",
    description:
      "Explore and save locations worldwide with our interactive map application",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextMap - Interactive Map Application",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextMap - Interactive Map Application",
    description:
      "Explore and save locations worldwide with our interactive map application",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col`}
      >
        <AuthProvider>
          {/* Toast notifications */}
          <ToastProvider />

          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Skip to main content
          </a>

          <Navigation />

          <main id="main-content" className="flex-grow">
            {children}
          </main>

          <footer className="bg-gray-50 border-t border-gray-200 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="md:flex md:items-center md:justify-between">
                <div className="text-center md:text-left">
                  <p className="text-base text-gray-700">
                    &copy; {new Date().getFullYear()} NextMap. All rights
                    reserved.
                  </p>
                </div>
                <nav className="mt-4 md:mt-0" aria-label="Footer navigation">
                  <ul className="flex flex-wrap justify-center md:justify-end gap-4">
                    <li>
                      <a
                        href="#"
                        className="text-gray-700 hover:text-blue-700 hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-700 hover:text-blue-700 hover:underline"
                      >
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-700 hover:text-blue-700 hover:underline"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
