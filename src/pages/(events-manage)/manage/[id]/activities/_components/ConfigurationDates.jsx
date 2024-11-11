import { formatDay } from './utils'
import { DatePicker } from '@nextui-org/date-picker'
import MiniModal from '@/components/Modal/MiniModal'
import { useState } from 'react'
import Icon from '@/components/Icon'
import { getLocalTimeZone, parseDate, today } from '@internationalized/date'

export default function ConfigurationDates({
  startDate,
  endDate,
  onEditStartDate,
  onEditEndDate,
}) {
  return (
    <div className="flex gap-4">
      <DateCard
        date={startDate}
        onEdit={onEditStartDate}
        label="Fecha de inicio de presentaciones"
      />
      <DateCard
        date={endDate}
        onEdit={onEditEndDate}
        label="Fecha de fin de presentaciones"
      />
    </div>
  )
}

function DateCard({ date, label, onEdit }) {
  const defaultDate = today(getLocalTimeZone())
  const [selectedDate, setSelectedDate] = useState(
    date ? parseDate(date) : defaultDate
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (onClose) => {
    if (selectedDate) {
      setIsLoading(true)
      await onEdit({
        newDate: selectedDate.toLocaleString(),
      })
      setIsLoading(false)
      onClose(false)
    }
  }

  function trigger(onOpen) {
    return <RenderDateCard onOpen={onOpen} label={label} date={date} />
  }

  return (
    <MiniModal
      trigger={trigger}
      title={label}
      onSubmit={handleSubmit}
      isPending={isLoading}
    >
      <DatePicker
        label={label}
        className=""
        value={selectedDate}
        onChange={setSelectedDate}
      />
    </MiniModal>
  )
}

function RenderDateCard({ onOpen, label, date }) {
  return (
    <div
      className="group flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent hover:border-accent-foreground/20 transition-all duration-200 cursor-pointer w-full"
      onClick={onOpen}
    >
      <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
        <Icon name="CalendarIcon" />
      </div>
      <div className="flex-grow">
        <h2 className="text-sm font-medium text-foreground">{label}</h2>
        {date ? (
          <p className="text-sm text-muted-foreground">{formatDay(date)}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Haz clic para configurar
          </p>
        )}
      </div>
      <div className="text-muted-foreground/50 group-hover:text-accent-foreground/50 transition-colors duration-200">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
