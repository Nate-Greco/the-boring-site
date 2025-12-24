import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Boring Notch - Transform Your MacBook's Notch",
  description: "Transform your MacBook's notch into a dynamic experience. Music controls, file shelf, calendar, and more. 100% Free & Open Source.",
  keywords: ["macbook", "notch", "dynamic island", "macos", "app", "open source", "music player", "productivity"],
  authors: [{ name: "TheBoringTeam" }],
  openGraph: {
    title: "Boring Notch - Transform Your MacBook's Notch",
    description: "Transform your MacBook's notch into a dynamic experience. Music controls, file shelf, calendar, and more.",
    url: "https://theboring.name",
    siteName: "Boring Notch",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boring Notch - Transform Your MacBook's Notch",
    description: "Transform your MacBook's notch into a dynamic experience. 100% Free & Open Source.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}