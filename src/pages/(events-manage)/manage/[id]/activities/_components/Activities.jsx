import SubtitlePage from '@/pages/(events-manage)/_components/subtitlePage'
import ActivityCard from './ActivityCard'
import { getActivitiesForDay, getIntermediateDates, ShowDay } from './utils'
import AddDateButton from './AddDateButton'

export default function Activities({
  startDate,
  endDate,
  informativeDates,
  onAddNewDate,
}) {
  const days = getIntermediateDates(startDate, endDate)

  return (
    <div className="space-y-6">
      {days.map((day, index) => (
        <>
          <SubtitlePage subtitle={ShowDay(day, index + 1)} />
          <ShowActivitiesForDay
            activities={getActivitiesForDay(day, informativeDates)}
          />
          <AddDateButton day={day} onAddNewDate={onAddNewDate} />
        </>
      ))}
    </div>
  )
}

function ShowActivitiesForDay({ activities }) {
  if (activities.length === 0) return null

  return (
    <>
      {activities.map((activity, index) => (
        <ActivityCard
          key={index}
          title={activity.title}
          date={activity.date}
          startHour={activity.startHour}
          endHour={activity.endHour}
          description={activity.description}
        />
      ))}
    </>
  )
}
