import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import AddTrackDialog from './_components/AddTrackDialog'
import {
  useAddChairToTrack,
  useAddTrack,
  useDeleteChairOfTrack,
} from '@/hooks/manage/tracksHooks'
import { toast } from '@/hooks/use-toast.js'
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

  const addChairToTrack = useAddChairToTrack()
  const deleteChairOfTrack = useDeleteChairOfTrack()
  const addTrack = useAddTrack()
  const canAddOrRemoveTracks =
    event.status === CREATED_STATUS || event.status === STARTED_STATUS

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
    try {
      await addTrack.mutateAsync({
        eventTracks: tracks.map((track) => track.track),
        track: newTrack,
      })
      setTracks([...tracks, { id: tracks.length, track: newTrack, mail: null }])
      toast({
        title: 'Track agregado',
        description: `${newTrack} agregado con éxito.`,
      })
    } catch (e) {
      console.error(e)
      toast({
        title: 'Error',
        description: 'Error al agregar el track. Intente nuevamente más tarde.',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteTrack = async () => {
    alert('Delete track functionality not implemented yet')
    setDeleteDialogOpen(false)
    setTrackToDelete(null)
  }

  return (
    <ContainerPage>
      <TitlePage
        title={'Administración de tracks'}
        rightComponent={
          canAddOrRemoveTracks && <AddTrackDialog onSave={handleAddTrack} />
        }
      />
      <div className="space-y-4 pt-6">
        {tracks.map((track) => (
          <TrackItem
            key={track.id}
            track={track}
            chairs={chairs}
            onDelete={onDelete}
            onAdd={onAdd}
            canAddOrRemoveTracks={canAddOrRemoveTracks}
            setTrackToDelete={setTrackToDelete}
            setDeleteDialogOpen={setDeleteDialogOpen}
            addChairToTrack={addChairToTrack}
          />
        ))}
      </div>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación de track</DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex items-center space-x-2 text-yellow-600">
            <AlertTriangle className="h-5 w-5" />
            <span>
              Si este track tiene trabajos presentados, no podrá recuperarlos
              después de la eliminación.
            </span>
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteTrack}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContainerPage>
  )
}
