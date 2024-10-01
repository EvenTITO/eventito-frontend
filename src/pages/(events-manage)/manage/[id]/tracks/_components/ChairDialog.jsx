import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import ButtonWithLoading from '@/components/ButtonWithLoading'

export default function ChairDialog({
  track,
  initialEmail = '',
  onUpdateChair,
  onAddChair,
  triggerButton,
  isPending,
}) {
  const [email, setEmail] = useState(initialEmail)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email) {
      if (initialEmail) {
        await onUpdateChair(track, email, initialEmail)
      } else {
        console.log('en fn', track, email)
        await onAddChair(track, email)
      }
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialEmail ? 'Actualizar chair' : 'Agregar chair'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label htmlFor="track">Email del chair</Label>
          <Input
            placeholder="Ingrese un email de miembro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="w-full flex justify-end">
            <ButtonWithLoading
              type="submit"
              disabled={!email}
              isLoading={isPending}
            >
              Continuar
            </ButtonWithLoading>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
