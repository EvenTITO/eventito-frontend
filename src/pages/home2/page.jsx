import ContainerPage from '../(events-manage)/_components/containerPage'
import { MY_EVENTS_URL, PUBLIC_EVENTS_URL } from './_components/constants'
import EventsSection from './_components/EventsSection'
import HomeHero from './_components/HomeHero'

export default function Page({ events, myEvents }) {
  return (
    <ContainerPage>
      <HomeHero />
      <div className="space-y-20">
        <EventsSection
          events={myEvents}
          title={'Mis eventos'}
          navigateTo={MY_EVENTS_URL}
        />
        <EventsSection
          events={events}
          title={'Próximos eventos'}
          navigateTo={PUBLIC_EVENTS_URL}
        />
      </div>
    </ContainerPage>
  )
}
