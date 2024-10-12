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
import ButtonWithLoading from '@/components/ButtonWithLoading'
import { Edit2, Plus } from 'lucide-react'

export default function RoomDialog({ room, onSave, index = undefined }) {
  const [formData, setFormData] = useState(room || defaultEmptyRoom)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!room) {
      setFormData(defaultEmptyRoom)
    }
  }, [room, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSave(formData, index)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {room ? (
            <>
              <Edit2 className="h-4 w-4 mr-2" /> Editar sala
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" /> Nueva sala
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {room ? 'Editar sala' : 'Agregar nueva sala'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Ubicación</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder={'Ingrese una ubicación'}
            />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              placeholder={'Ingrese una descripción'}
            />
          </div>
          <div className="w-full flex justify-end">
            <ButtonWithLoading
              type="submit"
              disabled={!formData.name || !formData.description}
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
}
