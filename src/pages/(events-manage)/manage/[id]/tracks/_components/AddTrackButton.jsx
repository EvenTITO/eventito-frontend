import { useState } from 'react'
import { Button } from '@nextui-org/button'
import Icon from '@/components/Icon'
import MiniModal from '@/components/Modal/MiniModal'
import NameInput from '@/components/Forms/NameInput'

export default function AddTrackButton({ onSave, isLoading }) {
  const [track, setTrack] = useState('')

  const handleSubmit = async (onClose) => {
    if (track) {
      await onSave(track)
      setTrack('')
      onClose(false)
    }
  }

  function trigger(onOpen) {
    return (
      <Button
        color="primary"
        variant="light"
        className="w-full"
        startContent={<Icon name="Plus" />}
        onPress={onOpen}
      >
        Agregar track
      </Button>
    )
  }

  return (
    <MiniModal
      trigger={trigger}
      title="Nuevo track"
      onSubmit={handleSubmit}
      isPending={isLoading}
    >
      <NameInput
        label="Ingresar título del track"
        value={track}
        setValue={setTrack}
      />
    </MiniModal>
  )
}
