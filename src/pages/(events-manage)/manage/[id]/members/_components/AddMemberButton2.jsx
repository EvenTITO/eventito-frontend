import { CHAIR_ROLE, ORGANIZER_ROLE } from '@/lib/Constants'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal'
import { useAddMember } from '@/hooks/manage/membersHooks'
import { useState } from 'react'
import { Button } from '@nextui-org/button'
import { Select, SelectItem } from '@nextui-org/select'
import Icon from '@/components/Icon'

export default function AddMemberButton2() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
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

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Agregar miembro
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Nuevo miembro
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email del usuario"
                  variant="bordered"
                  value={email}
                  onValueChange={setEmail}
                />
                <Select
                  label="Seleccionar rol"
                  onChange={(e) => setRole(e.target.value)}
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
                  onPress={() => handleSubmit(onClose)}
                  isLoading={isPending}
                >
                  {!isPending ? <Icon name="CircleCheck" s="5" /> : null}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
