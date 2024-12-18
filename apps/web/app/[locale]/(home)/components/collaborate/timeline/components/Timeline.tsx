import React, { useState } from 'react';
import { FileText, Gavel, Users, Calendar } from 'lucide-react';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { getEventStatus } from '../utils/eventStatus';
import { EventType } from '../types/timeline';

const iconMap = {
  filing: FileText,
  court: Gavel,
  meeting: Users,
  deadline: Calendar,
};

interface TimelineProps {
  events: EventType[];
}

export function Timeline({ events }: TimelineProps) {
  const scrollRef = useHorizontalScroll();
  const [hoveredEvent, setHoveredEvent] = useState<EventType | null>(null);
  const currentDate = new Date(); // You might want to pass this as a prop if it's not always the current date

  return (
    <div className="relative w-full overflow-x-auto" ref={scrollRef}>
      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 transform -translate-y-1/2" />
      <div className="relative flex items-center min-w-max p-4 space-x-16">
        {events.map((event, index) => {
          const EventIcon = iconMap[event.type as keyof typeof iconMap];
          const status = getEventStatus(event, currentDate);
          
          return (
            <div 
              key={index}
              className="flex flex-col items-center"
              onMouseEnter={() => setHoveredEvent(event)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                  status === 'past' ? 'bg-gray-200 text-gray-500' :
                  status === 'present' ? 'bg-blue-500 text-white animate-pulse' :
                  'bg-white border-2 border-blue-500 text-blue-500'
                }`}
              >
                <EventIcon className="w-6 h-6" />
              </div>
              {hoveredEvent === event && (
                <div className="absolute bottom-full mb-2 w-64 bg-white shadow-lg rounded-lg p-4 transition-opacity duration-300">
                  <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-sm">{event.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

