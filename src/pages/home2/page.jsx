import ContainerPage from '../(events-manage)/_components/containerPage'
import EventsSection from './_components/EventsSection'

export default function Page({ events, myEvents }) {
  return (
    <ContainerPage>
      <div className="space-y-20">
        <EventsSection
          events={myEvents}
          title={'Mis eventos'}
          navigateTo={'/home/my-events'}
        />
        <EventsSection
          events={events}
          title={'Próximos eventos'}
          navigateTo={'/home/public-events'}
        />
      </div>
    </ContainerPage>
  )
}
