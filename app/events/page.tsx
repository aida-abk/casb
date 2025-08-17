"use client"

import { useState } from "react";
import Link from "next/link";
import { Calendar, ExternalLink, Images } from "lucide-react";
import { RSVPSystem } from "../../components/rsvp-system";
import { EventGallery } from "../../components/event-gallery";
import { eventsConfig, calendarConfig, getActiveEvents } from "../../lib/events-config";

export default function EventsPage() {
  const activeEvents = getActiveEvents();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    images: string[];
    initialIndex: number;
  } | null>(null);

  const pastEvents = [
    {
      id: "club-fair",
      title: "First Club Fair Appearance",
      description: "Our debut at the university club fair, introducing Central Asian culture to the campus community.",
      date: "Fall 2024",
      image: "/past-events/club-fair/1.jpeg",
      images: [
        "/past-events/club-fair/1.jpeg",
        "/past-events/club-fair/2.jpeg",
        "/past-events/club-fair/3.jpeg"
      ]
    },
    {
      id: "international-fair",
      title: "International Fair 2025",
      description: "Representing Central Asia at the university's international fair, showcasing our rich cultural heritage.",
      date: "January 2025",
      image: "/past-events/intenational-fair2025/1.jpeg",
      images: [
        "/past-events/intenational-fair2025/1.jpeg",
        "/past-events/intenational-fair2025/2.jpeg",
        "/past-events/intenational-fair2025/3.jpeg",
        "/past-events/intenational-fair2025/4.jpeg",
        "/past-events/intenational-fair2025/5.jpeg"
      ]
    },
    {
      id: "nowruz",
      title: "Nowruz with Samosa Cooking",
      description: "Celebrating the Persian New Year with traditional samosa cooking and cultural festivities.",
      date: "March 2025",
      image: "/past-events/nowruz2025/4.jpg",
      images: [
        "/past-events/nowruz2025/1.jpg",
         "/past-events/nowruz2025/2.jpg",
         "/past-events/nowruz2025/3.jpg",
         "/past-events/nowruz2025/4.jpg",
         "/past-events/nowruz2025/5.jpg",
         "/past-events/nowruz2025/6.jpg",
         "/past-events/nowruz2025/7.jpg",
         "/past-events/nowruz2025/8.jpg",
         "/past-events/nowruz2025/9.jpg",
         "/past-events/nowruz2025/10.jpg",
        
      ]
    },
    {
      id: "wrap-up",
      title: "2024-2025 Year Wrap Up",
      description: "Celebrating our achievements and saying goodbye to our graduating members.",
      date: "May 2025",
      image: "/past-events/wrap-up2025/2.jpeg",
      images: [
        "/past-events/wrap-up2025/1.jpeg",
        "/past-events/wrap-up2025/2.jpeg",
        "/past-events/wrap-up2025/3.jpeg"
      ]
    }
  ];

  const openGallery = (event: typeof pastEvents[0], imageIndex: number = 0) => {
    setSelectedEvent({
      title: event.title,
      images: event.images,
      initialIndex: imageIndex
    });
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Events & Community</h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground max-w-prose">
          Stay connected with upcoming events and relive moments from recent gatherings.
        </p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Google Calendar Embed */}
        <div className="lg:col-span-2 rounded-xl sm:rounded-2xl border overflow-hidden">
          <div className="p-3 sm:p-4 border-b bg-secondary/50">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              <h2 className="font-semibold text-sm sm:text-base">CASB Calendar</h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              All our events, meetings, and cultural celebrations
            </p>
          </div>
          <div className="aspect-[4/3] relative">
            <iframe
              src={calendarConfig.embedUrl}
              style={{ border: 0 }}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              title="CASB Google Calendar"
            />
          </div>
          <div className="p-3 sm:p-4 border-t bg-secondary/50">
            <a
              href={calendarConfig.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
              Open in Google Calendar
            </a>
          </div>
        </div>

        {/* RSVP System */}
        <RSVPSystem 
          events={eventsConfig} 
          defaultEventId="general-meeting"
          showAdminPanel={true}
        />
      </section>

      {/* Upcoming Events Summary */}
      <section className="rounded-xl sm:rounded-2xl border p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {activeEvents.map((event) => (
            <div key={event.id} className="rounded-xl border p-3 sm:p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-xs sm:text-sm">{event.title}</h3>
                <span className="text-xs text-muted-foreground">{event.startDate}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2 sm:mb-3 line-clamp-2">{event.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {event.currentRSVPs}/{event.maxCapacity} RSVPs
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  event.currentRSVPs && event.maxCapacity && (event.currentRSVPs / event.maxCapacity) >= 0.8
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}>
                  {event.currentRSVPs && event.maxCapacity && (event.currentRSVPs / event.maxCapacity) >= 0.8
                    ? "Limited Spots"
                    : "Open"
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold">Past Events</h2>
          <Link href="#" className="text-xs sm:text-sm underline">View all</Link>
        </div>
        <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pastEvents.map((event) => (
            <div 
              key={event.id}
              className="rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
              onClick={() => openGallery(event)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Gallery indicator overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2">
                    <Images className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                  </div>
                </div>
                {/* Image count badge */}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  {event.images.length} photos
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-medium text-sm sm:text-lg mb-1 sm:mb-2">{event.title}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  {event.description}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{event.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Gallery Modal */}
      {selectedEvent && (
        <EventGallery
          isOpen={galleryOpen}
          onClose={closeGallery}
          eventTitle={selectedEvent.title}
          images={selectedEvent.images}
          initialImageIndex={selectedEvent.initialIndex}
        />
      )}
    </div>
  );
} 