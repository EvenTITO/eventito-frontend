import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import ButtonWithLoading from '@/components/ButtonWithLoading'
import { useAddAuthorToWork } from '@/hooks/events/authorHooks'

export default function AddAuthorDialog() {
  const [email, setEmail] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [isSpeaker, setIsSpeaker] = useState(false)
  const [notifyAuthor, setNotifyAuthor] = useState(false)
  const [open, setOpen] = useState(false)

  const { mutateAsync: addAuthor, isPending, error } = useAddAuthorToWork()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email) {
      await addAuthor({
        authorData: {
          email,
          full_name: 'usuario',
          affiliation,
          isSpeaker,
          notifyAuthor,
        },
      })
      setEmail('')
      setAffiliation('')
      setIsSpeaker(false)
      setNotifyAuthor(false)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar autor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar nuevo autor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email del autor</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="affiliation">Filiación (opcional)</Label>
            <Input
              id="affiliation"
              type="text"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isSpeaker"
                checked={isSpeaker}
                onCheckedChange={(checked) => setIsSpeaker(Boolean(checked))}
              />
              <Label htmlFor="isSpeaker">Es presentador</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notifyAuthor"
                checked={notifyAuthor}
                onCheckedChange={(checked) => setNotifyAuthor(Boolean(checked))}
              />
              <Label htmlFor="notifyAuthor">Notificar autor vía email</Label>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <ButtonWithLoading
              type="submit"
              disabled={!email}
              isLoading={isPending}
            >
              Agregar autor
            </ButtonWithLoading>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
