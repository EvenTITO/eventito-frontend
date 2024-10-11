import EventDetails from './EventDetails'
import EventCalendar from './EventCalendar'
import { MotionDiv, MotionH2, MotionP } from './Animation'
import { Textarea } from '@/components/ui/textarea'

export default function EventContent({
  event,
  isEditing,
  handleInputChange,
  handleDateChange,
  datesOpen,
  handleDatesOpen,
}) {
  return (
    <>
      <EventDetails
        event={event}
        isEditing={isEditing}
        handleInputChange={handleInputChange}
      />
      <EventCalendar
        event={event}
        isEditing={isEditing}
        handleDateChange={handleDateChange}
        datesOpen={datesOpen}
        handleDatesOpen={handleDatesOpen}
      />
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
    </>
  )
}
