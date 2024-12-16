import CardWithFocus from '@/components/Card/CardWithFocus'
import TextArea from '@/components/Forms/TextArea'
import MiniModal from '@/components/Modal/MiniModal'
import { useState } from 'react'

export default function DescriptionCard({
  title,
  descriptionText,
  defaultValue = null,
  handleUpdate,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [description, setDescription] = useState(defaultValue)

  async function handleSubmit(onClose) {
    if (!description || description.length === 0) {
      alert('Agregar una descripción para continuar')
    } else {
      setIsLoading(true)
      await handleUpdate(description)
      setIsLoading(false)

      onClose()
    }
  }

  function trigger(onOpen) {
    return (
      <CardWithFocus onClick={onOpen}>
        <div className="flex-grow">
          <h2 className="text-sm font-medium text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground italic">
            {descriptionText.slice(0, 100)}{' '}
            {descriptionText.length > 100 ? '...' : null}
          </p>
        </div>
      </CardWithFocus>
    )
  }

  return (
    <MiniModal
      trigger={trigger}
      title=""
      onSubmit={handleSubmit}
      isPending={isLoading}
      size="full"
    >
      <TextArea
        label="Ingresar una descripción"
        value={description}
        setValue={setDescription}
      />
    </MiniModal>
  )
}
