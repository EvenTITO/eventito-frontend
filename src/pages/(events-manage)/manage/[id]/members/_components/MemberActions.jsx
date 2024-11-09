import { EVENT_ROLES_LABELS } from '@/lib/Constants'
import { useState } from 'react'
import MiniModal from '@/components/Modal/MiniModal'
import RoleSelector from '@/components/Forms/RoleSelector'
import ActionsContent from '@/components/Actions/ActionsContent'
import DeleteAction from '@/components/Actions/DeleteAction'
import TooltipAction from '@/components/Actions/TooltipAction'

export default function MemberActions({
  member,
  onDeleteMember,
  onRoleChange,
}) {
  return (
    <ActionsContent>
      <EditAction member={member} onRoleChange={onRoleChange} />
      <DeleteAction
        tooltip="Eliminar miembro"
        onDelete={() => onDeleteMember(member)}
      />
    </ActionsContent>
  )
}

function EditAction({ member, onRoleChange }) {
  const [isLoading, setIsLoading] = useState(false)

  const [selectedRole, setSelectedRole] = useState(member.role)
  async function handleNewRole(onClose) {
    setIsLoading(true)
    await onRoleChange(member, selectedRole)
    setIsLoading(false)
    onClose()
  }

  function trigger(onOpen) {
    return <TooltipAction content="Cambiar rol" onOpen={onOpen} icon="Pencil" />
  }

  return (
    <MiniModal
      trigger={trigger}
      title={`Cambiar rol de miembro: ${member.username}`}
      onSubmit={handleNewRole}
      isPending={isLoading}
    >
      <RoleSelector
        setRole={setSelectedRole}
        placeholder={EVENT_ROLES_LABELS[selectedRole]}
        label="Seleccionar nuevo rol"
        labelPlacement="outside-left"
      />
    </MiniModal>
  )
}
