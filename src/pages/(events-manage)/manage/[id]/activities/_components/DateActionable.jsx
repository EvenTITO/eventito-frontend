import MiniModal from '@/components/Modal/MiniModal'
import NameInput from '@/components/Forms/NameInput'
import TimeInput from '@/components/Forms/TimeInput'
import { HourToString } from './utils'
import { Textarea } from '@nextui-org/input'
import { useState } from 'react'

export default function DateActionable({
  day,
  defaultDescription = '',
  defaultEndHour,
  defaultStartHour,
  defaultTitle = null,
  label,
  onClick,
  trigger,
}) {
  const [title, setTitle] = useState(defaultTitle)
  const [startHour, setStartHour] = useState(defaultStartHour)
  const [endHour, setEndHour] = useState(defaultEndHour)
  const [description, setDescription] = useState(defaultDescription)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (onClose) => {
    if (title && startHour && endHour && description) {
      setIsLoading(true)
      await onClick({
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
      setDescription('')
      setIsLoading(false)

      onClose(false)
    }
  }

  return (
    <MiniModal
      trigger={trigger}
      title={label}
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
