import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import DatesCheck from './_components/DatesCheck'
import EventDetails from './_components/EventDetails'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import { getDates, getEventStatus, getWorksStatus } from './_components/utils'

export default function Page({ eventInfo, inscriptions }) {
  return (
    <ContainerPage>
      <div className="space-y-6">
        <TitlePage title={'Administración de ' + eventInfo.title} />
        <div className='flex items-center justify-between gap-4'>
          <EventDetails
            eventStatus={getEventStatus(eventInfo)}
            worksStatus={getWorksStatus(eventInfo)}
            inscriptions={inscriptions}
          />
          <DatesCheck dates={getDates(eventInfo)} />
        </div>
      </div>
    </ContainerPage>
  )
}
