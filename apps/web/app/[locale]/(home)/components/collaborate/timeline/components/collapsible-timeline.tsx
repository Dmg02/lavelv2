'use client'

import * as React from 'react'
import { FileText, Gavel, Users, Calendar } from 'lucide-react'
import { cn } from "@repo/design-system/lib/utils"
import { Location } from '../../../collaborate/calendar/types'

const iconMap = {
  filing: FileText,
  court: Gavel,
  meeting: Users,
  deadline: Calendar,
}

const colorMap = {
  filing: 'bg-blue-500',
  court: 'bg-purple-500',
  meeting: 'bg-green-500',
  deadline: 'bg-amber-500',
}

export interface EventType {
  title: string
  date: string
  type: 'filing' | 'court' | 'meeting' | 'deadline'
  description: string
  location?: Location
  attendees?: Array<{
    id: string
    name: string
    role: string
  }>
}

interface CollapsibleTimelineProps {
  events: EventType[]
}

export function CollapsibleTimeline({ events = [] }: CollapsibleTimelineProps) {
  const currentDate = new Date()

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getEventStatus = (date: string) => {
    const eventDate = new Date(date)
    return eventDate < currentDate ? 'past' : eventDate > currentDate ? 'future' : 'present'
  }

  if (!events.length) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-muted-foreground">No events to display</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="h-full pl-4 pr-6">
        <div className="space-y-1 h-full overflow-y-auto">
          {sortedEvents.map((event, index) => {
            const EventIcon = iconMap[event.type]
            const status = getEventStatus(event.date)
            const isLast = index === sortedEvents.length - 1

            return (
              <div 
                key={index} 
                className={cn(
                  "relative pl-8 py-4 transition-all duration-300",
                  !isLast && "border-l-2 border-gray-200",
                  status === 'past' && "opacity-60",
                  status === 'present' && "opacity-100",
                )}
              >
                <div className={cn(
                  "absolute left-[-5px] w-4 h-4 rounded-full border-2 border-white",
                  colorMap[event.type]
                )}>
                  <EventIcon className="w-2 h-2 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-medium text-base leading-tight">{event.title}</h3>
                    <time className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(event.date).toLocaleDateString()}
                    </time>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  
                  {event.location && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {event.location.name}
                      </span>
                      {event.location.type && (
                        <span className="text-xs px-1.5 py-0.5 bg-secondary rounded-full">
                          {event.location.type}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {event.attendees && event.attendees.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {event.attendees.map((attendee) => (
                        <span
                          key={attendee.id}
                          className="text-xs px-1.5 py-0.5 bg-secondary rounded-full"
                        >
                          {attendee.name} • {attendee.role}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

