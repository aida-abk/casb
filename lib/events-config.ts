import { EventConfig } from "../components/rsvp-system";

// Event configurations for CASB
// Update the formUrl fields with your actual Google Forms URLs
export const eventsConfig: EventConfig[] = [
  {
    id: "general-meeting",
    title: "General Meeting",
    description: "Join us for our weekly general meeting to discuss upcoming events and community updates.",
      formUrl: "https://forms.gle/HdgUCVFNApGdZNiX8", // TODO: Replace with actual form URL
    isActive: true,
    startDate: "2025-01-15",
    maxCapacity: 30,
    currentRSVPs: 12
  },
  {
    id: "cultural-night",
    title: "Central Asian Cultural Night",
    description: "Experience the rich cultures of Central Asia through food, music, and traditional performances.",
    formUrl: "https://forms.gle/your-cultural-night-form-id", // TODO: Replace with actual form URL
    isActive: true,
    startDate: "2025-02-20",
    maxCapacity: 50,
    currentRSVPs: 35
  },
  {
    id: "cooking-workshop",
    title: "Traditional Cooking Workshop",
    description: "Learn to cook authentic Central Asian dishes with our community members.",
    formUrl: "https://forms.gle/your-cooking-workshop-form-id", // TODO: Replace with actual form URL
    isActive: false,
    startDate: "2025-03-10",
    maxCapacity: 20,
    currentRSVPs: 0
  },
  {
    id: "nowruz-celebration",
    title: "Nowruz 2025 Celebration",
    description: "Celebrate the Persian New Year with traditional customs, food, and cultural activities.",
    formUrl: "https://forms.gle/your-nowruz-form-id", // TODO: Replace with actual form URL
    isActive: true,
    startDate: "2025-03-21",
    maxCapacity: 100,
    currentRSVPs: 78
  },
  {
    id: "language-exchange",
    title: "Language Exchange Session",
    description: "Practice Central Asian languages and learn from native speakers in a friendly environment.",
    formUrl: "https://forms.gle/your-language-exchange-form-id", // TODO: Replace with actual form URL
    isActive: true,
    startDate: "2025-01-25",
    maxCapacity: 25,
    currentRSVPs: 8
  },
  {
    id: "film-screening",
    title: "Central Asian Film Screening",
    description: "Watch and discuss films from Central Asian countries, exploring their rich cinematic traditions.",
    formUrl: "https://forms.gle/your-film-screening-form-id", // TODO: Replace with actual form URL
    isActive: false,
    startDate: "2025-02-15",
    maxCapacity: 40,
    currentRSVPs: 0
  }
];

// Helper functions for event management
export const getActiveEvents = () => eventsConfig.filter(event => event.isActive);

export const getEventById = (id: string) => eventsConfig.find(event => event.id === id);

export const getUpcomingEvents = () => {
  const now = new Date();
  return eventsConfig.filter(event => {
    if (!event.startDate) return false;
    const eventDate = new Date(event.startDate);
    return eventDate >= now;
  });
};

// Function to update RSVP count (for admin use)
export const updateRSVPCount = (eventId: string, newCount: number) => {
  const event = eventsConfig.find(e => e.id === eventId);
  if (event) {
    event.currentRSVPs = newCount;
  }
};

// Google Calendar configuration
export const calendarConfig = {
  embedUrl: "https://calendar.google.com/calendar/embed?src=casb%40brown.edu&ctz=Asia%2FAlmaty&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0",
  directUrl: "https://calendar.google.com/calendar/embed?src=casb%40brown.edu&ctz=Asia%2FAlmaty",
  timezone: "Asia/Almaty"
}; 