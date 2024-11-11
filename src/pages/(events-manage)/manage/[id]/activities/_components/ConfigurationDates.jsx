import { Card } from '@/components/ui/card'
import { formatDay } from './utils'
import { DatePicker } from '@nextui-org/date-picker'
import MiniModal from '@/components/Modal/MiniModal'

export default function ConfigurationDates({ startDate, endDate }) {
  return (
    <div className="flex gap-4">
      <DateCard date={startDate} label="Fecha de inicio de presentaciones" />
      <DateCard date={endDate} label="Fecha de fin de presentaciones" />
    </div>
  )
}

function DateCard({ date, label }) {
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
    <MiniModal trigger={trigger} title={label} onSubmit={() => alert('submit')}>
      <DatePicker label="Birth date" className="" />
    </MiniModal>
  )
}
