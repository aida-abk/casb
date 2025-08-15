"use client";

import { useEffect, useMemo, useState } from "react";
import { Gift, PartyPopper, CalendarDays } from "lucide-react";

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

  const monthIndex: Record<string, number> = {
    Jan: 0,
    January: 0,
    Feb: 1,
    February: 1,
    Mar: 2,
    March: 2,
    Apr: 3,
    April: 3,
    May: 4,
    Jun: 5,
    June: 5,
    Jul: 6,
    July: 6,
    Aug: 7,
    August: 7,
    Sep: 8,
    September: 8,
    Oct: 9,
    October: 9,
    Nov: 10,
    November: 10,
    Dec: 11,
    December: 11,
  };

  const birthdays = useMemo(
    () => [
      { name: "Damir", month: "January", day: 4 },
      { name: "Aida", month: "January", day: 14 },
      { name: "Nurana", month: "April", day: 26 },
      { name: "Komron", month: "June", day: 5 },
      { name: "Aidin", month: "June", day: 14 },
      { name: "Daniyal", month: "July", day: 5 },
      { name: "Anand", month: "July", day: 13 },
      { name: "Bekarys", month: "August", day: 19 },
      { name: "Anel", month: "August", day: 22 },
      { name: "Alloma", month: "September", day: 30 },
      { name: "Naile", month: "October", day: 8 },
      { name: "Ayana", month: "November", day: 11 },
    ],
    []
  );

  const enriched = useMemo(() => {
    const now = new Date();
    return birthdays.map((b) => {
      const year = now.getMonth() > monthIndex[b.month] || (now.getMonth() === monthIndex[b.month] && now.getDate() > b.day)
        ? now.getFullYear() + 1
        : now.getFullYear();
      const nextDate = new Date(year, monthIndex[b.month], b.day);
      const diffMs = nextDate.getTime() - now.getTime();
      const daysUntil = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return { ...b, nextDate, daysUntil };
    }).sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime());
  }, [birthdays]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold">Celebration Station</h1>
        <p className="mt-3 text-muted-foreground max-w-prose">
          Count down to major regional holidays and celebrate our members.
        </p>
      </div>

      <section className="rounded-2xl border p-6">
        <div className="flex items-center gap-2">
          <PartyPopper className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Next major holiday: Nowruz</h2>
        </div>
        <p className="text-3xl font-bold mt-2">{countdown}</p>
        <p className="text-sm text-muted-foreground mt-2">March 21 • Spring festival observed across Central Asia</p>
      </section>

      {/* Upcoming Birthdays Carousel */}
      <section className="rounded-2xl border p-6">
        <div className="flex items-center gap-2 mb-3">
          <Gift className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Upcoming Birthdays</h2>
        </div>
        <div className="-mx-2 overflow-x-auto pb-2">
          <div className="flex gap-3 px-2 min-w-max">
            {enriched.slice(0, 8).map((b) => (
              <div
                key={`${b.name}-${b.day}-${b.month}`}
                className="relative shrink-0 w-56 rounded-xl border overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 dark:from-zinc-800 dark:via-zinc-800/80 dark:to-zinc-800"
              >
                <div className="p-4">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" /> {b.month} {b.day}
                  </div>
                  <div className="mt-2 text-lg font-semibold flex items-center gap-2">
                    <span>🎂</span>
                    <span>{b.name}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{b.daysUntil === 0 ? 'today!' : `in ${b.daysUntil} days`}</div>
                </div>
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-200/50 blur-xl" />
                <div className="absolute -left-6 -bottom-6 h-16 w-16 rounded-full bg-pink-200/50 blur-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Birthday Grid */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Birthday Calendar</h2>
        <p className="text-sm text-muted-foreground">Here are all the birthdays we have on file.</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enriched.map((b) => (
            <div
              key={`${b.name}-${b.day}-${b.month}-grid`}
              className="rounded-xl border p-4 hover:shadow-sm transition-shadow bg-background"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{b.name}</div>
                  <div className="text-sm text-muted-foreground">{b.month} {b.day}</div>
                </div>
                <div className={`text-xs rounded-full border px-2 py-0.5 ${b.daysUntil === 0 ? 'bg-amber-200/60 text-foreground' : 'bg-secondary'}`}>{b.daysUntil === 0 ? 'Today!' : `${b.daysUntil} days`}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 



