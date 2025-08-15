"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close drawer on route change (basic: close on hash/location change)
  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <Image src="/casb-logo.png" alt="CASB logo" width={40} height={40} className="rounded-full border border-border object-cover" />
          <span>CASB</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-5 text-sm">
          <Link href="/our-story" className="hover:underline">Our Story</Link>
          <Link href="/team" className="hover:underline">Meet Our Team</Link>
          <Link href="/explorer" className="hover:underline">Explorer</Link>
          <Link href="/events" className="hover:underline">Events</Link>
          <Link href="/celebrations" className="hover:underline">Celebrations</Link>
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="sm:hidden p-2 rounded-md border hover:bg-secondary"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={`sm:hidden fixed inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />

      {/* Slide-in drawer */}
      <aside
        className={`sm:hidden fixed right-0 top-0 h-dvh w-72 bg-background border-l z-[60] transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="font-semibold">Menu</span>
          <button aria-label="Close menu" className="p-2 rounded-md border hover:bg-secondary" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-2">
          <Link href="/our-story" className="block px-3 py-2 rounded-md hover:bg-secondary" onClick={() => setOpen(false)}>Our Story</Link>
          <Link href="/team" className="block px-3 py-2 rounded-md hover:bg-secondary" onClick={() => setOpen(false)}>Meet Our Team</Link>
          <Link href="/explorer" className="block px-3 py-2 rounded-md hover:bg-secondary" onClick={() => setOpen(false)}>Explorer</Link>
          <Link href="/events" className="block px-3 py-2 rounded-md hover:bg-secondary" onClick={() => setOpen(false)}>Events</Link>
          <Link href="/celebrations" className="block px-3 py-2 rounded-md hover:bg-secondary" onClick={() => setOpen(false)}>Celebrations</Link>
        </nav>
      </aside>
    </header>
  );
}

export default SiteHeader;


