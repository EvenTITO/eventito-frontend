import { useNavigator } from '@/lib/navigation'
import { Card, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { VIEW_EVENT_URL } from './constants'

export default function EventsList({ events }) {
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
      <Image
        isZoomed
        shadow="sm"
        radius={null}
        width="100%"
        alt={event.title}
        className="w-full object-cover h-[150px]"
        src={event.bannerURL}
      />
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
