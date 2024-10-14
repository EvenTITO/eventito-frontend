import { Trash2, Plus, UserMinus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ChairDialog from './ChairDialog'

export default function TrackItem({
  track,
  chairs,
  onDelete,
  onAdd,
  canAddOrRemoveTracks,
  setTrackToDelete,
  setDeleteDialogOpen,
  addChairToTrack,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary">{track.track}</h3>
        {canAddOrRemoveTracks && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setTrackToDelete(track)
              setDeleteDialogOpen(true)
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar track
          </Button>
        )}
      </div>
      {track.mail ? (
        <div className="flex items-center justify-between bg-secondary/10 p-3 rounded-md">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${track.mail}`}
              />
              <AvatarFallback>{track.mail[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <span className="text-sm font-medium">{track.mail}</span>
              <p className="text-xs text-muted-foreground">Chair asignado</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(track.track, track.mail)}
          >
            <UserMinus className="h-4 w-4 mr-2" />
            Remover chair
          </Button>
        </div>
      ) : (
        <ChairDialog
          track={track.track}
          chairs={chairs}
          onAddChair={onAdd}
          isPending={addChairToTrack.isPending}
          triggerButton={
            <Button size="sm" variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Agregar chair
            </Button>
          }
        />
      )}
    </div>
  )
}
