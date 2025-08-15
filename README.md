# CASB — Central Asian Students at Brown

Next.js 15 + Tailwind CSS 4. A community site for CASB with cultural explorer and events.

## Quick start

```bash
pnpm dev # or npm run dev / yarn dev
```

Open http://localhost:3000

## Assets
- Place the club logo at `public/casb-logo.png` (square works best) — used in the navbar.
- Place a decorative hero background at `public/casb-hero-pattern.png`.
- Team photos can go under `public/team/` (update filenames in `app/team/page.tsx`).

## Pages
- `/` — Hero with rotating greetings, live member count and countdown (placeholders).
- `/our-story` — Interactive timeline scaffold.
- `/team` — Team cards with hover fun facts.
- `/explorer` — Hub linking to Music, Recipes, Traditions, Tours, Language, Art.
- `/events` — Google Calendar embed placeholder, RSVP form scaffold, photo stories.
- `/celebrations` — Holiday countdown and birthday calendar placeholders.

## Integrations (to wire up)
- Google Calendar: embed iframe or use API to render upcoming events.
- RSVP: connect form to Google Forms, Notion, or a tiny DB route.
- Spotify: use oEmbed iframes for tracks/playlists.
- Instagram: use the embed kit or a server-side fetch to proxy media.
- Weather/Clocks: call public APIs (OpenWeather, worldtimeapi) from server routes.
