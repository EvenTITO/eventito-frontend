import Icon from '@/components/Icon'
import { Button } from '@nextui-org/button'
import { useAddMember } from '@/hooks/manage/membersHooks'
import { useState } from 'react'
import MiniModal from '@/components/Modal/MiniModal'
import EmailInput from '@/components/Forms/EmailInput'
import RoleSelector from '@/components/Forms/RoleSelector'

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

  function trigger(onOpen) {
    return (
      <Button
        color="primary"
        variant="light"
        className="w-full"
        startContent={<Icon name="Plus" />}
        onPress={onOpen}
      >
        Agregar miembro
      </Button>
    )
  }

  return (
    <MiniModal
      trigger={trigger}
      title="Nuevo miembro"
      onSubmit={handleSubmit}
      isPending={isPending}
    >
      <EmailInput email={email} setEmail={setEmail} />
      <RoleSelector setRole={setRole} />
    </MiniModal>
  )
}
