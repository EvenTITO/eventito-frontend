import { useState } from 'react'
import { ChevronRight, ChevronDown, Plus, X, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ChairDialog from './ChairDialog'

export default function TracksTable({
  tracks,
  chairs,
  onAdd,
  onDelete,
  isPending,
}) {
  const [expandedTracks, setExpandedTracks] = useState(new Set())

  const toggleTrackExpansion = (trackId) => {
    setExpandedTracks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(trackId)) {
        newSet.delete(trackId)
      } else {
        newSet.add(trackId)
      }
      return newSet
    })
  }

  async function deleteChair(track, email) {
    await onDelete(track, email)
  }

  async function addChair(track, newEmail) {
    await onAdd(track, newEmail)
  }

  if (tracks.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">Ningún track cargado</h2>
        <p className="text-gray-500 mb-4">
          Agregar uno nuevo para visualizarlo. Debe configurar al menos un track
          para publicar el evento.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {tracks.map((track) => (
        <TrackItem
          key={track.id}
          track={track}
          chairs={chairs}
          isExpanded={expandedTracks.has(track.id)}
          onToggleExpand={() => toggleTrackExpansion(track.id)}
          onDeleteChair={deleteChair}
          onAddChair={addChair}
          isPending={isPending}
        />
      ))}
    </div>
  )
}

function TrackItem({
  track,
  chairs,
  isExpanded,
  onToggleExpand,
  onDeleteChair,
  onAddChair,
  isPending,
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div
        className="flex items-center p-4 bg-white hover:bg-gray-50 cursor-pointer"
        onClick={onToggleExpand}
      >
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 mr-2 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 mr-2 text-gray-500" />
        )}
        <span className="font-medium">{track.track}</span>
      </div>
      {isExpanded && (
        <div className="p-4 bg-gray-50">
          {track.mail ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${track.mail}`}
                  />
                  <AvatarFallback>{track.mail[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>{track.mail}</span>
              </div>
              <div className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDeleteChair(track.track, track.mail)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Borrar
                </Button>
              </div>
            </div>
          ) : (
            <ChairDialog
              track={track.track}
              chairs={chairs}
              onAddChair={onAddChair}
              isPending={isPending}
              triggerButton={
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar chair
                </Button>
              }
            />
          )}
        </div>
      )}
    </div>
  )
}
