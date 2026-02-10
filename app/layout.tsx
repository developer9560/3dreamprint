import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  title: "Custom Lithophane Gifts | Personalized 3D Photo Lamps & Keychains",
  description: "Create stunning personalized lithophane gifts - custom 3D printed photo lamps, keychains, and frames. Transform your memories into beautiful glowing art. Fast delivery, handcrafted quality.",
  keywords: "lithophane, custom photo lamp, personalized gifts, 3D printed gifts, photo keychain, custom lithophane, personalized lamp",
  authors: [{ name: "Lithophane Studio" }],
  openGraph: {
    title: "Custom Lithophane Gifts - Transform Photos into Glowing Art",
    description: "Personalized 3D photo lamps, keychains & frames. Unique handcrafted gifts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${lato.variable} antialiased`}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
