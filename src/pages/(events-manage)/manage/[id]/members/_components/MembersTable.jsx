import { CHAIR_ROLE, EVENT_ROLES_LABELS, ORGANIZER_ROLE } from '@/lib/Constants'
import { useState } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/table'
import User from '@/components/ui/User'
import { Tooltip } from '@nextui-org/tooltip'
import { Trash } from 'lucide-react'
import { Chip } from '@nextui-org/chip'
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

export default function MembersTable({
  members,
  onRoleChange,
  isPending,
  onDeleteMember,
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>USUARIO</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>ROL</TableColumn>
        <TableColumn>ACCIONES</TableColumn>
      </TableHeader>
      <TableBody>
        {members.map((member, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <User username={member.username} />
            </TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>
              <ChipByRole role={EVENT_ROLES_LABELS[member.role]} />
            </TableCell>
            <TableCell className="">
              <Actions
                member={member}
                onDeleteMember={onDeleteMember}
                onRoleChange={onRoleChange}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function ChipByRole({ role }) {
  const statusColorMap = {
    Organizador: 'warning',
    Chair: '',
  }

  return (
    <Chip
      className="capitalize"
      color={statusColorMap[role]}
      size="sm"
      variant="flat"
    >
      {role}
    </Chip>
  )
}

function Actions({ member, onDeleteMember, onRoleChange }) {
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)

  const [selectedRole, setSelectedRole] = useState(member.role)
  function handleSelectionChange(e) {
    setSelectedRole(e.target.value)
  }
  async function handleNewRole(onClose) {
    setIsLoading(true)
    await onRoleChange(member, selectedRole)
    setIsLoading(false)
    onClose()
  }

  return (
    <>
      <Tooltip content="Cambiar rol">
        <span
          onClick={onOpen}
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
        >
          <Icon name="Pencil" />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cambiar rol de miembro: {member.username}
              </ModalHeader>
              <ModalBody className="">
                <Select
                  label="Seleccionar nuevo rol"
                  placeholder={EVENT_ROLES_LABELS[selectedRole]}
                  labelPlacement="outside-left"
                  onChange={handleSelectionChange}
                >
                  <SelectItem key={ORGANIZER_ROLE}>Organizador</SelectItem>
                  <SelectItem key={CHAIR_ROLE}>Chair</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full"
                  color="primary"
                  variant="light"
                  onPress={() => handleNewRole(onClose)}
                  isLoading={isLoading}
                >
                  {!isLoading ? <Icon name="CircleCheck" s="5" /> : null}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
