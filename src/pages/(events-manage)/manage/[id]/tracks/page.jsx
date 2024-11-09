import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import AddTrackDialog from './_components/AddTrackDialog'
import {
  useAddChairToTrack,
  useAddTrack,
  useDeleteChairOfTrack,
  useUpdateTracks,
} from '@/hooks/manage/tracksHooks'
import { unifyEventTracksWithChairs } from './_components/utils.js'
import { CREATED_STATUS, STARTED_STATUS } from '@/lib/Constants.js'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import TrackItem from './_components/TrackItem'
import TracksTable2 from './_components/TracksTable2'
import { isPending } from '@reduxjs/toolkit'

export default function Page({ event, chairs, tracksByChair }) {
  const [tracks, setTracks] = useState(
    unifyEventTracksWithChairs(event.tracks, tracksByChair).map(
      (track, index) => ({
        ...track,
        id: index,
      })
    )
  )
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [trackToDelete, setTrackToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const addChairToTrack = useAddChairToTrack()
  const deleteChairOfTrack = useDeleteChairOfTrack()
  const addTrack = useAddTrack()
  const updateTracks = useUpdateTracks()
  // TODO: solo queremos en este caso??
  const canAddOrRemoveTracks = event.status === CREATED_STATUS // || event.status === STARTED_STATUS

  function getUserIdByEmail(email) {
    return chairs.filter((chair) => chair.email === email)[0]?.userId
  }

  async function onDelete(track, email) {
    const userId = getUserIdByEmail(email)
    await deleteChairOfTrack.mutateAsync({ track: track, userId: userId })
    setTracks(tracks.map((t) => (t.track === track ? { ...t, mail: null } : t)))
  }

  async function onAdd(track, email) {
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

  const handleDeleteTrack = async () => {
    if (!trackToDelete) return

    setIsDeleting(true)
    try {
      if (trackToDelete.mail) {
        await onDelete(trackToDelete.track, trackToDelete.mail)
      }
      const updatedTracks = tracks.filter(
        (t) => t.track !== trackToDelete.track
      )
      await updateTracks.mutateAsync({
        tracks: updatedTracks.map((t) => t.track),
      })

      setTracks(updatedTracks)
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setTrackToDelete(null)
    }
  }

  return (
    <ContainerPage>
      <div className='space-y-6'>
      <TracksTable2
        tracks={tracks}
        chairs={chairs}
        onAdd={handleDeleteTrack}
        onDelete={handleAddTrack}
        isPending={isPending}
      />
      <AddTrackDialog onSave={handleAddTrack} isLoading={addTrack.isPending} />
      </div>
    </ContainerPage>
  )
}
