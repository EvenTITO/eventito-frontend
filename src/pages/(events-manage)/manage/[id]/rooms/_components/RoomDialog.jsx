import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import ButtonWithLoading from '@/components/ButtonWithLoading'
import { Edit2, Plus } from 'lucide-react'

export default function RoomDialog({ room, onSave, index = undefined }) {
  const [formData, setFormData] = useState(room || defaultEmptyRoom)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!room) {
      setFormData(defaultEmptyRoom)
    } else {
      setFormData(room)
    }
  }, [room, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const submittedData = {
      ...formData,
      capacity: formData.capacity ? parseInt(formData.capacity, 10) : null,
    }
    setIsLoading(true)
    await onSave(submittedData, index)
    setIsLoading(false)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {room ? (
            <>
              <Edit2 className="h-4 w-4 mr-2" /> Editar
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" /> Nueva sala
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {room ? 'Editar sala' : 'Agregar nueva sala'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              Nombre de la sala
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder="Ej: Auditorio Principal"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-right">
              Descripción (opcional)
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Ej: Equipado con proyector y sistema de sonido"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-right">
              Capacidad (opcional)
            </Label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              value={formData.capacity || ''}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
              placeholder="Ej: 200"
            />
          </div>
          <div className="w-full flex justify-end">
            <ButtonWithLoading
              type="submit"
              disabled={!formData.name}
              isLoading={isLoading}
            >
              Guardar
            </ButtonWithLoading>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const defaultEmptyRoom = {
  name: '',
  description: '',
  capacity: '',
}
