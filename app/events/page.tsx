"use client"

import { useState } from "react";
import Link from "next/link";
import { Calendar, ExternalLink } from "lucide-react";
import { RSVPSystem } from "../../components/rsvp-system";
import { eventsConfig, calendarConfig, getActiveEvents } from "../../lib/events-config";

export default function EventsPage() {
  const activeEvents = getActiveEvents();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold">Events & Community</h1>
        <p className="mt-3 text-muted-foreground max-w-prose">
          Stay connected with upcoming events and relive moments from recent gatherings.
        </p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Google Calendar Embed */}
        <div className="lg:col-span-2 rounded-2xl border overflow-hidden">
          <div className="p-4 border-b bg-secondary/50">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <h2 className="font-semibold">CASB Calendar</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
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
          <div className="p-4 border-t bg-secondary/50">
            <a
              href={calendarConfig.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
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
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeEvents.map((event) => (
            <div key={event.id} className="rounded-xl border p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm">{event.title}</h3>
                <span className="text-xs text-muted-foreground">{event.startDate}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
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
          <h2 className="text-xl font-semibold">Past Events</h2>
          <Link href="#" className="text-sm underline">View all</Link>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map((i) => (
            <div key={i} className="rounded-xl border p-4">
              <div className="aspect-video rounded-lg bg-secondary" />
              <div className="mt-2 font-medium">Story {i}</div>
              <div className="text-sm text-muted-foreground">Short caption to set the scene.</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 