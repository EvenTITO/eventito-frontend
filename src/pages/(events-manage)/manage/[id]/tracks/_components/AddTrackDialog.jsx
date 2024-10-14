import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import ButtonWithLoading from '@/components/ButtonWithLoading'

export default function AddTrackDialog({ onSave, isLoading }) {
  const [track, setTrack] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (track) {
      await onSave(track)
      setTrack('')
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Agregar track
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar nuevo track</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              id="track"
              placeholder="Título del track"
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <ButtonWithLoading
              type="submit"
              disabled={!track}
              isLoading={isLoading}
            >
              Agregar
            </ButtonWithLoading>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
