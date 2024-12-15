import EventTypeSelector from '@/components/Forms/EventTypeSelector'
import FullModal from '@/components/Modal/FullModal'
import LabelForm from '@/components/Forms/LabelForm'
import ShortDescriptionTextArea from '@/components/Forms/ShortDescriptionTextArea'
import TitleInput from '@/components/Forms/TitleInput'
import { Button } from '@nextui-org/button'
import { createEvent } from '@/services/api/events/general/hooks'
import { useState } from 'react'

export default function NewEventButton() {
  const { mutateAsync: newEvent } = createEvent()

  async function handleCreateEvent(title, eventType, shortDescription) {
    await newEvent({
      title: title,
      event_type: eventType,
      organized_by: 'pepe@gmail.com',
      short_description: shortDescription,
    })
  }

  return <NewEventModal handleCreateEvent={handleCreateEvent} />
}

function NewEventModal({ handleCreateEvent }) {
  const [title, setTitle] = useState(null)
  const [typeOfEvent, setTypeOfEvent] = useState(null)
  const [shortDescription, setShortDescription] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  function trigger(onOpen) {
    return (
      <Button
        variant="solid"
        color="primary"
        radius="sm"
        size="lg"
        onClick={onOpen}
      >
        Crear un evento
      </Button>
    )
  }

  function cleanForm() {
    setTitle(null)
    setTypeOfEvent(null)
    setShortDescription(null)
  }

  async function handleSubmit(onClose) {
    if (
      title &&
      typeOfEvent &&
      shortDescription &&
      title.length > 0 &&
      shortDescription.length > 0
    ) {
      setIsLoading(true)
      await handleCreateEvent(title, typeOfEvent, shortDescription)
      setIsLoading(false)

      cleanForm()
      onClose()
    } else {
      alert('Completar todos los campos obligatorios para crear el evento.')
    }
  }

  return (
    <FullModal
      trigger={trigger}
      title="Crear un nuevo evento"
      onSubmit={handleSubmit}
      isPending={isLoading}
    >
      <TitleInput
        label={<LabelForm label="Título del evento" isRequired />}
        value={title}
        setValue={setTitle}
      />
      <EventTypeSelector
        label={<LabelForm label="Seleccionar el tipo de evento" isRequired />}
        selectedType={typeOfEvent}
        setSelectedType={setTypeOfEvent}
      />
      <ShortDescriptionTextArea
        label={<LabelForm label="Breve descripción del evento" isRequired />}
        shortDescription={shortDescription}
        setShortDescription={setShortDescription}
      />
    </FullModal>
  )
}
