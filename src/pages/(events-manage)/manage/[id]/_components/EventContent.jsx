import EventDetails from './EventDetails'
import AboutDescriptions from './AboutDescriptions'

export default function EventContent({
  event,
  isEditing,
  handleInputChange,
}) {
  return (
    <>
      <EventDetails
        event={event}
        isEditing={isEditing}
        handleInputChange={handleInputChange}
      />
      <AboutDescriptions
        event={event}
        isEditing={isEditing}
        handleInputChange={handleInputChange}
      />
    </>
  )
}
