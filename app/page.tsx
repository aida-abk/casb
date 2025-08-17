"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const greetings = [
  "Сәлеметсіз бе", // Kazakh
  "Салом", // Tajik / Uzbek (Latin)
  "Салам", // Kyrgyz
  "Сәлем", // Kazakh informal
  "Салам алейкум", // regionally common greeting
  "Ассалом алейкум",
  "Сәлемет", // Turkmen variant
];

function useRotatingText(items: string[], intervalMs: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);
  return items[index];
}

export default function Home() {
  const greeting = useRotatingText(greetings, 2200);

  // TODO: wire to backend/DB
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [nextEventAt, setNextEventAt] = useState<Date | null>(null);

  useEffect(() => {
    // Placeholder: simulate loading
    const timeout = setTimeout(() => {
      setMemberCount(29);
      // Set a sample upcoming date 10 days from now at 6pm
      const d = new Date();
      d.setDate(d.getDate() + 10);
      d.setHours(18, 0, 0, 0);
      setNextEventAt(d);
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  const countdown = useMemo(() => {
    if (!nextEventAt) return null;
    const diff = nextEventAt.getTime() - Date.now();
    if (diff <= 0) return "Happening now";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}d ${hours}h ${minutes}m`;
  }, [nextEventAt]);

  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
          <div>
            <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
              <span className="text-lg sm:text-2xl">🇰🇿</span>
              <span className="text-lg sm:text-2xl">🇰🇬</span>
              <span className="text-lg sm:text-2xl">🇹🇯</span>
              <span className="text-lg sm:text-2xl">🇹🇲</span>
              <span className="text-lg sm:text-2xl">🇺🇿</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border px-2 sm:px-3 py-1 text-xs text-muted-foreground">
              <span>Central Asian Students at Brown</span>
            </div>
            <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {greeting}! Welcome to <span className="text-primary">CASB</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-prose">
              A home for Central Asian culture, community, and celebration at Brown University.
              Explore music, food, languages, art, and traditions across the region.
            </p>

            <div className="mt-6 sm:mt-8 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 bg-gradient-to-br from-muted/40 to-muted/20 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground">Our Mission</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
                The Central Asian Students at Brown (CASB) aims to build an inclusive community that celebrates the diverse cultures, histories, and identities of Central Asia. Our mission is to foster cultural exchange, create a welcoming space for students of Central Asian descent, and engage the wider Brown community through educational events and holiday celebrations.
              </p>
            </div>

            {/* <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-xl border p-4 sm:p-5">
                <p className="text-xs uppercase text-muted-foreground">Members</p>
                <p className="mt-1 text-2xl sm:text-3xl font-semibold">
                  {memberCount ?? "…"}
                </p>
              </div>
              <div className="rounded-xl border p-4 sm:p-5">
                <p className="text-xs uppercase text-muted-foreground">Next event</p>
                <p className="mt-1 text-2xl sm:text-3xl font-semibold">
                  {countdown ?? "Loading…"}
                </p>
              </div>
            </div> */}

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
              <Link href="/explorer" className="rounded-lg bg-primary text-primary-foreground px-3 sm:px-4 py-2 text-sm font-medium hover:opacity-90">
                Explore Central Asia
              </Link>
              <Link href="/events" className="rounded-lg border px-3 sm:px-4 py-2 text-sm hover:bg-accent">
                See Upcoming Events
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm sm:max-w-md md:max-w-none">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl border">
              <Image
                src="/casb-hero-pattern.png"
                alt="CASB Central Asian pattern"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-3 sm:mt-4 text-xs text-muted-foreground">
              Visual identity inspired by Central Asian embroidery and ornament. Generated with{" "}
              <Link href="https://www.midjourney.com/" target="_blank" rel="noopener noreferrer">
                <u>Midjourney</u>
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
