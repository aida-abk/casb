"use client";

import { useState } from "react";
import { mainPlaylistUrl, regionalPlaylists } from "../../../lib/music-playlists";

const songOfTheMonth = {
  title: "Kara Jorgo",
  artist: "Kyrgyz Traditional",
  description: "A traditional Kyrgyz folk song celebrating the nomadic spirit and connection to nature.",
  spotifyId: "https://open.spotify.com/track/4plmN5loSi0dJAEQYf218I?si=c8baf0ca4e064a4d"
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

      {/* CASB Playlist */}
      <section className="rounded-2xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">CASB Playlist — brownistan</h2>
          <a
            className="text-sm underline"
            href={mainPlaylistUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Spotify
          </a>
        </div>
        <div className="w-full">
          <iframe
            title="CASB Spotify Playlist"
            src={mainPlaylistUrl.replace("open.spotify.com/", "open.spotify.com/embed/").split("?")[0]}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </section>

      {/* Song of the Month */}


      {/* Regional Playlists */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Regional Playlists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {regionalPlaylists.map((pl) => {
            const embedSrc = pl.spotifyUrl
              ? pl.spotifyUrl.replace("open.spotify.com/", "open.spotify.com/embed/").split("?")[0]
              : null;
            return (
              <div key={pl.country} className="rounded-2xl border p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold">{pl.title}</div>
                    <div className="text-sm text-muted-foreground">{pl.country}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{pl.description}</p>
                {embedSrc ? (
                  <iframe
                    title={`${pl.country} Playlist`}
                    src={embedSrc}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-video rounded-lg bg-secondary grid place-items-center text-muted-foreground">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🎵</div>
                      <div className="text-xs">Playlist coming soon</div>
                    </div>
                  </div>
                )}
                <a
                  className="block text-center w-full mt-3 rounded-lg border px-3 py-2 text-sm hover:bg-accent transition-colors"
                  href={pl.spotifyUrl ?? `https://open.spotify.com/search/${encodeURIComponent(pl.country + " music playlist")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Spotify
                </a>
              </div>
            );
          })}
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