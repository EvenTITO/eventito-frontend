import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Edit2, Plus } from 'lucide-react'
import {
  INSCRIPTION_ROLES_LABELS,
  INSCRIPTION_ROLES_LABELS_REVERSE,
} from '@/lib/Constants.js'

export default function PriceDialog({ price, onSave }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(
    sanitizePriceBackToFront(price) || defaultFormData
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const formDataSanitized = sanitizePriceFrontToBack(formData)
    onSave(formDataSanitized)
    setIsOpen(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {price ? (
            <>
              <Edit2 className="h-4 w-4 mr-2" /> Editar tarifa
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" /> Nueva tarifa
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {price ? 'Editar tarifa' : 'Agregar nueva tarifa'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Título de tarifa</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="value">Valor de la tarifa</Label>
            <Input
              id="value"
              name="value"
              type="number"
              value={formData.value}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="need_verification"
              name="need_verification"
              checked={formData.need_verification}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  need_verification: Boolean(checked),
                }))
              }
            />
            <Label htmlFor="need_verification">Requiere verificación</Label>
          </div>
          <div>
            <Label htmlFor="related_date">Fecha límite (opcional)</Label>
            <Input
              id="related_date"
              name="related_date"
              type="date"
              value={formData.related_date || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="roles">Roles (separados por coma)</Label>
            <Input
              id="roles"
              name="roles"
              placeholder="Roles permitidos: Autor o Asistente"
              value={formData.roles}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  roles: e.target.value.split(',').map((role) => role.trim()),
                }))
              }
            />
          </div>
          <Button type="submit">Continuar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const defaultFormData = {
  name: '',
  description: '',
  value: 0,
  need_verification: false,
  related_date: null,
  roles: [],
}

function sanitizePriceFrontToBack(formData) {
  return {
    ...formData,
    roles: formData.roles
      .map((role) => role.trim())
      .map((role) => INSCRIPTION_ROLES_LABELS_REVERSE[role]),
  }
}

function sanitizePriceBackToFront(formData) {
  return !formData
    ? undefined
    : {
        ...formData,
        roles: formData.roles
          .map((role) => role.trim())
          .map((role) => INSCRIPTION_ROLES_LABELS[role])
          .join(', '),
      }
}
