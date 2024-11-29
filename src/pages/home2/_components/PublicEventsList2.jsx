import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'

export default function PublicEventsList({ events }) {
  console.log(events)
  return (
    <div className="gap-2 grid grid-cols-3">
      {events.map((event, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log('item pressed')}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={event.title}
              className="w-full object-cover h-[140px]"
              src={event.bannerURL}
            />
          </CardBody>
          <CardFooter className="text-large justify-between">
            <b>{event.title}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
