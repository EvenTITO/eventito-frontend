import { MotionDiv, MotionH2, MotionP } from './Animation'
import { Textarea } from '@/components/ui/textarea'

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
    </MotionDiv>
  )
}
