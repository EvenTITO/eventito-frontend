import TextArea from '@/components/Forms/TextArea'
import MiniModal from '@/components/Modal/MiniModal'
import { Button } from '@nextui-org/button'
import { useState } from 'react'

export default function DescriptionCard() {
  const [description, setDescription] = useState(null)

  function trigger(onOpen) {
    return (
      <Button
        color="primary"
        variant="light"
        className="w-full"
        onPress={onOpen}
      >
        Descripcion
      </Button>
    )
  }
  return (
    <MiniModal
      trigger={trigger}
      title=""
      onSubmit={() => alert('ok')}
      isPending={false}
      size="full"
      backdrop="blur"
    >
      <TextArea
        label="Ingresar una descripcion"
        value={description}
        setValue={setDescription}
      />
    </MiniModal>
  )
}
