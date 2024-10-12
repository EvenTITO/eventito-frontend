import { Users, MapPin, AtSign } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function EventDetails({ event, isEditing, handleInputChange }) {
  const details = [
    {
      icon: Users,
      label: 'Organizado por:',
      placeholder: 'Ingresar organizador',
      value: event.organized_by,
      name: 'organized_by',
    },
    {
      icon: MapPin,
      label: 'Ubicación:',
      placeholder: 'Ingresar ubicación',
      value: event.location,
      name: 'location',
    },
    {
      icon: AtSign,
      label: 'Contacto:',
      value: event.contact,
      name: 'contact',
      placeholder: 'Ingresar contacto',
    },
  ]

  return (
    <div className="space-y-4 mb-12">
      {isEditing ? (
        <div className="flex flex-col sm:flex-row text-sm gap-4">
          <div className="flex flex-col sm:gap-8 my-2">
            {details.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-row items-center">
                <Icon className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2 text-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-col justify-between w-full gap-2">
            {details.map(({ name, value, placeholder }) => (
              <Input
                key={name}
                name={name}
                value={value}
                onChange={handleInputChange}
                className="w-full"
                placeholder={placeholder}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-col sm:items-start gap-4 text-sm">
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center w-full">
              <Icon className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
              <span className="break-words">
                <span className="text-muted-foreground">{label}</span> {value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
