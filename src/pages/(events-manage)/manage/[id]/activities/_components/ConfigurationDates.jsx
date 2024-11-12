import DateCard from '@/components/Card/DateCard'

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
