import Icon from '@/components/Icon'
import { Button } from '@nextui-org/button'
import { CHAIR_ROLE, ORGANIZER_ROLE } from '@/lib/Constants'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { useAddMember } from '@/hooks/manage/membersHooks'
import { useState } from 'react'
import MiniModal from '@/components/Modal/MiniModal'

export default function AddMemberButton() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const { mutateAsync: addMember, isPending, error } = useAddMember()

  const handleSubmit = async (onClose) => {
    if (email && role) {
      await addMember({ newMemberEmail: email, newMemberRole: role })
      setEmail('')
      setRole('')
      onClose(false)
    }
  }

  const trigger = (
    <Button
      color="primary"
      variant="light"
      className="w-full"
      startContent={<Icon name="Plus" />}
    >
      Agregar miembro
    </Button>
  )

  return (
    <MiniModal
      trigger={trigger}
      title="Nuevo miembro"
      onSubmit={handleSubmit}
      isPending={isPending}
    >
      <Input
        autoFocus
        label="Email del usuario"
        variant="bordered"
        value={email}
        onValueChange={setEmail}
      />
      <Select label="Seleccionar rol" onChange={(e) => setRole(e.target.value)}>
        <SelectItem key={ORGANIZER_ROLE}>Organizador</SelectItem>
        <SelectItem key={CHAIR_ROLE}>Chair</SelectItem>
      </Select>
    </MiniModal>
  )
}
