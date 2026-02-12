import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";

import Providers from "@/src/components/layouts/Providers";
import { AuthModalProvider } from "@/src/components/auth/AuthModalProvider";
import LayoutWrapper from "@/src/components/layouts/LayoutWrapper";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: 'swap',
});

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: "--font-lato",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://3dreamprint.in'),
  title: {
    default: "Custom Lithophane Gifts | Personalized 3D Photo Lamps & Keychains | 3DreamPrint",
    template: "%s | 3DreamPrint"
  },
  description: "Create stunning personalized lithophane gifts - custom 3D printed photo lamps, keychains, and frames. Transform your memories into beautiful glowing art. Fast delivery across India.",
  keywords: "lithophane, custom photo lamp, personalized gifts India, 3D printed lithophane, photo keychain India, custom lithophane lamp, personalized lamp, 3DreamPrint",
  authors: [{ name: "3DreamPrint Studio" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Custom Lithophane Gifts - Transform Photos into Glowing Art | 3DreamPrint",
    description: "Personalized 3D photo lamps, keychains & frames. Unique handcrafted gifts with fast delivery in India.",
    type: "website",
    url: 'https://3dreamprint.in',
    siteName: '3DreamPrint',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '3DreamPrint Custom Lithophane Lamps'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3DreamPrint | Custom Lithophane Gifts',
    description: 'Transform your photos into glowing 3D art.',
    images: ['/og-image.jpg'],
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${lato.variable} antialiased`}>
        <Providers>
          <AuthModalProvider />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
