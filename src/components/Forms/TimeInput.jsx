import { TimeInput as TimeInputUI } from '@nextui-org/date-input'
import Icon from '../Icon'

export default function TimeInput({ label, defaultValue, value, setValue }) {
  return (
    <TimeInputUI
      label={label}
      defaultValue={defaultValue}
      startContent={<Icon name="Clock" />}
      value={value}
      onChange={setValue}
      hourCycle={24}
    />
  )
}
