"use client";

import { useEffect, useState } from "react";

function useCountdown(target?: Date) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!target) return "";
  const diff = target.getTime() - now;
  if (diff <= 0) return "Today!";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export default function CelebrationsPage() {
  const nextNowruz = new Date(new Date().getFullYear(), 2, 21); // March 21
  if (Date.now() > nextNowruz.getTime()) nextNowruz.setFullYear(nextNowruz.getFullYear() + 1);
  const countdown = useCountdown(nextNowruz);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold">Celebration Station</h1>
        <p className="mt-3 text-muted-foreground max-w-prose">
          Count down to major regional holidays and celebrate our members.
        </p>
      </div>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Next major holiday: Nowruz</h2>
        <p className="text-3xl font-bold mt-2">{countdown}</p>
        <p className="text-sm text-muted-foreground mt-2">March 21 • Spring festival observed across Central Asia</p>
      </section>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Birthday Calendar</h2>
        <p className="text-sm text-muted-foreground">With permission, we’ll list member birthdays here.</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[{name: "Anel", date: "Aug 28"}, {name: "Alloma", date: "Oct 3"}, {name: "Aida", date: "Jan 14"}].map((b) => (
            <div key={b.name} className="rounded-xl border p-4">
              <div className="font-medium">{b.name}</div>
              <div className="text-sm text-muted-foreground">{b.date}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 


// Damir Jan 4
// Aida Jan 14
// Nurana April 26
// Komron June 5
// Aidin June 14
// Daniyal July 5
// Anand July 13
// Bekarys August 19
// Anel August 22
// Alloma Sep 30
// Naile October 8
// Ayana November 11
