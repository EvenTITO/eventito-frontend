import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import { useEditEvent } from '@/hooks/manage/generalHooks'
import Activities from './_components/Activities'
import ConfigurationDates from './_components/ConfigurationDates'

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
      <div className="space-y-6">
        <TitlePage title={'Actividades del evento'} />
        <ConfigurationDates startDate={startDate} endDate={endDate} />
        <Activities
          startDate={startDate}
          endDate={endDate}
          informativeDates={informativeDates}
          onAddNewDate={onAddNewDate}
        />
      </div>
    </ContainerPage>
  )
}
