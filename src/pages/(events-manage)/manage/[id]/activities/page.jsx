import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import {
  getActivitiesForDay,
  getIntermediateDates,
  ShowDay,
} from './_components/utils'
import SubtitlePage from '@/pages/(events-manage)/_components/subtitlePage'
import AddDateButton from './_components/AddDateButton'
import { useEditEvent } from '@/hooks/manage/generalHooks'

export default function Page({ event }) {
  const startDate = '2024-11-24T00:00:00'
  const endDate = '2024-11-28T00:00:00'
  const informativeDates = event.mdata?.informative_dates || []

  const { mutateAsync: submitEditEvent, isPending } = useEditEvent()

  async function onAddNewDate({ newDate }) {
    let eventCopy = { ...event }
    delete eventCopy.title
    eventCopy.mdata.informative_dates.push(newDate)

    await submitEditEvent({ eventData: eventCopy })
  }

  return (
    <ContainerPage>
      <TitlePage title={'Actividades del evento'} />
      <Activities
        startDate={startDate}
        endDate={endDate}
        informativeDates={informativeDates}
        onAddNewDate={onAddNewDate}
      />
    </ContainerPage>
  )
}

function Activities({ startDate, endDate, informativeDates, onAddNewDate }) {
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

import { format, parseISO } from 'date-fns'
function ActivityCard({ title, date, startHour, endHour, description, key }) {
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
