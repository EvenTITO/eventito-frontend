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

export default function Page({ events }) {
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  const filteredEvents = events.filter(
    (event) =>
      (filter === 'ALL' ? true : event.event_type === filter) &&
      (search
        ? event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.organized_by.toLowerCase().includes(search.toLowerCase())
        : true)
  )

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white min-h-screen">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <FileText className="h-10 w-10 text-primary" />
          Event Creation Requests
        </h1>
        <p className="text-xl text-muted-foreground">
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
                  <Calendar className="h-6 w-6 text-primary" />
                  Pending Requests
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  {filteredEvents.length} request
                  {filteredEvents.length !== 1 && 's'}
                </span>
              </h2>
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function EventCard({ event }) {
  const startDate = new Date(
    event.dates.find((d) => d.name === 'START_DATE').date
  )

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 group">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16 ring-2 ring-primary ring-offset-2 group-hover:ring-offset-4 transition-all duration-200">
            <AvatarImage
              src={
                event.media.find((m) => m.name === 'main_image')?.url ||
                `https://api.dicebear.com/6.x/identicon/svg?seed=${event.title}`
              }
            />
            <AvatarFallback>{event.title.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <h3 className="text-xl font-medium truncate group-hover:text-primary transition-colors duration-200">
              {event.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              Organized by: {event.organized_by}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {event.event_type}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Clock className="h-3 w-3 mr-1" />
                {format(startDate, 'MMM d, yyyy')}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <MapPin className="h-3 w-3 mr-1" />
                {event.location}
              </span>
            </div>
          </div>
          <Button variant="outline" className="shrink-0">
            Review
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
