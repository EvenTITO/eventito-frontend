import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SpeakerDialog({
  isOpen,
  onClose,
  speaker,
  selectedWork,
  rooms,
}) {
  const handleAssignLocation = (workId, location) => {
    console.log(`Assigning location ${location} to work ${workId}`)
  }

  const handleAssignDate = (workId, date) => {
    console.log(`Assigning date ${date} to work ${workId}`)
  }

  if (!speaker) return null

  const works = selectedWork ? [selectedWork] : speaker.works

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {selectedWork ? 'Detalles de la Charla' : 'Detalles del Ponente'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${speaker.full_name}`}
                />
                <AvatarFallback>
                  {speaker.full_name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{speaker.full_name}</h2>
                <p className="text-gray-500">{speaker.mail}</p>
                {speaker.membership && (
                  <p className="text-gray-500">{speaker.membership}</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {selectedWork ? 'Charla' : 'Charlas'}
            </h3>
            <div className="space-y-4">
              {works.map((work) => (
                <Card key={work.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{work.title}</h4>
                      <Badge
                        variant={
                          work.state === 'SUBMITTED' ? 'secondary' : 'success'
                        }
                      >
                        {work.state}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      Track: {work.track}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Ubicación</p>
                        <Select
                          defaultValue={work.talk?.location || ''}
                          onValueChange={(value) =>
                            handleAssignLocation(work.id, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar ubicación" />
                          </SelectTrigger>
                          <SelectContent>
                            {rooms.map((room) => (
                              <SelectItem key={room} value={room}>
                                {room}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Fecha y Hora
                        </p>
                        <input
                          type="datetime-local"
                          defaultValue={work.talk?.date || ''}
                          onChange={(e) =>
                            handleAssignDate(work.id, e.target.value)
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
