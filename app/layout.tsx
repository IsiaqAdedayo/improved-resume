import type { Metadata } from "next";
import { Cormorant_Garamond, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Adedayo Showande — Senior Frontend Engineer",
  description:
    "Senior Frontend Engineer with 4+ years building production-grade web applications. Based in Lagos, Nigeria.",
  keywords: ["Frontend Engineer", "React", "Next.js", "TypeScript", "Lagos", "Fullstack Engineer"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${syne.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
