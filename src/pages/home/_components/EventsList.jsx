import { Card, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { VIEW_EVENT_URL } from './constants'
import { useNavigator } from '@/lib/navigation'

export default function EventsList({ events }) {
  if (events.length === 0) {
    return <p>Sin eventos</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8">
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </div>
  )
}

function EventCard({ event }) {
  const navigator = useNavigator()

  return (
    <Card
      isPressable
      onPress={() => navigator.to(VIEW_EVENT_URL + event.id)}
      className="overflow-hidden w-full h-[350px] hover:bg-gray-50 hover:text-primary"
    >
      <div className="h-[150px] w-full overflow-hidden">
        <Image
          isZoomed
          shadow="sm"
          radius="none"
          width="100%"
          height="150px"
          alt={event.title}
          src={event.bannerURL}
          className="w-full h-[150px] object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow p-6">
        <CardBody className="flex-grow">
          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {event.shortDescription}
          </p>
        </CardBody>
      </div>
    </Card>
  )
}
