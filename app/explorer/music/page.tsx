"use client";

import { useState } from "react";

const songOfTheMonth = {
  title: "Kara Jorgo",
  artist: "Kyrgyz Traditional",
  description: "A traditional Kyrgyz folk song celebrating the nomadic spirit and connection to nature.",
  spotifyId: "spotify:track:example123"
};

const playlists = [
  { 
    country: "Kazakhstan", 
    title: "Kazakh Folk & Modern",
    tracks: 45,
    description: "From traditional dombra melodies to contemporary Kazakh pop"
  },
  { 
    country: "Uzbekistan", 
    title: "Uzbek Classical & Folk",
    tracks: 38,
    description: "Maqam traditions and modern Uzbek music"
  },
  { 
    country: "Kyrgyzstan", 
    title: "Kyrgyz Mountain Melodies",
    tracks: 52,
    description: "Traditional komuz and contemporary Kyrgyz artists"
  },
  { 
    country: "Tajikistan", 
    title: "Tajik Classical & Folk",
    tracks: 41,
    description: "Traditional Pamiri music and modern Tajik sounds"
  },
];

export default function MusicHubPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold">Music Hub</h1>
        <p className="mt-3 text-muted-foreground max-w-prose">
          Curated playlists across the region. Connect Spotify to listen here.
        </p>
      </div>

      {/* Song of the Month */}
      <section className="rounded-2xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Song of the Month</h2>
          <span className="text-sm text-muted-foreground">March 2025</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{songOfTheMonth.title}</h3>
              <p className="text-muted-foreground">{songOfTheMonth.artist}</p>
            </div>
            <p className="text-sm text-muted-foreground">{songOfTheMonth.description}</p>
            <button 
              className="flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition-colors"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <span>{isPlaying ? "⏸️" : "▶️"}</span>
              {isPlaying ? "Pause" : "Play on Spotify"}
            </button>
          </div>
          
          <div className="aspect-square rounded-lg bg-secondary grid place-items-center text-muted-foreground">
            <div className="text-center">
              <div className="text-4xl mb-2">🎵</div>
              <div className="text-sm">Spotify Player</div>
              <div className="text-xs">(Connect your account)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Playlists */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Regional Playlists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {playlists.map((playlist) => (
            <div key={playlist.country} className="rounded-2xl border p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold">{playlist.title}</div>
                  <div className="text-sm text-muted-foreground">{playlist.country}</div>
                </div>
                <span className="text-xs text-muted-foreground">{playlist.tracks} tracks</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{playlist.description}</p>
              
              <div className="aspect-video rounded-lg bg-secondary grid place-items-center text-muted-foreground">
                <div className="text-center">
                  <div className="text-2xl mb-1">🎵</div>
                  <div className="text-xs">Spotify Playlist</div>
                </div>
              </div>
              
              <button className="w-full mt-3 rounded-lg border px-3 py-2 text-sm hover:bg-accent transition-colors">
                Open in Spotify
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Music Facts */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold mb-4">Did You Know?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-secondary rounded-lg">
            <div className="font-medium">Dombra</div>
            <div className="text-sm text-muted-foreground">Kazakhstan's national instrument with 2 strings</div>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <div className="font-medium">Komuz</div>
            <div className="text-sm text-muted-foreground">Kyrgyz 3-stringed lute, UNESCO heritage</div>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <div className="font-medium">Maqam</div>
            <div className="text-sm text-muted-foreground">Uzbek classical music tradition</div>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <div className="font-medium">Falak</div>
            <div className="text-sm text-muted-foreground">Tajik mountain folk music style</div>
          </div>
        </div>
      </section>
    </div>
  );
} 