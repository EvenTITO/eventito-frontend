import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Search, Filter, FileText, MapPin, Clock } from 'lucide-react'
import { format } from 'date-fns'
import Details from './_components/Details'

export default function EventCreationRequests({ events }) {
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null)

  const filteredEvents = events.filter(
    (event) =>
      (filter === 'ALL' ? true : event.event_type === filter) &&
      (search
        ? event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.organized_by.toLowerCase().includes(search.toLowerCase())
        : true)
  )

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseEventDetails = () => {
    setSelectedEvent(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <div
      className={`max-w-6xl mx-auto p-8 bg-white min-h-screen transition-all duration-300 ${selectedEvent ? 'mr-[50vw]' : ''}`}
    >
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <FileText className="h-10 w-10 text-gray-600" />
          Solicitudes de creación de eventos
        </h1>
        <p className="text-xl text-gray-600">
          Review and manage event creation requests
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-1 h-fit sticky top-8">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Events
              </h2>
              <Input
                type="text"
                placeholder="Search by title or organizer"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter by Event Type
              </h2>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="CONFERENCE">Conference</SelectItem>
                  <SelectItem value="WORKSHOP">Workshop</SelectItem>
                  <SelectItem value="SEMINAR">Seminar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-gray-600" />
                  Pending Requests
                </span>
                <span className="text-sm font-normal text-gray-600">
                  {filteredEvents.length} request
                  {filteredEvents.length !== 1 && 's'}
                </span>
              </h2>
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => handleEventClick(event)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedEvent && (
        <Details event={selectedEvent} onClose={handleCloseEventDetails} />
      )}
    </div>
  )
}

function EventCard({ event, onClick }) {
  const startDate = event.dates.find((d) => d.name === 'START_DATE')
  const formattedDate = startDate
    ? format(new Date(startDate.date), 'MMM d, yyyy')
    : 'Date not set'

  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-all duration-200 group cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16 border-2 border-gray-200 group-hover:border-gray-400 transition-all duration-200">
            <AvatarImage
              src={
                event.media.find((m) => m.name === 'main_image')?.url ||
                `https://api.dicebear.com/6.x/identicon/svg?seed=${event.title}`
              }
            />
            <AvatarFallback>{event.title.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <h3 className="text-xl font-medium truncate group-hover:text-gray-800 transition-colors duration-200">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600 truncate">
              Organized by: {event.organized_by}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center text-xs text-gray-600">
                <Calendar className="h-3 w-3 mr-1" />
                {event.event_type || 'Type not set'}
              </span>
              <span className="inline-flex items-center text-xs text-gray-600">
                <Clock className="h-3 w-3 mr-1" />
                {formattedDate}
              </span>
              <span className="inline-flex items-center text-xs text-gray-600">
                <MapPin className="h-3 w-3 mr-1" />
                {event.location || 'Location not set'}
              </span>
            </div>
          </div>
          <Button variant="ghost" className="shrink-0">
            Review
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
