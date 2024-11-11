import { Card } from '@/components/ui/card'
import { formatDay } from './utils'
import { DatePicker } from '@nextui-org/date-picker'
import MiniModal from '@/components/Modal/MiniModal'
import { useState } from 'react'

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
  const [selectedDate, setSelectedDate] = useState(null)
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
    return (
      <Card
        className="flex cursor-pointer items-center gap-4 p-6 transition-colors hover:bg-muted/50 w-full"
        onClick={onOpen}
      >
        <div>
          <h2 className="font-semibold">{label}</h2>
          <p className="text-sm">{formatDay(date)}</p>
        </div>
      </Card>
    )
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
