import { useState, useEffect } from 'react'
import { X, MapPin, Users, Calendar, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export default function TalkDetails({ talk, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div
      className={`mt-14 border-t-2 border-l-2 border-slate-50 fixed inset-y-0 right-0 w-full sm:w-2/3 lg:w-1/2 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{talk.title}</h2>
          <Button variant="table" size="icon" onClick={handleClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{talk.location}</Badge>
            <span className="text-sm text-gray-500">
              ID: {talk.id.slice(0, 8)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>{talk.authors[0].full_name}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(talk.date).toLocaleString()}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{talk.location}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Info className="h-5 w-5" />
            Abstract
          </h3>
          <p className="text-gray-600 whitespace-pre-wrap">{talk.abstract}</p>
        </div>
      </div>
    </div>
  )
}
