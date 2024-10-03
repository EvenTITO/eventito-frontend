import { useState, useEffect } from 'react'
import { X, Calendar, MapPin, Clock, Users, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

export default function Details({ event, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for the animation to finish before closing
  }

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-2/3 lg:w-1/2 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center text-gray-600">
            <Users className="h-5 w-5 mr-2" />
            <span>Organized by: {event.organized_by}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{event.event_type || 'Event type not set'}</span>
          </div>

          {event.dates.map((date) => (
            <div key={date.name} className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>
                {date.label}: {format(new Date(date.date), 'MMMM d, yyyy')} at{' '}
                {date.time}
              </span>
            </div>
          ))}

          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{event.location || 'Location not set'}</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-gray-600">{event.description}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Tracks</h3>
            <ul className="list-disc list-inside text-gray-600">
              {event.tracks.map((track, index) => (
                <li key={index}>{track}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Pricing</h3>
            {event.pricing.map((price, index) => (
              <div key={index} className="flex items-center text-gray-600">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>
                  {price.name}: {price.value} {price.currency}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-gray-600">{event.contact}</p>
          </div>

          <div className="pt-6 space-y-4">
            <Button className="w-full">Approve Event</Button>
            <Button variant="outline" className="w-full" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
