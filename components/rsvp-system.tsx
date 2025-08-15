"use client"

import { useState } from "react";
import { Users, ExternalLink, CheckCircle, Clock, Calendar, Settings } from "lucide-react";

export interface EventConfig {
  id: string;
  title: string;
  description: string;
  formUrl: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  maxCapacity?: number;
  currentRSVPs?: number;
}

interface RSVPSystemProps {
  events: EventConfig[];
  defaultEventId?: string;
  showAdminPanel?: boolean;
}

export function RSVPSystem({ events, defaultEventId, showAdminPanel = false }: RSVPSystemProps) {
  const [selectedEventId, setSelectedEventId] = useState(defaultEventId || events[0]?.id || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const selectedEvent = events.find(event => event.id === selectedEventId);

  const handleRSVPSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!selectedEvent) return;

    setIsSubmitting(true);

    // Show quick feedback in the current tab while the form opens in a new tab
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const getCapacityStatus = (event: EventConfig) => {
    if (!event.maxCapacity || !event.currentRSVPs) return null;
    
    const percentage = (event.currentRSVPs / event.maxCapacity) * 100;
    
    if (percentage >= 100) return { status: "full", text: "Fully Booked", color: "text-red-600" };
    if (percentage >= 80) return { status: "limited", text: "Limited Spots", color: "text-orange-600" };
    return { status: "available", text: "Spots Available", color: "text-green-600" };
  };

  if (!selectedEvent) {
    return (
      <div className="rounded-2xl border p-6 text-center">
        <Users className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No events available</p>
      </div>
    );
  }

  const capacityStatus = getCapacityStatus(selectedEvent);

  return (
    <div className="rounded-2xl border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <h2 className="font-semibold">RSVP System</h2>
        </div>
        {showAdminPanel && (
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="p-1 hover:bg-secondary rounded"
          >
            <Settings className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Event Selector */}
      {events.length > 1 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Event:</label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {!submitted ? (
        <>
          <div className="mb-4">
            <h3 className="font-medium text-lg">{selectedEvent.title}</h3>
            <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
            
            {/* Event Details */}
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              {selectedEvent.startDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Date: {selectedEvent.startDate}</span>
                </div>
              )}
              {capacityStatus && (
                <div className={`flex items-center gap-1 ${capacityStatus.color}`}>
                  <Users className="h-3 w-3" />
                  <span>{capacityStatus.text}</span>
                  {selectedEvent.currentRSVPs && selectedEvent.maxCapacity && (
                    <span>({selectedEvent.currentRSVPs}/{selectedEvent.maxCapacity})</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {selectedEvent.isActive ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Registration Open</span>
              </div>
              
              <a
                href={selectedEvent.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  capacityStatus?.status === "full"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                onClick={capacityStatus?.status === "full" ? undefined : handleRSVPSubmit}
              >
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 animate-spin" />
                    Opening Form...
                  </>
                ) : capacityStatus?.status === "full" ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Fully Booked
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4" />
                    RSVP Now
                  </>
                )}
              </a>
              
              <p className="text-xs text-muted-foreground">
                You'll be redirected to our Google Form to complete your registration.
              </p>
            </div>
          ) : (
            <div className="text-center py-4">
              <Clock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Registration coming soon</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-4">
          <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
          <p className="text-sm text-green-600 font-medium">Form opened successfully!</p>
          <p className="text-xs text-muted-foreground mt-1">
            Please complete the form in the new tab.
          </p>
        </div>
      )}

      {/* Admin Configuration Panel */}
      {showAdminPanel && showConfig && (
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium text-sm mb-2">Event Configuration</h4>
          <div className="space-y-2 text-xs">
            <p className="text-muted-foreground">
              To add new events, update the events array in the RSVPSystem component.
            </p>
            <div className="bg-secondary p-2 rounded">
              <p className="font-mono text-xs">
                {`{
  id: "event-id",
  title: "Event Title",
  description: "Event description",
  formUrl: "https://forms.gle/your-form-id",
  isActive: true,
  startDate: "2025-03-21",
  maxCapacity: 50,
  currentRSVPs: 25
}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 