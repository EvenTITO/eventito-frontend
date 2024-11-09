import { Tooltip } from '@nextui-org/tooltip'
import Icon from '@/components/Icon'
import { useState } from 'react'
import MiniModal from '@/components/Modal/MiniModal'
import UserSelector from '@/components/Forms/UserSelector'
import DeleteAction from '@/components/Actions/DeleteAction'

export default function TrackActions({
  track,
  chairs,
  addChair,
  changeChair,
  deleteTrack,
}) {
  return (
    <div className="relative flex items-center gap-2">
      {track.mail ? (
        <ChangeChair track={track} chairs={chairs} changeChair={changeChair} />
      ) : (
        <AddChair track={track} chairs={chairs} addChair={addChair} />
      )}
      <DeleteAction
        tooltip="Eliminar track"
        onDelete={() => deleteTrack(track)}
      />
    </div>
  )
}

function AddChair({ track, addChair, chairs }) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChair, setSelectedChair] = useState(null)

  async function handleNewChair(onClose) {
    setIsLoading(true)
    await addChair(track.track, selectedChair)
    setIsLoading(false)
    onClose()
  }

  function trigger(onOpen) {
    return (
      <Tooltip content="Agregar chair">
        <span
          onClick={onOpen}
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
        >
          <Icon name="Plus" />
        </span>
      </Tooltip>
    )
  }

  return (
    <MiniModal
      trigger={trigger}
      title={track.track}
      onSubmit={handleNewChair}
      isPending={isLoading}
    >
      <UserSelector users={chairs} setSelectedUser={setSelectedChair} />
    </MiniModal>
  )
}

function ChangeChair({ track, changeChair, chairs }) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChair, setSelectedChair] = useState(null)

  async function handleNewChair(onClose) {
    setIsLoading(true)
    await changeChair(track.track, track.mail, selectedChair)
    setIsLoading(false)
    onClose()
  }

  function trigger(onOpen) {
    return (
      <Tooltip content="Cambiar chair">
        <span
          onClick={onOpen}
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
        >
          <Icon name="Pencil" />
        </span>
      </Tooltip>
    )
  }

  return (
    <MiniModal
      trigger={trigger}
      title={track.track}
      onSubmit={handleNewChair}
      isPending={isLoading}
    >
      <UserSelector users={chairs} setSelectedUser={setSelectedChair} />
    </MiniModal>
  )
}
