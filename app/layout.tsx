import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SecurityProvider } from "@/components/SecurityProvider";

export const metadata: Metadata = {
  title: "উৎসব | Interactive Digital Invitation Platform",
  description:
    "A premium mobile-first digital invitation platform featuring tactile opening ceremonies, multi-zone scratch reveals, and physical stationery depth.",
  openGraph: {
    title: "উৎসব | Interactive Digital Invitations",
    description: "Experience invitations transformed into interactive ceremonial memories.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#FAF8F5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Serif+Bengali:wght@400;600;700&family=Hind+Siliguri:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-ceremonial-parchment-light text-ceremonial-ink antialiased selection:bg-ceremonial-gold-light/40 selection:text-ceremonial-ink select-none">
        <SecurityProvider>
          {children}
        </SecurityProvider>
      </body>
    </html>
  );
}
