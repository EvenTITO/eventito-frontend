import { cn } from '@/lib/utils'

export default function EventTypeSelector({
  label,
  selectedType,
  setSelectedType,
}) {
  const selectedTypes = [
    {
      id: 'conference',
      title: 'Conferencia',
      description:
        'Evento con múltiples charlas, presentaciones de trabajos, revisores y chairs.',
    },
    {
      id: 'talk',
      title: 'Charla',
      description:
        'Evento con una sola charla, llevada a cabo de forma virtual o presencial.',
    },
  ]

  return (
    <div className="space-y-4">
      {label}
      <div className="flex flex-row gap-4 grid-cols-2">
        {selectedTypes.map((type) => (
          <div
            key={type.id}
            className={cn(
              'p-4 border rounded-lg cursor-pointer transition-all',
              selectedType === type.id
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 hover:border-primary'
            )}
            onClick={() => setSelectedType(type.id)}
          >
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">{type.title}</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
