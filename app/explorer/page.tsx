"use client";

import Link from "next/link";
import { useState } from "react";

const countries = [
  { name: "Kazakhstan", flag: "🇰🇿", capital: "Astana", population: "19M", area: "2.7M km²", color: "bg-blue-500", fact: "Home to the world's largest space launch facility" },
  { name: "Kyrgyzstan", flag: "🇰🇬", capital: "Bishkek", population: "6.5M", area: "200K km²", color: "bg-red-500", fact: "Known as the 'Switzerland of Central Asia' for its mountains" },
  { name: "Tajikistan", flag: "🇹🇯", capital: "Dushanbe", population: "9.5M", area: "143K km²", color: "bg-green-500", fact: "93% of the country is mountainous" },
  { name: "Turkmenistan", flag: "🇹🇲", capital: "Ashgabat", population: "6M", area: "488K km²", color: "bg-yellow-500", fact: "Home to the 'Gates of Hell' - a burning gas crater" },
  { name: "Uzbekistan", flag: "🇺🇿", capital: "Tashkent", population: "34M", area: "447K km²", color: "bg-blue-600", fact: "Samarkand is one of the oldest inhabited cities in the world" },
];

const sections = [
  { href: "/explorer/music", title: "Music Hub", emoji: "🎵", desc: "Curated playlists and Song of the Month." },
  { href: "/explorer/recipes", title: "Recipe Collection", emoji: "🍽️", desc: "Step-by-step cooking from the region." },
  { href: "/explorer/traditions", title: "Traditions Calendar", emoji: "🎭", desc: "What's being celebrated now." },
  { href: "/explorer/tours", title: "Virtual City Tours", emoji: "🏛️", desc: "Photo stories across CA cities." },
  { href: "/explorer/language", title: "Language Corner", emoji: "📚", desc: "Phrases and fun translations." },
  { href: "/explorer/art", title: "Art & Crafts", emoji: "🎨", desc: "Patterns and modern interpretations." },
];

export default function ExplorerPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">Central Asian Explorer</h1>
      <p className="mt-3 text-muted-foreground max-w-prose">
        Click a country or dive into a cultural area.
      </p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Interactive Country Map */}
          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold mb-4">Central Asian Countries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {countries.map((country) => (
                <div
                  key={country.name}
                  className={`relative rounded-xl border p-4 cursor-pointer transition-all duration-200 hover:scale-105 ${
                    selectedCountry === country.name ? 'ring-2 ring-primary' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedCountry(selectedCountry === country.name ? null : country.name)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <div className="font-semibold">{country.name}</div>
                      <div className="text-sm text-muted-foreground">{country.capital}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>Population: {country.population}</div>
                    <div>Area: {country.area}</div>
                  </div>

                  {selectedCountry === country.name && (
                    <div className="mt-3 p-3 bg-secondary rounded-lg">
                      <div className="text-sm font-medium">Did you know?</div>
                      <div className="text-xs text-muted-foreground mt-1">{country.fact}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border p-4 text-center">
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-xs text-muted-foreground">Countries</div>
            </div>
            <div className="rounded-xl border p-4 text-center">
              <div className="text-2xl font-bold text-primary">75M+</div>
              <div className="text-xs text-muted-foreground">Total Population</div>
            </div>
            <div className="rounded-xl border p-4 text-center">
              <div className="text-2xl font-bold text-primary">4M</div>
              <div className="text-xs text-muted-foreground">km² Area</div>
            </div>
            <div className="rounded-xl border p-4 text-center">
              <div className="text-2xl font-bold text-primary">100+</div>
              <div className="text-xs text-muted-foreground">Languages</div>
            </div>
          </div>
        </div>

        {/* Cultural Sections */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Explore Culture</h2>
          {sections.map((s) => (
            <Link 
              key={s.href} 
              href={s.href} 
              className="group rounded-xl border p-4 hover:bg-accent transition-colors duration-200"
            >
              <div className="font-semibold flex items-center gap-2">
                <span className="text-xl group-hover:scale-110 transition-transform duration-200">{s.emoji}</span>
                {s.title}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 