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
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function Page({ works, rooms }) {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedRoom, setSelectedRoom] = useState('all')
  const [view, setView] = useState('week')

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
    console.log(`Assigning location ${location} to work ${workId}`)
  }

  const handleAssignDate = (workId, date) => {
    console.log(`Assigning date ${date} to work ${workId}`)
  }

  const filteredWorks = works.filter(
    (work) =>
      work.talk &&
      (selectedRoom === 'all' || work.talk.location === selectedRoom)
  )

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayWorks = filteredWorks.filter(
        (work) =>
          new Date(work.talk.date).toDateString() === date.toDateString()
      )
      return (
        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold">{date.getDate()}</span>
          {dayWorks.length > 0 && (
            <div className="h-2 w-2 bg-blue-500 rounded-full mt-1"></div>
          )}
        </div>
      )
    }
    return null
  }

  const renderWeekView = () => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const weekStart = new Date(selectedDate)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())

    return (
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-px bg-gray-200">
            <div className="bg-white p-2 font-semibold text-center">Hora</div>
            {days.map((day, index) => {
              const currentDate = new Date(weekStart)
              currentDate.setDate(currentDate.getDate() + index)
              return (
                <div
                  key={day}
                  className="bg-white p-2 font-semibold text-center"
                >
                  <div>{day}</div>
                  <div className="text-sm text-gray-500">
                    {currentDate.getDate()}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-8 gap-px bg-gray-200">
            {hours.map((hour) => (
              <>
                <div
                  key={hour}
                  className="bg-white text-right pr-2 py-2 text-sm border-t border-gray-100"
                >
                  {`${hour.toString().padStart(2, '0')}:00`}
                </div>
                {days.map((_, dayIndex) => {
                  const currentDate = new Date(weekStart)
                  currentDate.setDate(currentDate.getDate() + dayIndex)
                  currentDate.setHours(hour, 0, 0, 0)
                  const worksAtTime = filteredWorks.filter((work) => {
                    const workDate = new Date(work.talk.date)
                    return (
                      workDate.getDate() === currentDate.getDate() &&
                      workDate.getMonth() === currentDate.getMonth() &&
                      workDate.getFullYear() === currentDate.getFullYear() &&
                      workDate.getHours() === hour
                    )
                  })
                  return (
                    <div
                      key={`${hour}-${dayIndex}`}
                      className="bg-white p-1 min-h-[40px] border-t border-gray-100"
                    >
                      {worksAtTime.map((work) => (
                        <div
                          key={work.id}
                          className="text-xs p-1 bg-blue-100 rounded mb-1 cursor-pointer hover:bg-blue-200 transition-colors"
                          onClick={() => handleWorkClick(work)}
                        >
                          {work.title.length > 20
                            ? work.title.substring(0, 20) + '...'
                            : work.title}
                        </div>
                      ))}
                    </div>
                  )
                })}
              </>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const handleWorkClick = (work) => {
    setSelectedSpeaker({ full_name: work.speaker[0].full_name, works: [work] })
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Asignación de Ubicaciones</h1>
      <Tabs defaultValue="speakers" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="speakers">Ponentes</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
        </TabsList>
        <TabsContent value="speakers">
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
        </TabsContent>
        <TabsContent value="calendar">
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setView('month')}
                variant={view === 'month' ? 'default' : 'outline'}
              >
                Mes
              </Button>
              <Button
                onClick={() => setView('week')}
                variant={view === 'week' ? 'default' : 'outline'}
              >
                Semana
              </Button>
            </div>
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccionar sala" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las salas</SelectItem>
                {rooms.map((room) => (
                  <SelectItem key={room} value={room}>
                    {room.length > 20 ? room.substring(0, 20) + '...' : room}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <Button
              onClick={() =>
                setSelectedDate((prev) => {
                  const newDate = new Date(prev)
                  newDate.setDate(
                    newDate.getDate() - (view === 'week' ? 7 : 30)
                  )
                  return newDate
                })
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold">
              {selectedDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <Button
              onClick={() =>
                setSelectedDate((prev) => {
                  const newDate = new Date(prev)
                  newDate.setDate(
                    newDate.getDate() + (view === 'week' ? 7 : 30)
                  )
                  return newDate
                })
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          {view === 'month' ? (
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              tileContent={tileContent}
              onClickDay={(value) => {
                setSelectedDate(value)
                setView('week')
              }}
              className="w-full bg-white rounded-lg shadow p-4"
            />
          ) : (
            renderWeekView()
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[90%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Detalles del Ponente
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedSpeaker?.full_name}`}
                  />
                  <AvatarFallback>
                    {selectedSpeaker?.full_name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedSpeaker?.full_name}
                  </h2>
                  <p className="text-gray-500">{selectedSpeaker?.mail}</p>
                  {selectedSpeaker?.membership && (
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
                {selectedSpeaker?.works.map((work) => (
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
    </div>
  )
}
