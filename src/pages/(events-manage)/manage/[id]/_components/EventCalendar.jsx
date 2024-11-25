import { useState } from 'react'
import { CalendarDays, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { format, parse } from 'date-fns'
import { es } from 'date-fns/locale'

export default function EventCalendar({ event, isEditing, handleDateChange }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [includeTime, setIncludeTime] = useState(false)

  const handleEditDate = (index) => {
    const date = event.dates[index]
    setCurrentDate({
      ...date,
      date: date.date ? parse(date.date, 'yyyy-MM-dd', new Date()) : null,
    })
    setCurrentIndex(index)
    setIncludeTime(!!date.time)
    setIsDialogOpen(true)
  }

  const handleSaveDate = () => {
    if (currentDate) {
      handleDateChange(
        currentIndex,
        'date',
        format(currentDate.date, 'yyyy-MM-dd')
      )
      if (includeTime) {
        handleDateChange(currentIndex, 'time', currentDate.time)
      } else {
        handleDateChange(currentIndex, 'time', null)
      }
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6 mb-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Calendario del Evento</h2>
        <div className="flex items-center text-sm text-muted-foreground">
          <Info className="h-4 w-4 mr-2" />
          <p>
            Estas fechas son obligatorias y afectan la configuración del evento
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {event.dates.map((date, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 px-4 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <CalendarDays className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium">{date.description}</p>
                <p className="text-sm text-muted-foreground">
                  {date.date
                    ? format(
                        parse(date.date, 'yyyy-MM-dd', new Date()),
                        'PPP',
                        { locale: es }
                      )
                    : 'Fecha no especificada'}
                  {date.time && ` - ${date.time}`}
                </p>
              </div>
            </div>
            {isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditDate(index)}
              >
                Editar
              </Button>
            )}
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Fecha: {currentDate?.description}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <Calendar
                mode="single"
                selected={currentDate?.date}
                onSelect={(newDate) =>
                  setCurrentDate({ ...currentDate, date: newDate })
                }
                className="rounded-md border"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={includeTime}
                onCheckedChange={setIncludeTime}
                id="include-time"
              />
              <label
                htmlFor="include-time"
                className="text-sm font-medium text-gray-700"
              >
                Incluir hora
              </label>
            </div>
            {includeTime && (
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Hora
                </label>
                <Input
                  id="time"
                  type="time"
                  value={currentDate?.time || ''}
                  onChange={(e) =>
                    setCurrentDate({ ...currentDate, time: e.target.value })
                  }
                  className="w-full"
                />
              </div>
            )}
            <Button onClick={handleSaveDate} className="w-full">
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
