import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Calendar, Plus, DollarSign } from 'lucide-react'
import { SPEAKER_ROLE, ATTENDEE_ROLE } from '@/lib/Constants.js'
import { generateRelatedDate, getDateByName } from '@/lib/utils.js'

export default function PriceDialog({ price, dates, onSave }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(price || defaultFormData)
  const [relatedDate, setRelatedDate] = useState(
    getDateByName(dates, price?.related_date) || ''
  )

  useEffect(() => {
    if (!price) {
      setFormData(defaultFormData)
    }
  }, [price, isOpen])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }))
  }

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleRoleChange = (role, checked) => {
    setFormData((prev) => {
      const newRoles = checked
        ? [...prev.roles, role]
        : prev.roles.filter((r) => r !== role)
      return { ...prev, roles: newRoles }
    })
  }

  const handleChangeRelatedDate = (e) => {
    const relatedDate = generateRelatedDate(formData, e.target.value)
    setRelatedDate(relatedDate)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...formData, related_date: relatedDate })
    setIsOpen(false)
  }

  const isRoleSelected = formData.roles.length > 0

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          {price ? 'Editar tarifa' : 'Nueva tarifa'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {price ? 'Editar tarifa' : 'Agregar nueva tarifa'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <div className="space-y-6 py-4 px-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Información básica</h2>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Título de tarifa
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Tarifa temprana"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe los detalles de esta tarifa"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value" className="text-sm font-medium">
                  Valor de la tarifa
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="value"
                    name="value"
                    type="number"
                    value={formData.value}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Configuración adicional</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label
                      htmlFor="need_verification"
                      className="text-sm font-medium"
                    >
                      Requiere verificación
                    </Label>
                    <p className="text-sm text-gray-500">
                      Activa si esta tarifa necesita ser verificada
                    </p>
                  </div>
                  <Switch
                    id="need_verification"
                    checked={formData.need_verification}
                    onCheckedChange={(checked) =>
                      handleSwitchChange('need_verification', checked)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="related_date" className="text-sm font-medium">
                    Fecha límite (opcional)
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="related_date"
                      name="related_date"
                      type="date"
                      value={relatedDate.date}
                      onChange={handleChangeRelatedDate}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Roles aplicables
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Selecciona al menos un rol para esta tarifa
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="role-attendee"
                        className="text-sm font-medium"
                      >
                        Asistentes
                      </Label>
                      <Switch
                        id="role-attendee"
                        checked={formData.roles.includes(ATTENDEE_ROLE)}
                        onCheckedChange={(checked) =>
                          handleRoleChange(ATTENDEE_ROLE, checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="role-author"
                        className="text-sm font-medium"
                      >
                        Autores
                      </Label>
                      <Switch
                        id="role-author"
                        checked={formData.roles.includes(SPEAKER_ROLE)}
                        onCheckedChange={(checked) =>
                          handleRoleChange(SPEAKER_ROLE, checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <DialogFooter className="border-t p-4 mt-auto">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="mr-2"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={
              !formData.name ||
              !formData.description ||
              formData.value === '' ||
              !isRoleSelected
            }
          >
            {price ? 'Guardar cambios' : 'Crear tarifa'}
          </Button>
        </DialogFooter>
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
