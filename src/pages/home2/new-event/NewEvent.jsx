import EventTypeSelector from '@/components/Forms/EventTypeSelector'
import FullModal from '@/components/Modal/FullModal'
import ShortDescriptionTextArea from '@/components/Forms/ShortDescriptionTextArea'
import TitleInput from '@/components/Forms/TitleInput'
import { Button } from '@nextui-org/button'
import { useState } from 'react'

export default function NewEventButton() {
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
      alert(title)
      setIsLoading(false)

      cleanForm()
      onClose()
    } else {
      alert('completar todos los campos')
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

function LabelForm({ label, isRequired = false }) {
  return (
    <div className="flex gap-1">
      <p className="font-semibold text-lg">{label}</p>
      {isRequired ? <p className="text-red-400">*</p> : null}
    </div>
  )
}
