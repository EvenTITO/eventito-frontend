import { MotionDiv, MotionH2, MotionP } from './Animation'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

export default function AboutDescriptions({
  event,
  handleInputChange,
  isEditing,
}) {
  return (
    <MotionDiv className="prose max-w-none mb-12">
      <MotionH2 className="text-2xl font-semibold mb-4">
        Sobre el evento
      </MotionH2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Descripción corta</h3>
        {isEditing ? (
          <Input
            name="short_description"
            value={event.mdata?.short_description || ''}
            onChange={handleInputChange}
            maxLength={200}
            placeholder="Ingresar una breve descripción (máximo 200 caracteres) para la vista resumida del evento"
            className="w-full"
          />
        ) : (
          <MotionP>{event.mdata?.short_description || ''}</MotionP>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Acerca del evento</h3>
        {isEditing ? (
          <Textarea
            name="description"
            value={event.description}
            onChange={handleInputChange}
            rows={5}
            className="w-full border-none shadow-none focus-visible:ring-0 px-0 resize-none"
          />
        ) : (
          <MotionP>{event.description}</MotionP>
        )}
      </div>
    </MotionDiv>
  )
}
