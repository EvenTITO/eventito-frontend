import { Tooltip } from '@nextui-org/tooltip'
import Icon from '@/components/Icon'
import { useState } from 'react'
import MiniModal from '@/components/Modal/MiniModal'
import UserSelector from '@/components/Forms/UserSelector'

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
        <Tooltip content="Cambiar chair">
          <button className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Icon name="Pencil" />
          </button>
        </Tooltip>
      ) : (
        <AddChair track={track} chairs={chairs} addChair={addChair} />
      )}
      <Tooltip color="danger" content="Eliminar track">
        <button
          className="text-lg text-danger cursor-pointer active:opacity-50"
          onClick={() => deleteTrack(track)}
        >
          <Icon name="Trash" />
        </button>
      </Tooltip>
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
      title={`Agregar chair a: ${track.track}`}
      onSubmit={handleNewChair}
      isPending={isLoading}
    >
      <UserSelector users={chairs} setSelectedUser={setSelectedChair} />
    </MiniModal>
  )
}
