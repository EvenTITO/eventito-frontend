import CardWithFocus from '@/components/Card/CardWithFocus'
import MiniModal from '@/components/Modal/MiniModal'
import NameInput from '@/components/Forms/NameInput'
import { useState } from 'react'

export default function MetadataCard({
  title,
  defaultValue = null,
  handleUpdate,
  logo,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState(defaultValue)

  async function handleSubmit(onClose) {
    if (!value || value.length === 0) {
      alert('Configurar un valor para continuar')
    } else {
      setIsLoading(true)
      await handleUpdate(value)
      setIsLoading(false)

      onClose()
    }
  }

  function trigger(onOpen) {
    return (
      <CardWithFocus onClick={onOpen} nameIcon={logo}>
        <div className="flex-grow">
          <h2 className="text-sm font-medium text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground italic">
            {defaultValue || 'Haz click para configurar'}
          </p>
        </div>
      </CardWithFocus>
    )
  }

  return (
    <MiniModal
      trigger={trigger}
      title={title}
      onSubmit={handleSubmit}
      isPending={isLoading}
    >
      <NameInput label="Ingresar un valor" value={value} setValue={setValue} />
    </MiniModal>
  )
}
