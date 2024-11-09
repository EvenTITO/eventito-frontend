import { useState } from 'react'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import {
  useAddChairToTrack,
  useAddTrack,
  useDeleteChairOfTrack,
  useUpdateTracks,
} from '@/hooks/manage/tracksHooks'
import { unifyEventTracksWithChairs } from './_components/utils.js'
import { CREATED_STATUS } from '@/lib/Constants.js'
import TracksTable from './_components/TracksTable'
import AddTrackButton from './_components/AddTrackButton'

export default function Page({ event, chairs, tracksByChair }) {
  const [tracks, setTracks] = useState(
    unifyEventTracksWithChairs(event.tracks, tracksByChair).map(
      (track, index) => ({
        ...track,
        id: index,
      })
    )
  )
  const addChairToTrack = useAddChairToTrack()
  const deleteChairOfTrack = useDeleteChairOfTrack()
  const addTrack = useAddTrack()
  const updateTracks = useUpdateTracks()
  const canAddOrRemoveTracks = event.status === CREATED_STATUS // || event.status === STARTED_STATUS

  function getUserIdByEmail(email) {
    return chairs.filter((chair) => chair.email === email)[0]?.userId
  }

  async function onDeleteChair(track, email) {
    const userId = getUserIdByEmail(email)
    await deleteChairOfTrack.mutateAsync({ track: track, userId: userId })
    setTracks(tracks.map((t) => (t.track === track ? { ...t, mail: null } : t)))
  }

  async function onAddChair(track, email) {
    const userId = getUserIdByEmail(email)
    await addChairToTrack.mutateAsync({ track: track, userId: userId })
    setTracks(
      tracks.map((t) => (t.track === track ? { ...t, mail: email } : t))
    )
  }

  const handleAddTrack = async (newTrack) => {
    await addTrack.mutateAsync({
      eventTracks: tracks.map((track) => track.track),
      track: newTrack,
    })
    setTracks([...tracks, { id: tracks.length, track: newTrack, mail: null }])
  }

  const handleDeleteTrack = async (trackToDelete) => {
    console.log(trackToDelete)
    if (!trackToDelete) return

    if (trackToDelete.mail) {
      await onDeleteChair(trackToDelete.track, trackToDelete.mail)
    }
    const updatedTracks = tracks.filter((t) => t.track !== trackToDelete.track)
    await updateTracks.mutateAsync({
      tracks: updatedTracks.map((t) => t.track),
    })

    setTracks(updatedTracks)
  }

  return (
    <ContainerPage>
      <div className="space-y-6">
        <TracksTable
          tracks={tracks}
          chairs={chairs}
          onAddChair={onAddChair}
          onDeleteChair={onDeleteChair}
          onDeleteTrack={handleDeleteTrack}
          eventIsPublic={!canAddOrRemoveTracks}
        />
        <AddTrackButton
          onSave={handleAddTrack}
          isLoading={addTrack.isPending}
        />
      </div>
    </ContainerPage>
  )
}
