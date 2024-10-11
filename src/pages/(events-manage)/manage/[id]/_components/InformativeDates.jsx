import { useState } from 'react'
import { CalendarDays, Plus, X, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { format, parse } from 'date-fns'
import { es } from 'date-fns/locale'

export default function InformativeDates({
  event,
  handleInputChange,
  isEditing,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)

  const informativeDates = event.mdata?.informative_dates || []

  const handleAddDate = () => {
    setCurrentDate({ title: '', date: '' })
    setCurrentIndex(null)
    setIsDialogOpen(true)
  }

  const handleEditDate = (index) => {
    setCurrentDate({ ...informativeDates[index] })
    setCurrentIndex(index)
    setIsDialogOpen(true)
  }

  const handleSaveDate = () => {
    const updatedDates = [...informativeDates]
    if (currentIndex !== null) {
      updatedDates[currentIndex] = currentDate
    } else {
      updatedDates.push(currentDate)
    }
    handleInputChange({
      target: {
        name: 'mdata',
        value: {
          ...event.mdata,
          informative_dates: updatedDates,
        },
      },
    })
    setIsDialogOpen(false)
  }

  const handleDeleteDate = (index) => {
    const updatedDates = informativeDates.filter((_, i) => i !== index)
    handleInputChange({
      target: {
        name: 'mdata',
        value: {
          ...event.mdata,
          informative_dates: updatedDates,
        },
      },
    })
  }

  return (
    <div className="space-y-6 mb-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Fechas Informativas</h2>
        <div className="flex items-center text-sm text-muted-foreground">
          <Info className="h-4 w-4 mr-2" />
          <p>
            Estas fechas son solo informativas y no afectan la configuración del
            evento
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {informativeDates.length > 0
          ? informativeDates.map((date, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-4 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <CalendarDays className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium">{date.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {date.date
                        ? format(
                            parse(date.date, 'yyyy-MM-dd', new Date()),
                            'PPP',
                            { locale: es }
                          )
                        : 'Fecha no especificada'}
                    </p>
                  </div>
                </div>
                {isEditing && (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditDate(index)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDate(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))
          : !isEditing && (
              <p className="text-muted-foreground italic">
                No hay fechas informativas definidas para este evento.
              </p>
            )}
        {isEditing && (
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleAddDate}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar nueva fecha informativa
          </Button>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentIndex !== null ? 'Editar' : 'Agregar'} Fecha Informativa
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Título
              </label>
              <Input
                id="title"
                value={currentDate?.title || ''}
                onChange={(e) =>
                  setCurrentDate({ ...currentDate, title: e.target.value })
                }
                placeholder="Título de la fecha informativa"
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha
              </label>
              <Calendar
                mode="single"
                selected={
                  currentDate?.date
                    ? parse(currentDate.date, 'yyyy-MM-dd', new Date())
                    : undefined
                }
                onSelect={(newDate) =>
                  setCurrentDate({
                    ...currentDate,
                    date: newDate ? format(newDate, 'yyyy-MM-dd') : '',
                  })
                }
                className="rounded-md border"
              />
            </div>
            <Button onClick={handleSaveDate} className="w-full">
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
