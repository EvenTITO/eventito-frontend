import TitleInput from '@/components/Forms/TitleInput'
import FullModal from '@/components/Modal/FullModal'
import { Button } from '@nextui-org/button'
import { useState } from 'react'

export default function NewEventButton() {
  const [title, setTitle] = useState(null)

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

  return (
    <FullModal
      trigger={trigger}
      title="Crear un nuevo evento"
      onSubmit={() => alert(title)}
      isPending={false}
    >
      <TitleInput label="Título del evento" value={title} setValue={setTitle} />
    </FullModal>
  )
}
