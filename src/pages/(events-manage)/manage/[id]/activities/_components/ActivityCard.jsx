import { format, parseISO } from 'date-fns'

export default function ActivityCard({
  title,
  date,
  startHour,
  endHour,
  description,
  key,
}) {
  const startTime = format(parseISO(`${date}T${startHour}`), 'h:mm a')
  const endTime = format(parseISO(`${date}T${endHour}`), 'h:mm a')

  return (
    <div key={key} className="py-2 px-4 border-t border-b">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">
            {startTime} - {endTime}
          </p>
        </div>
      </div>
      <div className="pt-2">
        <p className="text-sm italic leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
