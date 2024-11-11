import Icon from '@/components/Icon'
import MiniModal from '@/components/Modal/MiniModal'
import NameInput from '@/components/Forms/NameInput'
import { Button } from '@nextui-org/button'
import { useState } from 'react'
import TimeInput from '@/components/Forms/TimeInput'
import { Time } from '@internationalized/date'
import { Textarea } from '@nextui-org/input'
import { HourToString } from './utils'

export default function AddDateButton({ onAddNewDate, day }) {
  const [title, setTitle] = useState(null)
  const [startHour, setStartHour] = useState(new Time(11))
  const [endHour, setEndHour] = useState(new Time(11, 30))
  const [description, setDescription] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (onClose) => {
    if (title && startHour && endHour && description) {
      setIsLoading(true)
      await onAddNewDate({
        newDate: {
          date: day,
          title: title,
          startHour: HourToString(startHour),
          endHour: HourToString(endHour),
          description: description,
        },
      })

      setTitle(null)
      setStartHour(null)
      setEndHour(null)
      setDescription(null)
      setIsLoading(false)

      onClose(false)
    }
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
      size={'lg'}
      isPending={isLoading}
    >
      <NameInput
        label="Título de la actividad"
        value={title}
        setValue={setTitle}
      />
      <div className="flex gap-1">
        <TimeInput
          label="Horario de comienzo"
          value={startHour}
          setValue={setStartHour}
        />
        <TimeInput
          label="Horario de finalización"
          value={endHour}
          setValue={setEndHour}
        />
      </div>
      <Textarea
        label="Descripción"
        placeholder="Ingresar breve descripción de la actividad"
        value={description}
        onValueChange={setDescription}
      />
    </MiniModal>
  )
}
