import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "MSDI Product Algérie | L'Excellence Made in Algeria",
  description: "A high-end Algerian cosmetic brand combining quality, innovation, and accessibility. Discover our premium nail care collections.",
  openGraph: {
    title: "MSDI Product Algérie | L'Excellence Made in Algeria",
    description: "Premium nail products crafted in Algeria.",
    siteName: "MSDI Product Algérie",
    locale: "fr_DZ",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased text-obsidian bg-ivory selection:bg-rubis selection:text-ivory relative`}
      >
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  );
}
