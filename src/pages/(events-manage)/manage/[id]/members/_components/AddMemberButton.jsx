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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ButtonWithLoading from '@/components/ButtonWithLoading'
import { useAddMember } from '@/hooks/manage/membersHooks'
import {
  ALREADY_MEMBER_EXIST_ERROR_CODE,
  CHAIR_ROLE,
  EVENT_ROLES_LABELS,
  ORGANIZER_ROLE,
  USER_NOT_FOUND_ERROR_CODE,
} from '@/lib/Constants'
import { toast } from '@/hooks/use-toast.js'

export default function AddMemberButton() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [open, setOpen] = useState(false)

  const { mutateAsync: addMember, isPending, error } = useAddMember()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email && role) {
      await addMember({ newMemberEmail: email, newMemberRole: role })
        .then(() => {
          toast({
            title: 'Miembro agregado',
            description:
              'Se ha agregado exitosamente el nuevo miembro al evento.',
          })
        })
        .catch((e) => {
          let description =
            'No se pudo agregar al miembro. Por favor intente nuevamente más tarde.'
          if (error?.response?.data?.detail?.errorcode) {
            switch (error.response.data.detail.errorcode) {
              case ALREADY_MEMBER_EXIST_ERROR_CODE:
                description =
                  'El usuario ingresado ya es actualmente miembro del evento.'
                break
              case USER_NOT_FOUND_ERROR_CODE:
                description =
                  'El mail ingresado no corresponde a un usuario de EvenTITO.'
                break
              default:
                console.log('errorcode: ', error.response.data.detail.errorcode)
            }
          }
          toast({
            title: 'Error',
            description: description,
            variant: 'destructive',
          })
        })
      setEmail('')
      setRole('')
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar miembro</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar nuevo miembro</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email del miembro</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="role">Rol del miembro</Label>
            <Select value={role} onValueChange={setRole} required>
              <SelectTrigger id="role">
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={CHAIR_ROLE}>
                  {EVENT_ROLES_LABELS[CHAIR_ROLE]}
                </SelectItem>
                <SelectItem value={ORGANIZER_ROLE}>
                  {EVENT_ROLES_LABELS[ORGANIZER_ROLE]}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex justify-end">
            <ButtonWithLoading
              type="submit"
              disabled={!email || !role}
              isLoading={isPending}
            >
              Agregar miembro
            </ButtonWithLoading>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
