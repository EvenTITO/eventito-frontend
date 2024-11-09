import { CHAIR_ROLE, EVENT_ROLES_LABELS, ORGANIZER_ROLE } from '@/lib/Constants'
import { useState } from 'react'
import { Tooltip } from '@nextui-org/tooltip'
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Select, SelectItem } from '@nextui-org/select'
import Icon from '@/components/Icon'
import MiniModal from '@/components/Modal/MiniModal'
import RoleSelector from '@/components/Forms/RoleSelector'

export default function MemberActions({
  member,
  onDeleteMember,
  onRoleChange,
}) {
  return (
    <div className="relative flex items-center gap-2">
      <EditAction member={member} onRoleChange={onRoleChange} />
      <Tooltip color="danger" content="Eliminar miembro">
        <button
          className="text-lg text-danger cursor-pointer active:opacity-50"
          onClick={() => onDeleteMember(member)}
        >
          <Icon name="Trash" />
        </button>
      </Tooltip>
    </div>
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
    return (
      <Tooltip content="Cambiar rol">
        <span
          onClick={onOpen}
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
        >
          <Icon name="Pencil" />
        </span>
      </Tooltip>
    )
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
