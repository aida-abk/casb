import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "../components/site-header";
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
  title: "CASB • Central Asian Students at Brown",
  description: "Community, culture, and connection for Central Asian Students at Brown University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} CASB — Central Asian Students at Brown</p>
            <div className="flex items-center gap-4">
              <Link href="/events" className="hover:underline">Join an event</Link>
              <Link href="/team" className="hover:underline">Contact leadership</Link>
            </div>
            <div className="flex items-center gap-4">
              <a href="mailto:casb@brown.edu" className="hover:underline">casb@brown.edu</a>
              <a href="https://www.instagram.com/centralasiabrown/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
              <a href="https://t.me/+TlRMHnQXuUZiZTUy" target="_blank" rel="noopener noreferrer" className="hover:underline">Telegram</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
