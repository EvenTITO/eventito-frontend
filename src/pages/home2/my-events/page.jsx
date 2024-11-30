import Icon from '@/components/Icon'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import { Card, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import CardListContainer from './_components/CardListContainer'

export default function Page({ events, isPending }) {
  const eventCards = [
    <CreateEventCard />,
    <EventCard event={isPending ? null : events[0]} />,
  ]

  if (!isPending) {
    events.forEach((event) => {
      eventCards.push(<EventCard key={event.id} event={event} />)
    })
  }

  return (
    <ContainerPage>
      <TitlePage title="Mis eventos" />
      <CardListContainer eventCards={eventCards} isPending={isPending} />
    </ContainerPage>
  )
}
function CardContainer({ onPress, children }) {
  return (
    <Card
      isPressable
      onPress={onPress}
      className="overflow-hidden w-[350px] h-[250px] hover:bg-gray-50 hover:text-primary"
    >
      {children}
    </Card>
  )
}

function CreateEventCard({ navigateTo }) {
  return (
    <CardContainer onPress={() => alert('creando evento')}>
      <div className="flex flex-col flex-grow p-6 w-full">
        <CardBody className="flex-grow items-center justify-center gap-2">
          <Icon name="Plus" />
          <p>Crear nuevo evento</p>
        </CardBody>
      </div>
    </CardContainer>
  )
}

function EventCard({ event }) {
  return (
    <CardContainer onPress={() => alert('viendo evento')}>
      <Image
        isZoomed
        shadow="sm"
        radius={null}
        width="100%"
        alt={event.title}
        className="w-full object-cover h-[100px]"
        src={event.bannerURL}
      />
      <div className="flex flex-col flex-grow p-6">
        <CardBody className="flex-grow">
          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
        </CardBody>
      </div>
    </CardContainer>
  )
}
