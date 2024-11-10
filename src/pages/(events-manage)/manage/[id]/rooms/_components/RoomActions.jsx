import MiniModal from '@/components/Modal/MiniModal'
import ActionsContent from '@/components/Actions/ActionsContent'
import DeleteAction from '@/components/Actions/DeleteAction'
import TooltipAction from '@/components/Actions/TooltipAction'
import { useState } from 'react'
import NameInput from '@/components/Forms/NameInput'

export default function RoomActions({ room, onUpdate, onDelete }) {
  return (
    <ActionsContent className={"justify-end"}>
      <ChangeRoom room={room} onUpdate={onUpdate} />
      <DeleteAction tooltip="Eliminar sala" onDelete={() => onDelete(room)} />
    </ActionsContent>
  )
}

function ChangeRoom({ room, onUpdate }) {
  const [value, setValue] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleUpdateRoom(onClose) {
    setIsLoading(true)
    await onUpdate({ name: value })
    setIsLoading(false)
    setValue(null)
    onClose()
  }

  function trigger(onOpen) {
    return <TooltipAction content="Editar sala" onOpen={onOpen} icon="Pencil" />
  }

  return (
    <MiniModal
      trigger={trigger}
      title={room.name}
      onSubmit={handleUpdateRoom}
      isPending={isLoading}
    >
      <NameInput
        label="Editar nombre de la sala"
        value={value}
        setValue={setValue}
      />
    </MiniModal>
  )
}
