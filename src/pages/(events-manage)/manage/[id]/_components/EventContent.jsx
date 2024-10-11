import EventDetails from './EventDetails'
import EventCalendar from './EventCalendar'
import AboutDescriptions from './AboutDescriptions'

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
      <AboutDescriptions
        event={event}
        isEditing={isEditing}
        handleInputChange={handleInputChange}
      />
    </>
  )
}
