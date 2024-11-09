import { useState } from 'react'
import MiniModal from '@/components/Modal/MiniModal'
import UserSelector from '@/components/Forms/UserSelector'
import DeleteAction from '@/components/Actions/DeleteAction'
import ActionsContent from '@/components/Actions/ActionsContent'
import TooltipAction from '@/components/Actions/TooltipAction'

export default function TrackActions({
  track,
  chairs,
  addChair,
  changeChair,
  deleteTrack,
  eventIsPublic,
}) {
  return (
    <ActionsContent>
      {track.mail ? (
        <ChangeChair track={track} chairs={chairs} changeChair={changeChair} />
      ) : (
        <AddChair track={track} chairs={chairs} addChair={addChair} />
      )}
      {!eventIsPublic ? (
        <DeleteAction
          tooltip="Eliminar track"
          onDelete={() => deleteTrack(track)}
        />
      ) : null}
    </ActionsContent>
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
    return <TooltipAction content="Agregar chair" onOpen={onOpen} icon="Plus" />
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
      <TooltipAction content="Cambiar chair" onOpen={onOpen} icon="Pencil" />
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
