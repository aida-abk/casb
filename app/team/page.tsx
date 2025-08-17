"use client";

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

const countryMeta: Record<Country, { flag: string; accent: string }> = {
  Kazakhstan: { flag: "🇰🇿", accent: "text-sky-700" },
  Uzbekistan: { flag: "🇺🇿", accent: "text-emerald-700" },
  Kyrgyzstan: { flag: "🇰🇬", accent: "text-red-700" },
  Tajikistan: { flag: "🇹🇯", accent: "text-rose-700" },
  Turkmenistan: { flag: "🇹🇲", accent: "text-green-700" },
};

const members: Member[] = [
  { name: "Anel", role: "President", country: "Kazakhstan", major: "Cognitive Neuroscience", favoriteFood: "Beshbarmak", avatar: "/team/anel.jpeg" },
  { name: "Aidin", role: "Treasurer", country: "Kyrgyzstan", major: "Computer Science", favoriteFood: "Plov", avatar: "/team/aidin.png" },
  { name: "Maria", role: "Treasurer", country: "Kazakhstan", major: "Public Health", favoriteFood: "Beshbarmak", avatar: "/team/maria.png" },
  { name: "Alloma", role: "Social Media", country: "Uzbekistan", major: "IAPA & Economics", favoriteFood: "Plov", avatar: "/team/alloma.jpeg" },
  { name: "Bahar", role: "Event Planner", country: "Turkmenistan", major: "Computer Engineering", favoriteFood: "Manty", avatar: "/team/bahar.png" },
  { name: "Aida", role: "Webdev", country: "Kazakhstan", major: "Neuroscience & Computer Science", favoriteFood: "Quyrdak", avatar: "/team/aida.jpeg" },
];

function MemberCard({ member }: { member: Member }) {
  const meta = countryMeta[member.country];

  return (
    <div className="group rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="p-4">
        {/* Header with avatar and basic info */}
        <div className="flex items-start gap-3 mb-3">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-muted">
            <Image 
              src={member.avatar} 
              alt={member.name} 
              fill 
              className="object-cover transition-transform duration-300 group-hover:scale-110" 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{meta.flag}</span>
              <span className={`text-xs font-medium ${meta.accent}`}>{member.country}</span>
            </div>
            <h3 className="text-lg font-semibold leading-tight mb-1">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
        </div>

        {/* Details section */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-base">🎓</span>
            <span className="text-sm">{member.major}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-base">🍽️</span>
            <span className="text-sm">Loves {member.favoriteFood}</span>
          </div>
        </div>

        {/* Subtle accent line */}
        <div className={`mt-3 h-0.5 w-8 rounded-full ${meta.accent.replace('text-', 'bg-')} transition-all duration-300 group-hover:w-12`} />
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Meet Our Team</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Our leadership team represents the diverse cultures and backgrounds of Central Asia, 
          bringing together expertise from across Brown University.
        </p>
      </div>

      {/* Compact grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {members.map((member) => (
          <MemberCard key={member.name} member={member} />
        ))}
      </div>

      {/* Community section */}
      <section className="mt-12 rounded-2xl border bg-gradient-to-br from-background to-muted/30 p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">Beyond Leadership</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            CASB is a vibrant community of <span className="font-semibold text-foreground">20+ members</span> across disciplines at Brown. 
            We host cultural nights, cooking sessions, film screenings, language exchanges, and regional celebrations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border bg-card p-4 text-center">
            <div className="text-xl mb-2">🎉</div>
            <div className="font-medium text-sm">Monthly Cultural Events</div>
            <div className="text-xs text-muted-foreground mt-1">Celebrating our heritage</div>
          </div>
          <div className="rounded-xl border bg-card p-4 text-center">
            <div className="text-xl mb-2">🥘</div>
            <div className="font-medium text-sm">Cooking Workshops</div>
            <div className="text-xs text-muted-foreground mt-1">Traditional recipes</div>
          </div>
          <div className="rounded-xl border bg-card p-4 text-center">
            <div className="text-xl mb-2">🗣️</div>
            <div className="font-medium text-sm">Language & Music</div>
            <div className="text-xs text-muted-foreground mt-1">Cultural exchange</div>
          </div>
        </div>
      </section>
    </div>
  );
} 