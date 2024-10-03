import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Calendar, Search, MapPin, Clock } from 'lucide-react'
import { format } from 'date-fns'
import Details from './_components/Details'
import ContainerAdminPage from '../_components/ContainerAdminPage'
import { LoaderSpinner } from '@/components/Loader'
import { useUpdateEventStatus } from '@/hooks/admin/adminEventsHooks'

export default function Page({ events }) {
  const [search, setSearch] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const {
    mutateAsync: updateEventStatus,
    isPending,
    error,
  } = useUpdateEventStatus()

  const filteredEvents = events.filter((event) =>
    search
      ? event.title.toLowerCase().includes(search.toLowerCase()) ||
        nt.organized_by.toLowerCase().includes(search.toLowerCase())
      : true
  )

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseEventDetails = () => {
    setSelectedEvent(null)
    document.body.style.overflow = 'auto'
  }

  const handleSetEventStatus = async (eventId, newStatus) => {
    await updateEventStatus({ eventId, newStatus })
  }

  return (
    <ContainerAdminPage
      title={'Solicitudes de creación de eventos'}
      subtitle={'Selección y administración del estado de un nuevo evento'}
      icon={'FileText'}
      className={`transition-all duration-300 ${selectedEvent ? 'mr-[50vw]' : ''}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-1 h-fit sticky top-8">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Search className="h-5 w-5" />
                Buscar eventos
              </h2>
              <Input
                type="text"
                placeholder="Buscar por título o creador"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-gray-600" />
                  Solicitudes pendientes de aprobación
                </span>

                {!isPending ? (
                  <span className="text-sm font-normal text-gray-600">
                    {filteredEvents.length} solicitud
                    {filteredEvents.length !== 1 && 'es'}
                  </span>
                ) : (
                  <LoaderSpinner size={32} />
                )}
              </h2>
              {!isPending ? (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => handleEventClick(event)}
                    />
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedEvent && (
        <Details
          event={selectedEvent}
          onClose={handleCloseEventDetails}
          onSetEventStatus={handleSetEventStatus}
        />
      )}
    </ContainerAdminPage>
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
              Email responsable: {event.creator.email}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center text-xs text-gray-600">
                <Calendar className="h-3 w-3 mr-1" />
                {event.event_type}
              </span>
              <span className="inline-flex items-center text-xs text-gray-600">
                <Clock className="h-3 w-3 mr-1" />
                {formattedDate}
              </span>
              <span className="inline-flex items-center text-xs text-gray-600">
                <MapPin className="h-3 w-3 mr-1" />
                {event.location || 'Ubicación no definida'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
