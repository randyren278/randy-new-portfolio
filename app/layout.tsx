import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://randyren.org"),
  title: "Randy Ren — Portfolio",
  description: "Randy Ren — building agents and the interfaces around them.",
  openGraph: {
    title: "Randy Ren — Portfolio",
    description: "Randy Ren — building agents and the interfaces around them.",
    url: "https://randyren.org",
    siteName: "Randy Ren",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Randy Ren — Portfolio",
    description: "Randy Ren — building agents and the interfaces around them.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}