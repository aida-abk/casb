export const mainPlaylistUrl = "https://open.spotify.com/playlist/3rb2UuWNdyGwc3RUV8KODN?si=7fdf1cce656e4950";

// Seed regional playlists; fill in real curated playlists as you get them
export const regionalPlaylists: Array<{
  country: string;
  title: string;
  description: string;
  spotifyUrl?: string;
}> = [
  {
    country: "Kazakhstan",
    title: "Kazakh Folk & Modern",
    description: "From dombra to contemporary Kazakh pop",
    // Curated playlist
    spotifyUrl: "https://open.spotify.com/playlist/3a1MAij63mdLbmMqDpyfUe?si=18ee8ceab8064434",
  },
  {
    country: "Uzbekistan",
    title: "Uzbek Classical & Folk",
    description: "Maqom traditions and modern Uzbek music",
    spotifyUrl: "https://open.spotify.com/playlist/3wAqfItbxyeOo0EXRa4V9A?si=b762fbf4bb8b4565",
  },
  {
    country: "Kyrgyzstan",
    title: "Kyrgyz Mountain Melodies",
    description: "Traditional komuz and contemporary Kyrgyz artists",
    spotifyUrl: "https://open.spotify.com/playlist/7fQvz9q1BjVPCEEbnp8JUO?si=7c9fbb2255cb41cf",
  },
  {
    country: "Tajikistan",
    title: "Tajik Classical & Folk",
    description: "Pamiri music and Tajik pop",
    spotifyUrl: "https://open.spotify.com/playlist/3J9XRsYV3Mj2YniZiNsoz5?si=5e461b5c50fe4ee6",
  },
  {
    country: "Turkmenistan",
    title: "Turkmen Sounds",
    description: "Traditional and modern Turkmen music",
    spotifyUrl: "https://open.spotify.com/playlist/0T5gmkC5fDBZ76Ba51FTtn?si=2f6fd4a929c74b31",
  },
];
