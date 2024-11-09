import React from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import Icon from '@/components/Icon'

export default function DeleteModal({
  trigger,
  title,
  onDelete,
  isPending,
  placement = 'top-center',
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  async function handleDelete(onClose) {
    await onDelete(onClose)
  }

  return (
    <>
      {trigger(onOpen)}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={placement}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                ¿Estás seguro que quieres continuar? Esta acción es irreversible
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full"
                  color="danger"
                  variant="light"
                  onPress={() => handleDelete(onClose)}
                  isLoading={isPending}
                >
                  {!isPending ? (
                    <>
                      <Icon name="Trash" s="5" />
                      <span className="mr-2">Eliminar</span>
                    </>
                  ) : null}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
