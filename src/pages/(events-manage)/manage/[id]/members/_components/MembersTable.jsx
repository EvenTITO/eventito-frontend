import { CHAIR_ROLE, EVENT_ROLES_LABELS, ORGANIZER_ROLE } from '@/lib/Constants'
import { useState, useMemo } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/table'
import { Pagination } from '@nextui-org/pagination'
import User from '@/components/ui/User'
import { Tooltip } from '@nextui-org/tooltip'
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
import ChipByRole from './ChipByRole'

export default function MembersTable({
  members,
  onRoleChange,
  isPending,
  onDeleteMember,
}) {
  const [page, setPage] = useState(1)
  const rowsPerPage = 5
  const pages = Math.ceil(members.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return members.slice(start, end)
  }, [page, members])

  return (
    <Table
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="default"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]',
      }}
    >
      <TableHeader>
        <TableColumn>USUARIO</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>ROL</TableColumn>
        <TableColumn>ACCIONES</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {items.map((member, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <User username={member.username} />
            </TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>
              <ChipByRole role={EVENT_ROLES_LABELS[member.role]} />
            </TableCell>
            <TableCell>
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
