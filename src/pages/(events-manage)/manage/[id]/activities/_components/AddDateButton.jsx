import Icon from '@/components/Icon'
import MiniModal from '@/components/Modal/MiniModal'
import NameInput from '@/components/Forms/NameInput'
import { Button } from '@nextui-org/button'
import { useState } from 'react'
import TimeInput from '@/components/Forms/TimeInput'
import { Time } from '@internationalized/date'

export default function AddDateButton() {
  const [title, setTitle] = useState(null)
  const [startHour, setStartHour] = useState(null)
  const [endHour, setEndHour] = useState(null)

  const handleSubmit = async (onClose) => {
    alert(startHour + ' ' + endHour)
    onClose(false)
  }

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
    <MiniModal
      trigger={trigger}
      title="Nueva actividad"
      onSubmit={handleSubmit}
      isPending={false}
    >
      <NameInput
        label="Ingresar título de la actividad"
        value={title}
        setValue={setTitle}
      />
      <TimeInput
        label="Horario de comienzo"
        defaultValue={new Time(11)}
        value={startHour}
        setValue={setStartHour}
      />
      <TimeInput
        label="Horario de finalización"
        defaultValue={new Time(11, 30)}
        value={endHour}
        setValue={setEndHour}
      />
    </MiniModal>
  )
}
