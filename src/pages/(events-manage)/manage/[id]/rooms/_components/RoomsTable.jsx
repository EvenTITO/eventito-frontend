import { MapPin, X, GripVertical } from 'lucide-react'
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
  return (
    <div
      key={index}
      className="group flex items-center justify-between py-2 px-3 hover:bg-gray-100 transition-colors duration-200"
    >
      <div className="flex items-center space-x-3 flex-grow min-w-0">
        <GripVertical className="h-5 w-5 text-gray-300 opacity-0 group-hover:opacity-100 cursor-move flex-shrink-0" />
        <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
        <div className="flex-grow min-w-0">
          <p className="font-medium text-gray-800 truncate">{room.name}</p>
          {room.description && (
            <p className="text-sm text-gray-500 truncate">{room.description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
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
  )
}
