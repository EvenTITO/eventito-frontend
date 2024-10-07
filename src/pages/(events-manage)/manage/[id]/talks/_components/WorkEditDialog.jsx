import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import ButtonWithLoading from '@/components/ButtonWithLoading'

export default function WorkEditDialog({
  isOpen,
  onClose,
  work,
  rooms,
  onSave,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [editedWork, setEditedWork] = useState({ ...work })

  const handleChange = (field, value) => {
    setEditedWork((prev) => ({
      ...prev,
      talk: {
        ...prev.talk,
        [field]: value,
      },
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    await onSave(editedWork.id, editedWork.track, editedWork.talk)
    setIsLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{work.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label className="text-base font-semibold">Ubicación</Label>
            <Select
              value={editedWork.talk?.location || ''}
              onValueChange={(value) => handleChange('location', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar ubicación" />
              </SelectTrigger>
              <SelectContent>
                {rooms.map((room) => (
                  <SelectItem key={room} value={room}>
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      {room}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-base font-semibold">Fecha y Hora</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={`w-full justify-start text-left font-normal ${
                    !editedWork.talk?.date && 'text-muted-foreground'
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {editedWork.talk?.date ? (
                    format(new Date(editedWork.talk.date), 'PPP HH:mm')
                  ) : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    editedWork.talk?.date
                      ? new Date(editedWork.talk.date)
                      : undefined
                  }
                  onSelect={(date) =>
                    date && handleChange('date', date.toISOString())
                  }
                  initialFocus
                />
                <div className="p-3 border-t">
                  <Label>Hora</Label>
                  <input
                    type="time"
                    value={
                      editedWork.talk?.date
                        ? format(new Date(editedWork.talk.date), 'HH:mm')
                        : ''
                    }
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':')
                      const newDate = editedWork.talk?.date
                        ? new Date(editedWork.talk.date)
                        : new Date()
                      newDate.setHours(parseInt(hours), parseInt(minutes))
                      handleChange('date', newDate.toISOString())
                    }}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <ButtonWithLoading isLoading={isLoading} onClick={handleSave}>
            Guardar cambios
          </ButtonWithLoading>
        </div>
      </DialogContent>
    </Dialog>
  )
}
