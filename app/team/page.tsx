"use client";

import { useState } from "react";
import Image from "next/image";

type Country = "Kazakhstan" | "Uzbekistan" | "Kyrgyzstan" | "Tajikistan" | "Turkmenistan";

interface Member {
  name: string;
  role: string;
  country: Country;
  major: string;
  favoriteFood: string;
  avatar: string;
}

const countryMeta: Record<Country, { flag: string; accent: string; photo: string }> = {
  Kazakhstan: { flag: "🇰🇿", accent: "text-sky-700", photo: "/team/kazakhstan.jpg" },
  Uzbekistan: { flag: "🇺🇿", accent: "text-emerald-700", photo: "/team/uzbekistan.jpg" },
  Kyrgyzstan: { flag: "🇰🇬", accent: "text-red-700", photo: "/team/kyrgyzstan.jpg" },
  Tajikistan: { flag: "🇹🇯", accent: "text-rose-700", photo: "/team/tajikistan.jpg" },
  Turkmenistan: { flag: "🇹🇲", accent: "text-green-700", photo: "/team/turkmenistan.jpg" },
};

const members: Member[] = [
  { name: "Anel", role: "President", country: "Kazakhstan", major: "Computer Science", favoriteFood: "Beshbarmak", avatar: "/team/anel.jpeg" },
  { name: "Aidin", role: "VP Events", country: "Uzbekistan", major: "Economics", favoriteFood: "Plov", avatar: "/team/aidin.png" },
  { name: "Maria", role: "Cultural Lead", country: "Kyrgyzstan", major: "International Relations", favoriteFood: "Kuurdak", avatar: "/team/maria.png" },
  { name: "Alloma", role: "Social Media", country: "Tajikistan", major: "Public Health", favoriteFood: "Qurutob", avatar: "/team/alloma.jpeg" },
  { name: "Aida", role: "Communications", country: "Turkmenistan", major: "Design", favoriteFood: "Ichlekli", avatar: "/team/aida.jpeg" },
];

function FlipCard({ member, index }: { member: Member; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const meta = countryMeta[member.country];

  return (
    <button
      aria-label={`${member.name} card`}
      onClick={() => setFlipped((f) => !f)}
      className="group relative h-72 w-full [perspective:1000px] focus:outline-none"
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl border overflow-hidden [backface-visibility:hidden]">
          <Image src={member.avatar} alt={member.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative h-full w-full p-5 flex flex-col justify-between text-white">
            <div className="text-3xl drop-shadow-sm">{countryMeta[member.country].flag}</div>
            <div>
              <div className="text-sm opacity-90">{member.role}</div>
              <div className="text-xl font-bold leading-tight">{member.name}</div>
              <div className={`text-xs opacity-90 ${countryMeta[member.country].accent}`}>{member.country}</div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 rounded-2xl border bg-card p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="h-full w-full flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-lg font-semibold">{member.name}</div>
              <div className="text-sm text-muted-foreground">{member.role} • {countryMeta[member.country].flag} {member.country}</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><span>🎓</span> <span>Major: {member.major}</span></div>
              <div className="flex items-center gap-2"><span>🍽️</span> <span>Favorite: {member.favoriteFood}</span></div>
              <div className="flex items-center gap-2"><span>🏳️</span> <span>Represents: {member.country}</span></div>
            </div>
            <div className="text-xs text-muted-foreground">Tap to flip • Smooth 3D</div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">Meet Our Team</h1>
      <p className="mt-3 text-muted-foreground max-w-prose">
        Click a card to flip and learn more about each leader.
      </p>

      {/* Responsive grid that handles 5 elegantly */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {members.map((m, i) => (
          <div key={m.name} className="transition-transform duration-300 hover:scale-[1.02]">
            <FlipCard member={m} index={i} />
          </div>
        ))}
      </div>

      {/* Beyond Leadership */}
      <section className="mt-14 rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Beyond Leadership</h2>
        <p className="mt-2 text-muted-foreground">
          CASB is a vibrant community of <span className="font-semibold">20+ members</span> across disciplines at Brown. 
          We host cultural nights, cooking sessions, film screenings, language exchanges, and regional celebrations.
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl border p-4 bg-secondary">🎉 Monthly Cultural Events</div>
          <div className="rounded-xl border p-4 bg-secondary">🥘 Cooking Workshops</div>
          <div className="rounded-xl border p-4 bg-secondary">🗣️ Language & Music Sessions</div>
        </div>
      </section>


    </div>
  );
} 