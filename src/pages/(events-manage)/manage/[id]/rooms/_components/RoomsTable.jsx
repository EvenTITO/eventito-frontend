import { MapPin, X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import RoomDialog from '@/pages/(events-manage)/manage/[id]/rooms/_components/RoomDialog.jsx'

export default function RoomsTable({ rooms, onUpdate, onDelete }) {
  return rooms.length > 0 ? (
    <div className="space-y-2">
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
  ) : (
    <div className="text-center py-10">
      <h2 className="text-xl font-semibold mb-2">Ninguna sala cargada</h2>
      <p className="text-gray-500 mb-4">Agregar una nueva para visualizarla</p>
    </div>
  )
}

function RoomItem({ room, index, onUpdate, onDelete }) {
  return (
    <div
      key={index}
      className="flex items-center justify-between py-2 border border-gray-100 last:border-b-0"
    >
      <div className="flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <div>
          <p className="font-medium">{room.name}</p>
          <p className="text-sm text-muted-foreground">
            {room.description ? room.description : ''}
          </p>
        </div>
      </div>
      <div className="space-x-2">
        <RoomDialog room={room} onSave={onUpdate} index={index} />
        <Button variant="outline" size="sm" onClick={() => onDelete(index)}>
          <X className="h-4 w-4 mr-2" />
          Borrar
        </Button>
      </div>
    </div>
  )
}
