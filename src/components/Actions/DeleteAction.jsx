import { useState } from 'react'
import { Tooltip } from '@nextui-org/tooltip'
import Icon from '@/components/Icon'
import DeleteModal from '@/components/Modal/DeleteModal'

export default function DeleteAction({ tooltip, onDelete }) {
  const [isPending, setIsPending] = useState(false)
  async function handleDelete() {
    setIsPending(true)
    await onDelete()
    setIsPending(false)
  }

  function trigger(onOpen) {
    return (
      <Tooltip color="danger" content={tooltip}>
        <span
          className="text-lg text-danger cursor-pointer active:opacity-50"
          onClick={onOpen}
        >
          <Icon name="Trash" />
        </span>
      </Tooltip>
    )
  }

  return (
    <DeleteModal
      trigger={trigger}
      title={tooltip}
      onDelete={handleDelete}
      isPending={isPending}
    />
  )
}
