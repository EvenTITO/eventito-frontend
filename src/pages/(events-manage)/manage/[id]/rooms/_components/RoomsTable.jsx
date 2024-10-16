import { MapPin, X, Users, AlignLeft } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import RoomDialog from '@/pages/(events-manage)/manage/[id]/rooms/_components/RoomDialog.jsx'

export default function RoomsTable({ rooms, onUpdate, onDelete }) {
  if (rooms.length === 0) {
    return (
      <div className="text-center py-10 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Ninguna sala cargada</h2>
        <p className="text-gray-500 mb-4">
          Agregar una nueva para visualizarla
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-1 border border-gray-200 rounded-lg overflow-hidden">
      {rooms.map((room, index) => (
        <RoomItem
          key={index}
          index={index}
          room={room}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

function RoomItem({ room, index, onUpdate, onDelete }) {
  const hasDescription = !!room.description
  const hasCapacity = !!room.capacity

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div className="group flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors duration-200">
        <div className="flex items-start space-x-3 flex-grow min-w-0">
          <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
          <div className="flex-grow min-w-0">
            <p className="font-medium text-gray-800">{room.name}</p>
            <div className="flex flex-wrap items-center mt-1 space-x-2">
              {hasDescription && (
                <div className="flex items-center text-sm text-gray-500">
                  <AlignLeft className="h-4 w-4 mr-1" />
                  <span className="truncate max-w-[200px]">
                    {room.description}
                  </span>
                </div>
              )}
              {hasCapacity && (
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{room.capacity} personas</span>
                </div>
              )}
              {!hasDescription && !hasCapacity && (
                <span className="text-sm text-gray-400 italic">
                  Sin detalles adicionales
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <RoomDialog room={room} onSave={onUpdate} index={index} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(index)}
            className="text-gray-500 hover:text-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
