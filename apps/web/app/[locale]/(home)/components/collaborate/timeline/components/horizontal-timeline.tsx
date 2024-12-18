'use client'

import * as React from 'react'
import { FileText, Gavel, Users, Calendar, ChevronLeft, ChevronRight, MinusIcon, PlusIcon, LayoutList, Clock, MapPin, Bell } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/design-system/components/ui/tooltip"
import { Button } from "@repo/design-system/components/ui/button"
import { cn } from "@repo/design-system/lib/utils"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/design-system/components/ui/dialog"
import { motion } from 'framer-motion'
import { EventType as CalendarEventType, Location, User } from '../../../collaborate/calendar/types'
import { useTranslations } from '@/app/utils/translations'

type ViewType = 'timeline' | 'list';

const iconMap = {
  filing: FileText,
  court: Gavel,
  meeting: Users,
  deadline: Calendar,
}

const iconDescriptions = {
  filing: "Document Filing",
  court: "Court Appearance",
  meeting: "Meeting",
  deadline: "Deadline",
}

const colorMap = {
  filing: 'bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600',
  court: 'bg-gradient-to-br from-violet-400 to-violet-500 dark:from-violet-500 dark:to-violet-600',
  meeting: 'bg-gradient-to-br from-teal-400 to-teal-500 dark:from-teal-500 dark:to-teal-600',
  deadline: 'bg-gradient-to-br from-rose-400 to-rose-500 dark:from-rose-500 dark:to-rose-600',
}

const activeColorMap = {
  filing: 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500',
  court: 'bg-gradient-to-br from-violet-500 to-violet-600 dark:from-violet-400 dark:to-violet-500',
  meeting: 'bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500',
  deadline: 'bg-gradient-to-br from-rose-500 to-rose-600 dark:from-rose-400 dark:to-rose-500',
}

const pastColorMap = {
  filing: 'bg-gradient-to-br from-blue-300 to-blue-400 dark:from-blue-600/90 dark:to-blue-700/90',
  court: 'bg-gradient-to-br from-violet-300 to-violet-400 dark:from-violet-600/90 dark:to-violet-700/90',
  meeting: 'bg-gradient-to-br from-teal-300 to-teal-400 dark:from-teal-600/90 dark:to-teal-700/90',
  deadline: 'bg-gradient-to-br from-rose-300 to-rose-400 dark:from-rose-600/90 dark:to-rose-700/90',
}

export interface EventType {
  title: string
  date: string
  type: 'filing' | 'court' | 'meeting' | 'deadline'
  description: string
  location?: Location
  attendees?: User[]
}

interface HorizontalTimelineProps {
  events: EventType[]
}

export function HorizontalTimeline({ events }: HorizontalTimelineProps) {
  const { t } = useTranslations('timeline');
  
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [activeEvent, setActiveEvent] = React.useState<number | null>(null)
  const [selectedEvent, setSelectedEvent] = React.useState<EventType | null>(null)
  const [zoom, setZoom] = React.useState(0.8)
  const currentDate = new Date()
  const [view, setView] = React.useState<ViewType>('timeline')
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  const getEventStatus = (date: string) => {
    const eventDate = new Date(date)
    return eventDate < currentDate ? 'past' : 
           eventDate > currentDate ? 'future' : 'present'
  }

  const scrollTimeline = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth / 2
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev + 0.1 : prev - 0.1
      return Math.min(Math.max(newZoom, 0.5), 2)
    })
  }

  // Check scroll possibilities
  React.useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      checkScroll() // Initial check
      return () => container.removeEventListener('scroll', checkScroll)
    }
  }, [events])

  const getZoomedSize = (baseSize: number) => `${baseSize * zoom}px`

  const viewOptions = [
    { id: 'timeline', icon: Clock, label: t('views.timeline') },
    { id: 'list', icon: LayoutList, label: t('views.list') }
  ];

  const renderEventDialog = () => {
    if (!selectedEvent) return null;
    
    const EventIcon = iconMap[selectedEvent.type]
    const status = getEventStatus(selectedEvent.date)
    
    return (
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-[425px] gap-0 p-0">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-start gap-4">
              <div className={cn(
                "rounded-full p-3 flex items-center justify-center",
                status === 'past' ? pastColorMap[selectedEvent.type] : colorMap[selectedEvent.type]
              )}>
                <EventIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 space-y-1.5">
                <DialogTitle className="text-xl font-semibold">{selectedEvent.title}</DialogTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <p className="text-sm">
                    {new Date(selectedEvent.date).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="px-6 py-4 space-y-4">
            {/* Description Section */}
            {selectedEvent.description && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span>{t('details.description')}</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  {selectedEvent.description}
                </p>
              </div>
            )}

            {/* Location Section */}
            {selectedEvent.location && (
              <>
                <div className="h-px bg-border" />
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{t('details.location')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pl-6">
                    <span>{selectedEvent.location.name}</span>
                    {selectedEvent.location.type && (
                      <span className="text-muted-foreground/75">
                        ({t(`location.types.${selectedEvent.location.type}`)})
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Participants Section */}
            {selectedEvent.attendees && (
              <>
                <div className="h-px bg-border" />
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{t('details.participants')}</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1.5 pl-6">
                    {selectedEvent.attendees.map((attendee, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span>{attendee.name}</span>
                        {attendee.role && (
                          <span className="text-muted-foreground/75">
                            ({t(`roles.${attendee.role}`)})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Reminders Section */}
            <div className="h-px bg-border" />
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span>{t('details.reminders')}</span>
              </div>
              <div className="pl-6 space-y-1.5">
                <p className="text-sm text-muted-foreground">30min before</p>
                <p className="text-sm text-muted-foreground">10min before</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const renderTimelineView = () => (
    <div 
      ref={scrollContainerRef}
      className="relative overflow-x-auto pb-4 hide-scrollbar"
      style={{
        minHeight: getZoomedSize(180),
        maxHeight: getZoomedSize(250)
      }}
    >
      <div className="relative min-w-full">
        {/* Timeline line with gradient edges */}
        <div className="absolute top-1/2 left-0 right-0 flex items-center">
          <div className="w-8 bg-gradient-to-r from-background to-transparent h-px" />
          <div className="flex-1 h-[2px] bg-border/30" />
          <div className="w-8 bg-gradient-to-l from-background to-transparent h-px" />
        </div>
        
        {/* Events */}
        <div className="relative flex items-center justify-between px-8 min-w-max">
          {sortedEvents.map((event, index) => {
            const EventIcon = iconMap[event.type]
            const status = getEventStatus(event.date)
            const isActive = activeEvent === index

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "relative flex flex-col items-center",
                      "cursor-pointer transition-all duration-200",
                      isActive && "scale-105"
                    )}
                    style={{ margin: `0 ${getZoomedSize(30)}` }}
                    onClick={() => {
                      setActiveEvent(index)
                      setSelectedEvent(event)
                    }}
                  >
                    {/* Title */}
                    <div 
                      className={cn(
                        "text-xs font-medium text-center mb-2 max-w-[120px]",
                        isActive && "text-primary",
                        status === 'past' && "text-muted-foreground"
                      )}
                    >
                      {event.title}
                    </div>
                    
                    {/* Icon with integrated status */}
                    <div
                      className={cn(
                        "rounded-full flex items-center justify-center shadow-sm",
                        "transition-all duration-200",
                        status === 'past' ? pastColorMap[event.type] :
                        isActive ? activeColorMap[event.type] :
                        colorMap[event.type],
                        (status === 'present' || isActive) && 
                          "ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
                      )}
                      style={{
                        width: getZoomedSize(36),
                        height: getZoomedSize(36)
                      }}
                    >
                      <EventIcon className={cn(
                        "w-4 h-4 relative z-10",
                        status === 'past' ? "text-primary-foreground/80" : "text-primary-foreground"
                      )} />
                    </div>
                    
                    {/* Date */}
                    <div className={cn(
                      "text-[10px] mt-2",
                      status === 'past' ? "text-muted-foreground" : "text-muted-foreground/80"
                    )}>
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom"
                  sideOffset={8}
                  className="w-64 p-0 overflow-hidden bg-background/95 backdrop-blur-sm border border-border/50 shadow-xl"
                >
                  <div className="relative">
                    {/* Header */}
                    <div className={cn(
                      "p-3 flex items-start gap-3",
                      status === 'past' ? pastColorMap[event.type] :
                      isActive ? activeColorMap[event.type] :
                      colorMap[event.type]
                    )}>
                      <EventIcon className="w-5 h-5 text-primary-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-primary-foreground">{event.title}</h3>
                        <p className="text-xs text-primary-foreground/80">
                          {new Date(event.date).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 space-y-2">
                      <p className="text-xs text-foreground/90 leading-relaxed">
                        {event.description}
                      </p>
                      
                      {/* Details */}
                      <div className="flex flex-col gap-2 pt-1">
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">📍</span>
                            <span className="text-xs text-muted-foreground">{event.location.name}</span>
                            {event.location.type && (
                              <span className="opacity-75">({event.location.type})</span>
                            )}
                          </div>
                        )}
                        {event.attendees && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">👥</span>
                              <span className="text-xs text-muted-foreground">Participants</span>
                            </div>
                            <div className="flex flex-wrap gap-1 pl-6">
                              {event.attendees.map((participant, i) => (
                                <span 
                                  key={i}
                                  className="inline-flex text-[10px] px-1.5 py-0.5 bg-muted rounded-full text-muted-foreground"
                                >
                                  {participant.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderListView = () => (
    <div className="px-4 py-2 space-y-2">
      {sortedEvents.map((event, index) => {
        const EventIcon = iconMap[event.type]
        const status = getEventStatus(event.date)

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg",
              "border border-border/50",
              "hover:bg-muted/50 transition-colors",
              status === 'past' && "opacity-60"
            )}
          >
            <div
              className={cn(
                "rounded-full p-2 flex items-center justify-center",
                colorMap[event.type]
              )}
            >
              <EventIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium truncate">{event.title}</h3>
                <time className="text-xs text-muted-foreground flex-shrink-0">
                  {new Date(event.date).toLocaleDateString()}
                </time>
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {event.description}
              </p>
              {(event.location || event.attendees) && (
                <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                  {event.location && (
                    <div className="flex items-center gap-1">
                      <span>📍</span>
                      <span>{event.location.name}</span>
                      {event.location.type && (
                        <span className="opacity-75">({event.location.type})</span>
                      )}
                    </div>
                  )}
                  {event.attendees && (
                    <div className="flex items-center gap-1">
                      <span>👥</span>
                      <span>{event.attendees.length} participants</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )

  if (!events.length) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-muted-foreground">No events to display</p>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="relative bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Controls Header */}
        <div className="flex items-center justify-between mb-6 px-4">
          {/* Left side - View Controls */}
          <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
            {viewOptions.map(({ id, icon: Icon, label }) => (
              <Button
                key={id}
                variant={view === id ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "h-7",
                  view === id && "bg-background shadow-sm"
                )}
                onClick={() => setView(id as ViewType)}
              >
                <Icon className="w-3 h-3 mr-1" />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>

          {/* Right side - Zoom and Navigation */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
              <Button 
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => handleZoom('out')}
                disabled={zoom <= 0.5}
                title={t('tooltips.zoomOut')}
              >
                <MinusIcon className="h-3 w-3" />
              </Button>
              <span className="text-xs w-10 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button 
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => handleZoom('in')}
                disabled={zoom >= 2}
                title={t('tooltips.zoomIn')}
              >
                <PlusIcon className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex gap-1 p-1 bg-muted rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => scrollTimeline('left')}
                disabled={!canScrollLeft}
                title={t('tooltips.scrollLeft')}
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => scrollTimeline('right')}
                disabled={!canScrollRight}
                title={t('tooltips.scrollRight')}
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {view === 'timeline' ? renderTimelineView() : renderListView()}
        </div>

        {/* Event Dialog */}
        {renderEventDialog()}
      </div>
    </TooltipProvider>
  )
}



