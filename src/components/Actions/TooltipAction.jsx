import { Tooltip } from '@nextui-org/tooltip'
import Icon from '../Icon'

export default function TooltipAction({ content, onOpen, icon }) {
  return (
    <Tooltip content={content}>
      <span
        onClick={onOpen}
        className="text-lg text-default-400 cursor-pointer active:opacity-50"
      >
        <Icon name={icon} />
      </span>
    </Tooltip>
  )
}
