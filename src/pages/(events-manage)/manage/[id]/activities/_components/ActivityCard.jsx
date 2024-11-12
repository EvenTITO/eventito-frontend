import { format, parseISO } from 'date-fns'
import { Card } from '@/components/ui/card'

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

  const handleClick = () => {
    alert(`Activity: ${title}`)
  }

  return (
    <Card
      key={key}
      onClick={handleClick}
      className="p-4 hover:bg-accent transition-colors cursor-pointer group mb-2"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base group-hover:text-primary truncate">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 italic leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <p className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
            {startTime} - {endTime}
          </p>
        </div>
      </div>
    </Card>
  )
}
