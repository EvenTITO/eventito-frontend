import { useState } from 'react'
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
import { ChevronRight } from 'lucide-react'

export default function Page({ works, rooms }) {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const speakers = works.reduce((acc, work) => {
    work.speaker.forEach((speaker) => {
      if (!acc[speaker.mail]) {
        acc[speaker.mail] = { ...speaker, works: [] }
      }
      acc[speaker.mail].works.push(work)
    })
    return acc
  }, {})

  const handleSpeakerClick = (speaker) => {
    setSelectedSpeaker(speaker)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedSpeaker(null)
  }

  const handleAssignLocation = (workId, location) => {
    // Here you would typically update the backend
    console.log(`Assigning location ${location} to work ${workId}`)
  }

  const handleAssignDate = (workId, date) => {
    // Here you would typically update the backend
    console.log(`Assigning date ${date} to work ${workId}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Asignación de Ubicaciones</h1>
      <div className="space-y-4">
        {Object.values(speakers).map((speaker) => (
          <Card
            key={speaker.mail}
            className="cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => handleSpeakerClick(speaker)}
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
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
                  <h3 className="font-medium">{speaker.full_name}</h3>
                  <p className="text-sm text-gray-500">{speaker.mail}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Badge variant="secondary">
                  {speaker.works.length} charlas
                </Badge>
                <ChevronRight className="ml-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedSpeaker && (
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="sm:max-w-[90%] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Detalles del presentador
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedSpeaker.full_name}`}
                    />
                    <AvatarFallback>
                      {selectedSpeaker.full_name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedSpeaker.full_name}
                    </h2>
                    <p className="text-gray-500">{selectedSpeaker.mail}</p>
                    {selectedSpeaker.membership && (
                      <p className="text-gray-500">
                        {selectedSpeaker.membership}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Charlas</h3>
                <div className="space-y-4">
                  {selectedSpeaker.works.map((work) => (
                    <Card key={work.id}>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">{work.title}</h4>
                        <p className="text-sm text-gray-500 mb-2">
                          Track: {work.track}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Ubicación
                            </p>
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
      )}
    </div>
  )
}
