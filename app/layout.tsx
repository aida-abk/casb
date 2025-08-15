import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
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
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 font-semibold">
              <Image src="/casb-logo.png" alt="CASB logo" width={40} height={40} className="rounded-full border border-border object-cover" />
              <span>CASB</span>
            </Link>
            <nav className="flex items-center gap-5 text-sm">
              <Link href="/our-story" className="hover:underline">Our Story</Link>
              <Link href="/team" className="hover:underline">Meet Our Team</Link>
              <Link href="/explorer" className="hover:underline">Explorer</Link>
              <Link href="/events" className="hover:underline">Events</Link>
              <Link href="/celebrations" className="hover:underline">Celebrations</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} CASB — Central Asian Students at Brown</p>
            <div className="flex items-center gap-4">
              <Link href="/events" className="hover:underline">Join an event</Link>
              <Link href="/team" className="hover:underline">Contact leadership</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
