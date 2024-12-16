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

export default function MiniModal({
  trigger,
  title,
  children,
  onSubmit,
  submitButtonText,
  isPending,
  placement = 'top-center',
  size = 'default',
  validated = true,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  async function handleSubmit(onClose) {
    await onSubmit(onClose)
  }

  return (
    <>
      {trigger(onOpen)}
      <Modal
        isOpen={isOpen}
        size={size}
        onOpenChange={onOpenChange}
        placement={placement}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                {validated ? (
                  <Button
                    className="w-full"
                    color="primary"
                    variant="light"
                    onPress={() => handleSubmit(onClose)}
                    isLoading={isPending}
                  >
                    {!isPending ? (
                      <>
                        {submitButtonText && (
                          <span className="mr-2">{submitButtonText}</span>
                        )}
                        <Icon name="CircleCheck" s="5" />
                      </>
                    ) : null}
                  </Button>
                ) : null}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
