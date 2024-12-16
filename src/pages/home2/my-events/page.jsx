import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import CardListContainer from './_components/CardListContainer'
import CreateEventCard from './_components/CreateEventCard'
import EventCard from './_components/EventCard'
import { SkeletonList } from '@/components/Skeleton'
import {
  ATTENDEE_ROLE,
  CHAIR_ROLE,
  ORGANIZER_ROLE,
  REVIEWER_ROLE,
  SPEAKER_ROLE,
} from '@/lib/Constants'

export default function Page({ events, isPending }) {
  return (
    <ContainerPage>
      <div className="space-y-20">
        <MyEvents events={events} isPending={isPending} />
        <MyInscriptions events={events} isPending={isPending} />
        <MyReviews events={events} isPending={isPending} />
        <AsChairOfEvent events={events} isPending={isPending} />
      </div>
    </ContainerPage>
  )
}

function MyEvents({ events, isPending }) {
  const title = 'Mis eventos'

  if (isPending) {
    return (
      <div>
        <TitlePage title={title} />
        <SkeletonList />
      </div>
    )
  }

  return (
    <MyEventsSection
      events={events}
      filterFunction={(event) => event.roles.includes(ORGANIZER_ROLE)}
      starterValue={<CreateEventCard />}
      title={title}
      showStatus
      showAllways
    />
  )
}

function MyInscriptions({ events, isPending }) {
  if (isPending) return null

  return (
    <MyEventsSection
      events={events}
      filterFunction={(event) =>
        event.roles.includes(ATTENDEE_ROLE) ||
        event.roles.includes(SPEAKER_ROLE)
      }
      title="Mis inscripciones"
    />
  )
}

function MyReviews({ events, isPending }) {
  if (isPending) return null

  return (
    <MyEventsSection
      events={events}
      filterFunction={(event) => event.roles.includes(REVIEWER_ROLE)}
      title="Eventos con revisiones pendientes"
    />
  )
}

function AsChairOfEvent({ events, isPending }) {
  if (isPending) return null

  return (
    <MyEventsSection
      events={events}
      filterFunction={(event) => event.roles.includes(CHAIR_ROLE)}
      title="Eventos asignado como chair"
    />
  )
}

function MyEventsSection({
  events,
  filterFunction,
  starterValue = null,
  title,
  showStatus = false,
  showAllways = false,
}) {
  const filteredEvents = events.filter(filterFunction)
  if (!showAllways && filteredEvents.length === 0) return null

  const eventCards = starterValue ? [starterValue] : []
  filteredEvents.forEach((event) => {
    eventCards.push(
      <EventCard key={event.id} event={event} showStatus={showStatus} />
    )
  })

  return (
    <div>
      <TitlePage title={title} />
      <CardListContainer eventCards={eventCards} />
    </div>
  )
}
