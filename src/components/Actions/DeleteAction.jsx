import { Tooltip } from '@nextui-org/tooltip'
import Icon from '@/components/Icon'

export default function DeleteAction({ tooltip, onDelete }) {
  return (
    <Tooltip color="danger" content={tooltip}>
      <button
        className="text-lg text-danger cursor-pointer active:opacity-50"
        onClick={onDelete}
      >
        <Icon name="Trash" />
      </button>
    </Tooltip>
  )
}
