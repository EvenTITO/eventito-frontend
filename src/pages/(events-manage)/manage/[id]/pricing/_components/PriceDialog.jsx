import React, { useEffect, useState } from 'react'
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
import PriceRoleSelector from '@/pages/(events-manage)/manage/[id]/pricing/_components/PriceRoleSelector.jsx'
import { generateRelatedDate, getDateByName } from '@/lib/utils.js'

export default function PriceDialog({ price, dates, onSave }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(price || defaultFormData)
  const [selectedRole, setSelectedRole] = useState(
    formData.roles.map((r) => INSCRIPTION_ROLES_LABELS[r]).join(', ')
  )
  const [relatedDate, setRelatedDate] = useState(
    getDateByName(dates, price?.related_date) || ''
  )

  useEffect(() => {
    if (!price) {
      setFormData(defaultFormData)
    }
  }, [price, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...formData, related_date: relatedDate })
    setIsOpen(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleChangeRole = (e) => {
    setSelectedRole(e)
    if (e === 'Autor, Asistente') {
      setFormData({ ...formData, roles: Object.keys(INSCRIPTION_ROLES_LABELS) })
    } else {
      setFormData({ ...formData, roles: [INSCRIPTION_ROLES_LABELS_REVERSE[e]] })
    }
  }

  const handleChangeRelatedDate = (e) => {
    const relatedDate = generateRelatedDate(formData, e.target.value)
    setRelatedDate(relatedDate)
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
              value={relatedDate.date}
              onChange={handleChangeRelatedDate}
            />
          </div>
          <div>
            <Label htmlFor="roles">Roles</Label>
            <PriceRoleSelector
              roles={[
                ...Object.values(INSCRIPTION_ROLES_LABELS),
                'Autor, Asistente',
              ]}
              selectedRole={selectedRole}
              setSelectedRole={handleChangeRole}
            />
          </div>
          <Button
            type="submit"
            disabled={!selectedRole || !formData.name || !formData.description}
          >
            Continuar
          </Button>
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
