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

export default function FullModal({
  trigger,
  title,
  children,
  onSubmit,
  submitButtonText,
  isPending,
  placement = 'top-center',
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
        size="full"
        onOpenChange={onOpenChange}
        placement={placement}
        className=""
      >
        <ModalContent>
          {(onClose) => (
            <div className='mx-auto w-2/3 px-10'>
              <ModalHeader className="flex flex-col gap-1 font-bold text-3xl">
                {title}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
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
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
