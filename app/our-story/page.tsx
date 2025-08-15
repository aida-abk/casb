"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface TimelineEventProps {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  side: "left" | "right";
}

function TimelineEvent({ date, title, description, imageUrl, side }: TimelineEventProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`relative pl-12 lg:pl-0 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Mobile timeline dot */}
      <span
        aria-hidden
        className="lg:hidden absolute left-[18px] top-3 h-3 w-3 rounded-full bg-primary ring-2 ring-background"
      />
      {/* Text Content - conditionally ordered */}
      <div className={`flex flex-col ${
        side === 'left' 
          ? 'lg:order-1 lg:text-right' 
          : 'lg:order-2 lg:text-left'
      }`}>
        <div className="space-y-4">
          {/* Date Badge */}
          <div className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] sm:text-xs bg-background w-fit ${
            side === 'left' ? 'lg:ml-auto' : ''
          }`}>
            <span>{date}</span>
          </div>
          
          {/* Title and Description */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
            <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
      
      {/* Image - conditionally ordered */}
      <div className={side === 'left' ? 'lg:order-2' : 'lg:order-1'}>
        <div className="aspect-[4/3] rounded-xl border overflow-hidden relative">
          <Image
            src={imageUrl}
            alt={`${title} - ${date}`}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function OurStoryPage() {
  const [lineVisible, setLineVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const milestones = [
    { 
      date: "Sep 2024", 
      title: "CASB founded", 
      description: "A small gathering becomes a tradition.", 
      imageUrl: "/timeline/2024-casb-founded.jpeg" 
    },
    { 
      date: "Jan 2025", 
      title: "SAO Recognition", 
      description: "Officially registered club at Brown recognized by Student Activities Office", 
      imageUrl: "/timeline/2025-jan-sao-recognition.jpeg" 
    },
    { 
      date: "Mar 2025", 
      title: "First Nowruz at Brown", 
      description: "Club's first Nowruz celebration with cooking of samosa, music, and dance.", 
      imageUrl: "/timeline/2025-mar-nowruz.jpeg" 
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">Our Story</h1>
      <p className="mt-3 text-muted-foreground max-w-prose">
        Explore key moments from CASB's journey at Brown University.
      </p>
      
      <div 
        ref={timelineRef}
        className="mt-10 sm:mt-12 relative"
      >
        {/* Center Timeline Line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border transform -translate-x-1/2">
          <div 
            className={`w-full bg-primary transition-all duration-1000 ease-out ${
              lineVisible ? 'h-full' : 'h-0'
            }`}
          />
        </div>
        
        {/* Mobile Timeline Line */}
        <div className="lg:hidden absolute left-6 top-0 bottom-0 w-px bg-border">
          <div 
            className={`w-full bg-primary transition-all duration-1000 ease-out ${
              lineVisible ? 'h-full' : 'h-0'
            }`}
          />
        </div>
        
        {/* Timeline Events */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {milestones.map((milestone, index) => (
            <TimelineEvent
              key={milestone.date}
              date={milestone.date}
              title={milestone.title}
              description={milestone.description}
              imageUrl={milestone.imageUrl}
              side={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}