import DateActionable from './DateActionable'
import Icon from '@/components/Icon'
import { Button } from '@nextui-org/button'
import { Time } from '@internationalized/date'

export default function AddDateButton({ onAddNewDate, day }) {
  function trigger(onOpen) {
    return (
      <Button
        color="default"
        variant="light"
        className="w-full justify-start"
        startContent={<Icon name="Plus" />}
        onPress={onOpen}
      >
        Nueva actividad
      </Button>
    )
  }

  return (
    <DateActionable
      day={day}
      defaultEndHour={new Time(11, 45)}
      defaultStartHour={new Time(11)}
      label={'Nueva actividad'}
      onClick={onAddNewDate}
      trigger={trigger}
    />
  )
}
