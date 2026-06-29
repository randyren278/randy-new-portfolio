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

// iMessage / Slack / etc. strip `og:site_name` from the front of `og:title`
// when site_name is a prefix, leaving just "Portfolio" rendered above the
// card image. To suppress that label without also blanking the browser-tab
// <title>, override only the OG/Twitter titles with an invisible string
// (U+200E LEFT-TO-RIGHT MARK + a regular space). Unfurls render this as
// effectively empty; the card image carries all the visible identity.
const INVISIBLE_TITLE = "‎ ";

export const metadata: Metadata = {
  metadataBase: new URL("https://randyren.org"),
  title: "Randy Ren — Portfolio",
  description: "Randy Ren — building agents and the interfaces around them.",
  openGraph: {
    title: INVISIBLE_TITLE,
    description: "Randy Ren — building agents and the interfaces around them.",
    url: "https://randyren.org",
    siteName: "Randy Ren",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: INVISIBLE_TITLE,
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